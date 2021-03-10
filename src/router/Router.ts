import Route from './Route';
import Block from '../modules/block';

interface ComponentConstructor {
    new (props?: Props): InstanceType<typeof Block>;
}

interface Props extends PlainObject {
  rootQuery: string;
}

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

  use(pathname: string, block: ComponentConstructor, blockProps: PlainObject = {}) {
    const route = new Route(pathname, block, { ...blockProps, rootQuery: this._rootQuery });
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
      return this.go('/404');
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
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
