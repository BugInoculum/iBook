// word-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordApiService {
  private apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en';

  constructor(private http: HttpClient) {}

  getWordDefinitions(word: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${word}`);
  }
}
