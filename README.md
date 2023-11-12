# A todo list???

I know. This is an extremely typical CS student application. But what makes this project different is that it was a big learning experience for 
me. It has a very simple frontend powered by React, but the backend is where the magic is. First, it utilizes MongoD in order to fetch data from
a custom database to send to the frontend to display. Furthermore, it stores user login info and allows for users to sign in and view their own
personal tasks rather than seeing it globally.

Additionally, it has a decent security flow. It utilizes auth context to properly display data in real time if the user is an authorized user or not.
It hashes passwords, and keeps them secure with bcrypt salts. Token-based logins are also used (JSON Web Token), allowing not only for secure logins,
but for user sessions to expire in order to prevent others from exploiting signed in accounts. 

Finally, it has custom RESTful API routes, which allows for not just user login and signups, but of course for users to create/delete/update tasks which are 
saved to the database. These routes are protected, meaning they cannot be accessed without the proper authorization. 
