# iBook
This project caters to users who would like to write books online.


So far it is unfinished. Following are the Features added and their status.

1) JWT based authentication between Angular and Backend using REST.
   a) Though the services authenticate but the design and the locage storage needs to be improved.
   b) Need to verify whether I need to black list the tokens.
   c) UI is below par.

2) The feature in which the user double clicks on a word and its meaning pop's up, has been handled.
3) I have prepared the logic for the sections of the document. It wouldn't be an issue to create custom nodes to
    highlight different sections of the document and save them individually in the database, based on the JSON output.

4) Lastly inorder to share the book with anyone, it would be better to develop a microservice or a django app that will
   parse the JSON into HTML and forward it to the respective user via any email service.

5) Router navigation and Modules need to be divided.

6) All in all, every mentioned tool has been used in this code, with room for lots of improvement.
