# travel.io

Term project for CSC 372

OneDrive MVP: https://uncg-my.sharepoint.com/:v:/g/personal/saguerra_uncg_edu/IQDgBWeWqOWfS6RNdihVE3cTAYTSfDo6bkXmdDaFKAyr4iM?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=T9ibP8

## Setup Instructions

1. Download/Clone the Repo
2. `npm install` from the root directory
3. `npm start` to start the server.js file
4. `cd ./react-client/`
5. `npm install`
6. `npm run dev` to start React Client
7. Go to http://localhost:5173
8. Click login and login with Google
9. Create, View, and Delete Journal Entries

# Reflection

I chose Node and Express for the backend. This was the framework that we went over the most in class. I believe that this was understandable as it allowed me to build Express routes that seamlessly connected to the React Frontend. I chose React because I had previous experience with the framework and believe that it is useful for reusing blocks, which is what my app is based around. The journal entries made sense to be reusable components.

I have previous experience with SpringBoot and knew that it is a hassle to work with. I did not want to end up having to use it again.

There were many challeneges that I faced when trying to build this project. The main challenges were the Google Maps API inclusion and the authentication. However, I relied heavily on the Google Maps API docs and simplified how much I wanted to do with it, opting to just build a map with a marker for each location. I solved the authentication problem by also relying on the code examples that were provided.

I learned a lot about the Full-Stack development. More specifically, how different parts of the Full-Stack communicate with each other. I learned that it is much more efficient to use Google OAUTH2 rather than trying to reinvent a different type of authentication and protection. I also learned that Node and Express will probably be the frameworks I use to for my Senior Capstone next semester.

There are several areas where I would have liked to improve this project. One of the most glaring issues is the deployment. I had a lot of trouble with deployment and had to settle with presenting the project with a local version. Another area of improvement is the inclusion of the Google Maps API. I wanted to create a map that has all the markers where the user has been, which is quite simple to use with lat and lng values, but I just ran out of time implement that. Finally, I wanted to implement a search, so that users can search for locations without having to directly input latitude and longitude values.
