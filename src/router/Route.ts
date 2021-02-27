import Block from '../modules/block.js';
import { render } from '../utils/render.js';

// interface ComponentConstructor {
//     new (): InstanceType<typeof Block>;
// }

interface Props {
  [key: string]: any;
  rootQuery: string;
}

export default class Route {
  private _pathname: string;
  private _blockClass: InstanceType<typeof Block>;
  private _block: InstanceType<typeof Block> | null;
  private _props: Props;

  constructor(pathname: string, view: InstanceType<typeof Block>, props: Props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
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
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass;
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
