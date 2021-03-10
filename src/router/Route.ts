import Block from '../modules/block';
import { render } from '../utils/render';

interface ComponentConstructor {
    new (props?: Props): InstanceType<typeof Block>;
}

interface Props extends PlainObject {
  rootQuery: string;
}

export default class Route {
  private _pathname: string;
  private _blockClass: ComponentConstructor;
  private _block: InstanceType<typeof Block> | null;
  private _props: Props;

  constructor(pathname: string, view: ComponentConstructor, props: Props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  setProps(props: PlainObject) {
    this._props = { ...this._props, ...props };
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    const paramNames: string[] = [];

    const regexPath = this._pathname.replace(/([:*])(\w+)/g, (_full, _colon, name) => {
      paramNames.push(name);
      return '([^/]+)';
    }) + '(?:/|$)';

    let pathParams;

    const routeMatch = pathname.match(new RegExp(regexPath));

    if (routeMatch !== null) {
      pathParams = routeMatch.slice(1).reduce((params, value, index) => {
        params[paramNames[index]] = value;
        return params;
      }, <PlainObject>{});

      this.setProps(pathParams);
      return true;
    }

    return false;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
