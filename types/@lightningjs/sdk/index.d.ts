declare module '@lightningjs/sdk' {
    const Lightning: ILightning;
    const Utils: {
        asset: (path: string) => string;
    };
    const Router: {
        App: {
            new (stage: any): ICommon;
            static _template(): ICommon;
        };
        startRouter(config: IRouterConfig): void;
        navigate(path: string, data?: any, store?: boolean): void;
        getActiveRoute(): string;
        focusPage(): void;
        focusWidget(name: string): void;
        isNavigating(): boolean;
        back(): void;
        getHistory(): Array<any>;
        resume(): void;
        getHistoryState(): any;
        getActiveWidget(): ICommon;
        symbols: ICommon;
    };
    const Settings: any;
    const Storage: any;
    const AudioPlayer: any;
    const Log: {
        error(...args: any): () => void;
        debug(...args: any): () => void;
        info(...args: any): () => void;
        warn(...args: any): () => void;
    };
    const Img: any;
    const Application: any;
    const VersionLabel: any;
    const FpsCounter: any;
    const Keyboard: any;
    const Language: any;
    const Ads: any;
    const helpers: any;
    const Launch: any;
    const Locale: any;
    const MediaPlayer: any;
    const Metrics: any;
    const Pin: any;
    const Profile: any;
    const Purchase: any;
    const Registry: {
        setTimeout(arg1: any, arg2: number, arg3?: any);
        clearTimeout(arg: any);
        clearTimeouts();
        setInterval(arg1: any, arg2: number, arg3?: any);
        clearInterval(arg: any);
        clearIntervals(arg: any);
        addEventListener(target: string | ICommon, event: string, handler?: (e) => void);
        removeEventListener(target: string | ICommon, event: string, handler?: (e) => void);
        removeEventListeners(arg: any);
        clear();
    };
    const TV: any;
    const VideoPlayer: any;
    const Metadata: {
        appId(): string;
        get(key: string, fallback?: string[]): string;
        safeAppId(): string;
        appName(): string;
        appVersion(): string;
        appIcon(): string;
        appFullVersion(): string;
    };
}

declare module '@lightningjs/sdk/src/Router/utils/components';
declare module '@lightningjs/sdk/src/Router/utils/router';
abstract class IComponent implements Methods {
    patch(object: object, createMode?: boolean): void;

    setSmooth(key: string, value: number, options?: ISetSmoothOptions): void;

    tag(tagName: string): ITag;

    fireAncestors(methodName: string, args?: any, args2?: any, args3?: any);

    signal(methodName: string, args: any);

    _setState(state: string): void;

    _getState(): string;

    add(item: ICommon): void;

    getByRef(item: string): void;

    historyState(params: ICommon | undefined): ICommon | undefined;

    widgets: ICommon;

    animation(param: IAnimationParams): IAnimation;

    _refocus(): void;

    children: ICommon;

    childList: ICommon;

    alpha: number;

    core: ICommon;

    _getFocused(): ITag | undefined;

    stage: any;

    state: string;

    id: number;

    x: number;

    y: number;

    w: number;

    h: number;
}

interface Methods {
    _init?(): void | boolean;

    _construct?(): void;

    _build?(): void;

    _setup?(): void;

    _attach?(): void;

    _detach?(): void;

    _firstEnable?(): void;

    _enable?(): void;

    _disable?(): void;

    _firstActive?(): void;

    _active?(): void;

    _inactive?(): void;

    _handleLeft?(): void | boolean;

    _handleRight?(): void | boolean;

    _handleUp?(): void | boolean;

    _handleDown?(): void | boolean;
}

interface ILightningTools {
    getRoundRect(
        w: number,
        h: number,
        radius: number | number[],
        strokeWidth?: number,
        strokeColor?: number,
        fill?: boolean,
        fillColor?: number
    ): any;
    getSvgTexture(url: string, w: number, h: number): any;
}

interface ILightning {
    Tools: ILightningTools;
    components: {
        FastBlurComponent: any;
        ListComponent: any;
    };
    shaders: {
        RoundedRectangle: any;
    };
    Component: {
        new (stage: any): IComponent;
    };
    textures: {
        ImageTexture: ICommon;
        HtmlTexture: any;
    };
}

interface ICommon {
    [prop: string]: any;
}

interface IAnimationAction {
    t?: string;
    p: string;
    v: {
        [prop: number | string]: any;
    };
}

interface IAnimationParams {
    duration: number;
    repeat: number;
    stopMethod?: string;
    delay?: number;
    repeatDelay?: number;
    actions: IAnimationAction[];
}

interface ISetSmoothOptions {
    duration: number;
    delay?: number;
}

interface IAnimation extends ITag {
    play(): void;
    pause(): void;
    start(): void;
    stop(): void;
    replay(): void;
    finish(): void;
    skipDelay(): void;
    stopNow(): void;
    isPaused(): boolean;
    isPlaying(): boolean;
    isStopping(): boolean;
    isActive(): boolean;
    progress(): number;
}
interface ITag {
    patch(object: object, createMode?: boolean);

    animation(param: IAnimationParams): IAnimation;

    setSmooth(key: string, value: number | boolean | string, options?: ISetSmoothOptions);

    on(key: string, callback: (element: ICommon) => void);

    children: ICommon;

    childList: {
        _element: ICommon;
        _items: ICommon[];
        _refs: ICommon;
        a: (o: ICommon) => void;
        getAt: (i: number) => ITag;
        getByRef: (ref: string) => ITag;
        getIndex: (el: ICommon) => number;
        clear: () => void;
        length: number;
        first: ICommon;
        last: ICommon;
    };

    widgets: ICommon;

    [propName: string]: any;
}

interface IRoute {
    path: string | Promise<string>;
    component: any;
    on?(page: any, ...args: any): Promise<void>;
    beforeNavigate?(from: string): Promise<boolean | void>;
    before?(page: any, ...args: any): Promise<void>;
    after?(page: any, ...args: any): Promise<void>;
    widgets?: string[];
    hook?(app: any, ...args: any): void;
    cache?: number;
    options?: {
        preventStorage?: boolean;
        clearHistory?: boolean;
        reuseInstance?: boolean;
    };
}
interface IRouterConfig {
    root: string | Promise<string>;
    boot?(queryString: ICommon): Promise<void>;
    bootComponent?: any;
    routes: IRoute[];
    beforeEachRoute?(from: ICommon | undefined, to: ICommon): Promise<boolean>;
}
