import Router from './router/Router';

import ChatsPage from './pages/Chats';
import ChatFeedPage from './pages/ChatFeed';
import Profile from './pages/Profile';
import SignPage from './pages/Sign';
import NotFoundError from './pages/NotFoundError';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

import './static/assets/css/style.scss';
import './globals';

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
