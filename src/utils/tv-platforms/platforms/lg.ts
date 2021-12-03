import BasePlatform from './base.js';
import { IKeyBoardMapping } from './interfaces';

export default class LGPlatform extends BasePlatform {
    getPlatformKeyMapping(): IKeyBoardMapping {
        const numberLetterKeyMapping = this.getAtoZAndNumberKeyMapping(true);
        return {
            ...numberLetterKeyMapping,
            461: 'Back',
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
            1536: 'ScrollBar',
            1537: 'MagicRemoteNav',
        };
    }

    isAnimated(): boolean {
        return true;
    }
}
