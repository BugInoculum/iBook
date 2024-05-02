import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Editor, JSONContent} from '@tiptap/core'
import {Document} from "@tiptap/extension-document";
import {Bold} from "@tiptap/extension-bold";
import {Paragraph} from "@tiptap/extension-paragraph";
import Italic from "@tiptap/extension-italic";
import {History} from "@tiptap/extension-history";
import {Heading} from "@tiptap/extension-heading";
import {Underline} from "@tiptap/extension-underline";
import {Text} from "@tiptap/extension-text";
import {Placeholder} from "@tiptap/extension-placeholder";
import {BubbleMenu} from "@tiptap/extension-bubble-menu"
import {HttpClient} from "@angular/common/http";
import {WordApiService} from "./wordSearch.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import * as events from "node:events";


interface Definition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface ApiResponse {
  word: string;
  phonetic?: string;
  origin?: string;
  meanings: Meaning[];
}




@Component({
  selector: 'app-tiptap-editor',
  templateUrl: './tiptap-editor.component.html',
  styleUrls: ['./tiptap-editor.component.scss']
})

export class TipTapEditorComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<JSONContent>();
  editor!: Editor
  definitions: any;
  doubleClicked: string = ''
  tippyOptionsCustom: Partial<any> = {
    placement: "top-start",
    trigger: "manual"
  };


  constructor(private http: HttpClient, private searchWords: WordApiService) {}

  ngOnInit(): void {
    console.log('editr called')
    this.editor = new Editor({
      extensions: [
        Document,
        Paragraph,
        Placeholder.configure({
          placeholder: 'Write Something'
        }),
        Bold,
        Italic,
        Text,
        Heading.configure({levels: [1, 2, 3]}),
        History.configure({
          newGroupDelay: 1000,
          depth: 10
        }),
        BubbleMenu.configure({
          shouldShow: ({ editor, view, state, oldState, from, to }) => {
            return editor.isActive('paragraph') || editor.isActive('text')
          },
        }),
        Underline,
      ],

    });

    this.editor.on('selectionUpdate', ({ editor }) => {
      const { from, to } = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(from, to);
      console.log('Selected Text:', selectedText);
      this.searchWords.getWordDefinitions(selectedText.toString()).pipe(
        catchError(error => {
          console.error(error);
          return of([]);
        })
      ).subscribe((response: ApiResponse[]) => {
        if (response.length > 0) {
          const apiResponse = response[0]; // Assuming you receive a single definition for simplicity
          apiResponse.meanings.forEach(meaning => {
            console.log('Part of Speech:', meaning.partOfSpeech);
            meaning.definitions.forEach(definition => {
              this.doubleClicked = definition.definition
            });
          });
        } else {
          console.log('No definitions found.');
        }
      });
    });

  }


  save(event: MouseEvent): void {
    event.stopPropagation();
    const jsonContent = this.editor.getJSON()
    this.saveEvent.emit(jsonContent);

  }


}
