import Router from './router/Router.js';

import ChatsPage from './pages/Chats/index.js';
import ChatFeedPage from './pages/ChatFeed/index.js';
import Profile from './pages/Profile/index.js';
import SignPage from './pages/Sign/index.js';
import NotFoundError from './pages/NotFoundError/index.js';

import { sampleChats } from './pages/Chats/sampleChats.js';
import { registerForm } from './components/RegisterForm/index.js';
import { loginForm } from './components/LoginForm/index.js';

const router = new Router('.app');

router
  .use('/chats', ChatsPage, { chatsList: sampleChats })
  .use('/chat-feed', ChatFeedPage, { chatsList: sampleChats })
  .use('/profile', Profile, {})
  .use('/login', SignPage, { form: loginForm })
  .use('/signup', SignPage, { form: registerForm })
  .use('/404', NotFoundError, {})
  .start();

interface CustomEventData extends Event {
  detail: string;
}

window.addEventListener('_pushstate', (event: CustomEventData) => router.go(event.detail));
