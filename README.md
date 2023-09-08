# Messenger Web App

The project is live and available at [messenger-app.artemplv.dev](https://messenger-app.artemplv.dev).

## Description

A messaging application with real-time group chats and an AI chatbot inside.

## Technology

### Frameworkless frontend

It's a single-page application using no framework on the frontend. Component's lifecycle and routing are implemented using vanilla JavaScript (`TypeScript`).  
`Handlebars` library is used for HTML templates and `Sass` preprocessor is used for styling.

### Node, Express, MongoDB
`Express.js` is used to serve information to the frontend. Data is stored and manipulated with `MongoDB` and `Mongoose`.  
Cloudinary services are utilized to handle media attachments.

The backend runs in `Node.js` environment, the source code is at [messenger-back](https://github.com/artemplv/messenger-back).

### OpenAI API

The AI chatbot is implemented using `OpenAI API`.

### Jest and Sinon

`Jest` and `Sinon` libraries are used to test components and network requests.


## Features

### AI chatbot
Users can communicate with a chatbot that is created using OpenAI API. In those chats, context is also used, so users can have comprehensive conversations. However, users are able to reset the context.

![ai-chat](https://github.com/artemplv/messenger-web-app/assets/48654322/b0c36b01-fdaa-4e90-8fe9-bf363d4052c3)

### Media in chats
In live chats, users can send pictures from their desktops and mobiles.

![media-chats](https://github.com/artemplv/messenger-web-app/assets/48654322/c5d94866-e727-4cde-8e71-8c2ee129a7bc)

### User Authentication
Users can sign up for an account that is secured with password encryption.

<img width="600" alt="user sign in view" src="https://github.com/artemplv/messenger-web-app/assets/48654322/f2e0ced4-f266-494b-9d0d-990f1c5d9e93">
