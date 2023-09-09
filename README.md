# QuickChat AI

This project is created for educational purposes, to get a deeper understanding of how JavaScript frontend frameworks function and how they are implemented under the hood.

It's live and available at [messenger-app.artemplv.dev](https://messenger-app.artemplv.dev).

## Description

QuickChat AI is a messaging application with real-time group chats and an AI chatbot inside.

## Technology

### Frameworkless frontend

It's a minimum-dependency single-page application using no framework on the frontend. Component's lifecycle and frontend routing are implemented using `TypeScript`.  
`Handlebars` library is used for HTML templates and `Sass` preprocessor is used for styling.

### Node, Express, MongoDB
`Express.js` is used to implement the API server. Data is stored and manipulated with `MongoDB` and `Mongoose`.  
Cloudinary services are utilized to handle media attachments.

The backend runs in `Node.js` environment, the source code is at [quickchat-api](https://github.com/artemplv/quickchat-api).

### OpenAI API

The AI chatbot is implemented using `OpenAI API`.

### Jest and Sinon

`Jest` and `Sinon` libraries are used to test components, router, and network requests.


## Features

### AI chatbot
Users can communicate with a chatbot that is created using OpenAI API. In those chats, context is also used, so users can have a comprehensive conversation experience. Users are able to reset the context.  
**Note:** Chatbot "lives" in the app as another user and can be invited to any chat by its username.

![ai-chat](https://github.com/artemplv/messenger-web-app/assets/48654322/b0c36b01-fdaa-4e90-8fe9-bf363d4052c3)

### Media in chats
Users can send pictures from their devices.

![media-chats](https://github.com/artemplv/messenger-web-app/assets/48654322/c5d94866-e727-4cde-8e71-8c2ee129a7bc)

### Full mobile support
The app is seamlessly accessible and user-friendly on smartphones.

![mobile](https://github.com/artemplv/messenger-web-app/assets/48654322/17b59d1f-5a34-48db-b983-ce2e23a4fe19)

### User authentication
Users can sign up for an account that is secured with password encryption.

<img width="600" alt="user sign in view" src="https://github.com/artemplv/messenger-web-app/assets/48654322/f2e0ced4-f266-494b-9d0d-990f1c5d9e93">

## Code Snippets

### Event Bus

Here is how the `event bus` pattern is implemented. It is then utilized to create a component's lifecycle.

```TypeScript
class EventBus {
  listeners: { [key: string]: Function[] };

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      throw new Error(`Missing event: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: any): void {
    if (!this.listeners[event]) {
      throw new Error(`Missing event: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
```

### Block

`Block` is a base class from which all components inherit. It's similar to React's Component class.  
Here is an example of how some lifecycle methods are implemented.

```TypeScript
class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDR: 'flow:component-did-render',
    FLOW_CDU: 'flow:component-did-update',
  };

  ...
  
  private _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
  
  private _componentDidRender(): void {
    this.componentDidRender();
  }
  
  private _componentDidUpdate(): void {
    if (this.componentDidUpdate()) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }
  
  private _render() {
    const block = this.render();
    this.element.innerHTML = block;
    this.eventBus().emit(Block.EVENTS.FLOW_CDR);
  }
  ...
```

### Components

This is an example of how lifecycle methods are used in components. Here's what happens:
- After `ChatsPage` component is mounted, it fetches chats information and establishes a websocket connection with a server.
- After the component is rendered, event listeners are attached to specific elements.
- When the component's props change, the `componentDidUpdate` method is triggered. In this case, it executes some logic when a user switches chats. It returns `true` to trigger the component to rerender after an update.

```TypeScript
class ChatsPage extends Block {

  ...

  componentDidMount() {
    this.getChats();
    this.addSocketConnection();
    window.addEventListener('sessionStorageUpdate', this.onLoginLogout());
  }

  componentDidRender() {
    this.addListeners();
  }

  componentDidUpdate() {
    if (this._state.chatId !== this.props.chatId) {
      this._state.chatId = this.props.chatId;

      this.getChat();
      this._socket.send({
        chatId: this._state.chatId,
        content: '0',
        type: 'get old',
      });
    }

    return true;
  }
  ...
```

### Router
A custom client router is implemented in the app. For example, this is how route changes and redirections are handled.

```TypeScript
_onRoute(pathname: string) {
  if (pathname === '/') {
    return this.go('/chats');
  }

  const route = this.getRoute(pathname);

  if (!route) {
    return this.go('/404');
  }

  if (route.withAuth && !sessionStorage.getItem('token')) {
    return this.go('/login');
  }

  if (this._currentRoute) {
    this._currentRoute.leave();
  }

  this._currentRoute = route;
  route.render();
}
```
