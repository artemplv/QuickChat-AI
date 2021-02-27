// class Block {
//   getContent() { }
//
//   show() {
//     console.log('show');
//   }
//
//   hide() {
//     console.log('hide');
//   }
// }
//
// class Chats extends Block {
//   getContent() {
//     return 'chats';
//   }
//
//   show() {
//     console.log('show chats');
//   }
//
//   hide() {
//     console.log('hide chats');
//   }
// }
//
// class Users extends Block {
//   getContent() {
//     return 'users';
//   }
//
//   show() {
//     console.log('show users');
//   }
//
//   hide() {
//     console.log('hide users');
//   }
// }

import Route from "./Route.js";
import { Block } from "../modules/block.js";

// interface ComponentConstructor {
//     new (): InstanceType<typeof Block>;
// }

export default class Router {
  routes: InstanceType<typeof Route>[];
  history: History;
  private _currentRoute: InstanceType<typeof Route> | null;
  private _rootQuery: string;
  static __instance: Router;

  constructor(rootQuery: string) {
      if (Router.__instance) {
          return Router.__instance;
      }

      this.routes = [];
      this.history = window.history;
      this._currentRoute = null;
      this._rootQuery = rootQuery;

      Router.__instance = this;
  }

  use(pathname: string, block: InstanceType<typeof Block>) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: any) => {
      this._onRoute(event.currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

// const router = new Router(".app");
//
// router
//   .use("/", Chats)
//   .use("/users", Users)
//   .start();
//
// setTimeout(() => {
//   router.go("/users");
// }, 1000);
//
// setTimeout(() => {
//   router.back();
// }, 3000);
//
// setTimeout(() => {
//   router.forward();
// }, 5000);
