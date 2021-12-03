import BasePlatform from './base.js';
import { IActionMetricsHandlerParams, IMetricsHandlerParams } from './interfaces/comcast.js';
import { IKeyBoardMapping } from './interfaces';
import { Log } from '@lightningjs/sdk';

export default class ComcastPlatform extends BasePlatform {
    badger!: typeof MockBadger;

    constructor() {
        super();
        window.addEventListener('popstate', function(_event) {
            history.pushState(null, document.title, location.href);
        });
        document.addEventListener('onMoneyBadgerReady', () => {
            this.initPlatformAPI();
            this.dismissLoadingScreen();
        });
    }

    initPlatformAPI(): void {
        this.badger = MockBadger;
    }

    exit(): void {
        this.badger.shutdown();
    }

    dismissLoadingScreen(): void {
        this.badger.dismissLoadingScreen();
    }

    /**
     * @param {string} message
     */
    showToaster(message: string): void {
        this.badger.showToaster(message);
    }

    /**
     * @param {MetricsDataType} data
     */

    /**
     * @param {string} message - text description of the error
     * @param {boolean} visible - whether the user was notified about an error or not
     */
    reportErrorMetric(message: string, visible: boolean): void {
        this.badger?.errorMetricsHandler({ message, visible });
    }

    getPlatformKeyMapping(): IKeyBoardMapping {
        const numbers = this.getNumbersKeyMapping();
        return {
            ...numbers,
            36: 'Return',
            38: 'Up',
            40: 'Down',
            37: 'Left',
            39: 'Right',
            228: 'FastForward',
            227: 'Rewind',
            179: 'PlayPause',
        };
    }
}

const getBadger = () => {
    return typeof window.$badger !== 'undefined' ? window.$badger : false;
};

const MockBadger = {
    shutdown: () => {
        const $badger = getBadger();
        if ($badger) $badger.shutdown();
    },
    dismissLoadingScreen: () => {
        const $badger = getBadger();
        Log.info('Dismiss loading screen');
        if ($badger) $badger.dismissLoadingScreen();
    },
    info: (): ICommon => {
        return new Promise((resolve, reject) => {
            const badger = getBadger();
            badger
                ? badger
                      .info()
                      .success((data: ICommon) => resolve(data))
                      .failure(() => reject('Failed to load device information'))
                : reject('Failed to load device information');
        });
    },

    /**
     * @param {string} message
     */
    showToaster: (message = '') => {
        const $badger = getBadger();
        if ($badger) $badger.showToaster(message);
    },

    /**
     * @typedef {Object} MetricsDataType
     * @property {string} action - Required, The name of the action which was successfully completed
     * @property {object} [payload] - Optional, the individual properties in payload must be primitives (string, numeric or boolean). Nesting of properties is not supported.
     */

    /**
     * @param {MetricsDataType} metricsData
     */
    appActionMetricsHandler: ({ action, payload }: IActionMetricsHandlerParams) => {
        const $badger = getBadger();
        if ($badger) $badger.appActionMetricsHandler(action, payload);
    },

    /**
     * @typedef {Object} ErrorDataType
     * @property {string} message - Required, The text of the error message.
     * @property {boolean} visible - Required, indicates whether the error was displayed to the user.
     * @property {string} [code] - Optional, The error code which was displayed. This can be any value which is meaningful to your app, but defaults to CH_ERR
     * @property {object} [args] - Optional, The individual properties in args must be primitives (string, numeric or boolean). Nesting of properties is not supported.s
     */

    /**
     * @param {ErrorDataType} errorData
     */
    errorMetricsHandler: ({ message, visible }: IMetricsHandlerParams) => {
        const $badger = getBadger();
        if ($badger) $badger.errorMetricsHandler(message, visible);
    },

    isAnimated(): boolean {
        return false;
    },
};

declare global {
    interface Window {
        $badger: ICommon;
    }
}
