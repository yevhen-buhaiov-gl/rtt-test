import { Router, Utils } from '@lightningjs/sdk';
import { IFont } from './App.model';
import { FONT_FACE, getFonts, SCREEN_SIZE } from './constants/ui';
import { setPlatformRequirements } from './platformRequirements';
import routerConfig from './routes';

export default class App extends Router.App {
    static getFonts(): IFont[] {
        return getFonts([FONT_FACE.regular, FONT_FACE.bold]);
    }

    _construct(): void {
        setPlatformRequirements(process.env.APP_PLATFORM as string);
    }

    static _template(): ICommon {
        return {
            ...super._template(),
            Loading: {
                rect: true,
                w: SCREEN_SIZE.width,
                h: SCREEN_SIZE.height,
                src: Utils.asset('images/loader.jpg'),
                alpha: 0,
            },
        };
    }

    _setup(): void {
        Router.startRouter(routerConfig);
    }
}
