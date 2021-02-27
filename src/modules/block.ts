import EventBus from "../event-bus.js";

interface MetaType {
  tagName: string;
  props: {};
}

interface ProxyConstructor {
  revocable<T extends object>(target: T, handler: any): { proxy: T; revoke: () => void; };
  new <T extends object>(target: T, handler: any): T;
}
declare const Proxy: ProxyConstructor;

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update"
  };

  private _element: any;
  private _meta: MetaType;

  props: {};
  eventBus: () => EventBus;

  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    }

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  public init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

	// Может переопределять пользователь, необязательно трогать
  componentDidMount(): void {}

  _componentDidUpdate(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

	// Может переопределять пользователь, необязательно трогать
  componentDidUpdate(): boolean {
    return true;
  }

  setProps = (nextProps: {}): void => {
    if (!nextProps) {
      return;
    }

    (<any>Object).assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  _render() {
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this.getContent().innerHTML = block;
  }

	// Может переопределять пользователь, необязательно трогать
  render(): any {}

  getContent(): HTMLElement {
    return this._element;
  }

  _makePropsProxy(props: {}) {
    const self = this;

    const proxyProps = new Proxy(props, {
      set(target: any, prop: any, value: any): boolean {
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU);
        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });

    return proxyProps;
  }

  _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show(): void {
    this.getContent().style.display = "block";
  }

  hide(): void {
    this.getContent().style.display = "none";
  }
}
