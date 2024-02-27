# A planner with OpenAI

A task generator. I know. This is an extremely typical CS student application. But what makes this project different is my own little twist with Open AI and that it 
was a big learning experience for me. It has a very simple frontend powered by React, but the backend is where the magic is. 

On top of the typical functionalities of a checklist app (adding, deleting, and viewing tasks), pretend a user might have an upcoming event they don't
know how to prepare for. Using OpenAI, a user can input the prompt for their situation and receive an AI generated list of things to do to prepare
accordingly for their needs.

It utilizes MongoDB in order to fetch data from a custom database to send to the frontend to display. Furthermore, it stores user login info and 
allows for users to sign in and view their own personal tasks rather than seeing it globally.

Additionally, it has a decent security flow. It utilizes auth context to properly display data in real time if the user is an authorized user or not.
It hashes passwords, and keeps them secure with bcrypt salts. Token-based logins are also used (JSON Web Token), allowing not only for secure logins,
but for user sessions to expire in order to prevent others from exploiting signed in accounts. 

Finally, it has custom RESTful API routes for CRUD requests, which allows for user login and signups and for users to create/delete/update tasks which are 
saved to the database. These routes are protected, meaning they cannot be accessed without the proper authorization. 
