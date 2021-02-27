import Router from './router/Router.js';

import ChatsPage from './pages/Chats/index.js';
import ChatFeedPage from './pages/ChatFeed/index.js';
import Profile from './pages/Profile/index.js';
import SignPage from './pages/Sign/index.js';

import { sampleChats } from './pages/Chats/sampleChats.js';
import { registerForm } from './components/RegisterForm/index.js';
import { loginForm } from './components/LoginForm/index.js';

const router = new Router('.app');

router
  .use('/chats', new ChatsPage({ chatsList: sampleChats }))
  .use('/chat-feed', new ChatFeedPage({ chatsList: sampleChats }))
  .use('/profile', new Profile())
  .use('/login', new SignPage({ form: loginForm }))
  .use('/signup', new SignPage({ form: registerForm }))
  .start();

interface CustomEventData extends Event {
  detail: string;
}

window.addEventListener('_pushstate', (event: CustomEventData) => router.go(event.detail));
