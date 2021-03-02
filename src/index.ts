import Router from './router/Router.js';

import ChatsPage from './pages/Chats/index.js';
import ChatFeedPage from './pages/ChatFeed/index.js';
import Profile from './pages/Profile/index.js';
import SignPage from './pages/Sign/index.js';
import NotFoundError from './pages/NotFoundError/index.js';

import RegisterForm from './components/RegisterForm/index.js';
import LoginForm from './components/LoginForm/index.js';

const router = new Router('.app');

router
  .use('/chats', ChatsPage, {})
  .use('/chat/:chatId', ChatFeedPage, {})
  .use('/profile', Profile, {})
  .use('/login', SignPage, { form: LoginForm })
  .use('/signup', SignPage, { form: RegisterForm })
  .use('/404', NotFoundError, {})
  .start();

window.addEventListener('_pushstate', (event: CustomEventData) => router.go(event.detail));
