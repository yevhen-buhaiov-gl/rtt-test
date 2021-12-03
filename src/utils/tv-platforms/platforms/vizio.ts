import BasePlatform from './base.js';
import { IKeyBoardMapping } from './interfaces/index.js';
import { Log, Registry } from '@lightningjs/sdk';
import { checkConnectionBase } from '../connection.js';

export default class VizioPlatform extends BasePlatform {
    deviceId!: string;
    firmwareVersion!: string;
    constructor() {
        super();
        this.ttsEnabled = false;
    }
    init(): void {
        Registry.addEventListener(document, 'VIZIO_TTS_ENABLED', () => {
            Log.info('TTS Enabled');
            this.ttsEnabled = true;
        });

        Registry.addEventListener(document, 'VIZIO_TTS_DISABLED', () => {
            Log.info('TTS Disabled');
            this.ttsEnabled = false;
        });
    }

    exit(): void {
        window.VIZIO.exitApplication();
    }

    tts(textToRead: string): void {
        if (this.ttsEnabled) {
            window.VIZIO.Chromevox.play(textToRead || '');
        }
    }

    getPlatformKeyMapping(): IKeyBoardMapping {
        const numberLetterKeyMapping = this.getAtoZAndNumberKeyMapping(true);
        return {
            ...numberLetterKeyMapping,
            27: 'Exit',
            37: 'Left',
            38: 'Up',
            39: 'Right',
            40: 'Down',
            19: 'Pause',
            412: 'Rewind',
            413: 'Stop',
            415: 'Play',
            417: 'FastForward',
            418: 'MediaTrackNext',
            419: 'MediaTrackPrevious',
            173: 'AudioVolumeMute',
            174: 'AudioVolumeDown',
            175: 'AudioVolumeUp',
            157: 'Info',
        };
    }

    checkConnection(): void {
        checkConnectionBase();
    }
}

declare global {
    interface Window {
        VIZIO: ICommon;
    }
}
