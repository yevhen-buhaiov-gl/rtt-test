/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars */

import { Log } from '@lightningjs/sdk';
import { IKeyBoardMapping, ICallbackType } from './interfaces';

export default abstract class BasePlatform {
    ttsEnabled: boolean;
    strMaxSize = 2500;

    constructor() {
        this.ttsEnabled = false;
    }

    /**
     * initialize the platform, should be called after dom is render
     */
    init(initCallback: ICallbackType): void {
        Log.info('Initializing default platform');
        if (initCallback) initCallback();
    }

    /**
     * exit the application
     */
    exit(): void {
        Log.info('Exiting platform (default)');
        if (window && window.close) {
            Log.info('Closing window');
            window.close();
        }
    }

    tts(output: string): void {
        if (this.ttsEnabled) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = output;
            utterance.lang = 'en-US';
            if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance || '');
        }
    }

    getNumbersKeyMapping(): IKeyBoardMapping {
        return {
            48: '0',
            49: '1',
            50: '2',
            51: '3',
            52: '4',
            53: '5',
            54: '6',
            55: '7',
            56: '8',
            57: '9',
        };
    }

    getAtoZAndNumberKeyMapping(numbersKeyMapping = false): IKeyBoardMapping {
        const numbers = numbersKeyMapping ? this.getNumbersKeyMapping() : {};
        return {
            ...numbers,
            65: 'A',
            66: 'B',
            67: 'C',
            68: 'D',
            69: 'E',
            70: 'F',
            71: 'G',
            72: 'H',
            73: 'I',
            74: 'J',
            75: 'K',
            76: 'L',
            77: 'M',
            78: 'N',
            79: 'O',
            80: 'P',
            81: 'Q',
            82: 'R',
            83: 'S',
            84: 'T',
            85: 'U',
            86: 'V',
            87: 'W',
            88: 'X',
            89: 'Y',
            90: 'Z',
        };
    }

    getPlatformKeyMapping(): IKeyBoardMapping {
        return {
            36: 'Return',
            38: 'Up',
            40: 'Down',
            37: 'Left',
            39: 'Right',
        };
    }

    isAnimated(): boolean {
        return true;
    }
}
