import { Log, Registry } from '@lightningjs/sdk';
import { checkConnectionBase } from '../connection.js';
import BasePlatform from './base.js';
import { ICallbackType, IKeyBoardMapping } from './interfaces/index.js';

const PlayerControlsKeys = [
    'MediaRewind',
    'MediaFastForward',
    'MediaPlay',
    'MediaPause',
    'MediaPlayPause',
];

enum APP_ID {
    premium = 'com.samsung.tv.store', // app id for Smart Hub Samsung Application app/view for premium devices.
    standart = 'org.volt.apps', //app id for Smart Hub Samsung Application app/view for standard devices.
}

export default class SamsungPlatform extends BasePlatform {
    isActiveAppStore: boolean;

    constructor() {
        super();
        this.ttsEnabled = false;
        this.isActiveAppStore = false;
        this.strMaxSize = 150;
    }

    init(initCallback: ICallbackType): void {
        this.checkIfAppStoreIsActive();
        if (initCallback) initCallback();
        if (window.webapis) {
            // workaround  -  tvinfo object is not loaded initially
            Registry.setTimeout(() => {
                this.ttsEnabled = Boolean(
                    window.webapis.tvinfo.getMenuValue(
                        window.webapis.tvinfo.TvInfoMenuKey.VOICE_GUIDE_KEY
                    )
                );

                const onChangeVoiceGuide = () => {
                    // Gets true or false status
                    this.ttsEnabled = Boolean(
                        window.webapis.tvinfo.getMenuValue(
                            window.webapis.tvinfo.TvInfoMenuKey.VOICE_GUIDE_KEY
                        )
                    );
                };
                try {
                    window.webapis.tvinfo.addCaptionChangeListener(
                        window.webapis.tvinfo.TvInfoMenuKey.VOICE_GUIDE_KEY,
                        onChangeVoiceGuide
                    );
                } catch (error) {
                    Log.info(`error code = ${error}`);
                }
            }, 5000);
        }
        this.registerRemoteKeys();
    }

    getPlatformKeyMapping(): IKeyBoardMapping {
        const numberLetterKeyMapping = this.getAtoZAndNumberKeyMapping(true);
        return {
            ...numberLetterKeyMapping,
            10009: 'Back',
            36: 'Return',
            38: 'Up',
            40: 'Down',
            37: 'Left',
            39: 'Right',
            415: 'Play',
            417: 'FastForward',
            412: 'Rewind',
            19: 'Pause',
            10252: 'PlayPause',
        };
    }

    registerRemoteKeys(): void {
        try {
            window.tizen.tvinputdevice.registerKeyBatch(PlayerControlsKeys);
        } catch (e) {
            Log.error('Tizen API is not available');
        }
    }

    checkIfAppStoreIsActive(): void {
        window.tizen && window.tizen.application.getAppsContext(this.onRunningAppsContext);
    }

    onRunningAppsContext = (contexts: { appId: string }[]): boolean => {
        if (contexts && contexts.length) {
            this.isActiveAppStore = !!contexts.find(({ appId }) => {
                return appId === APP_ID.premium || appId === APP_ID.standart;
            });
        }
        return false;
    };

    goBackToAppStore(): void {
        const app = window.tizen.application.getCurrentApplication();
        const shouldExitTheApp =
            typeof navigator.userAgent === 'string' && navigator.userAgent.includes('Tizen 3.0');

        window.tizen &&
            window.tizen.application.launch(
                APP_ID.premium,
                () => {
                    shouldExitTheApp && app.exit();
                },
                () => {
                    window.tizen.application.launch(
                        APP_ID.standart,
                        () => {
                            shouldExitTheApp && app.exit();
                        },
                        () => {
                            window.tizen.application.getCurrentApplication().exit();
                        }
                    );
                }
            );
    }

    exit(): void {
        try {
            if (window.tizen) {
                this.isActiveAppStore
                    ? this.goBackToAppStore()
                    : window.tizen.application.getCurrentApplication().exit();
            }
        } catch (e) {
            Log.error('Tizen API is not available', e);
        }
    }

    checkConnection(): void {
        checkConnectionBase();
    }
}

declare global {
    interface Window {
        webapis: ICommon;
        tizen: ICommon;
    }
}
