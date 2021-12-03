import { Launch } from '@lightningjs/sdk';
import App from './App.ts';
import { platform } from './utils/tv-platforms/';
import { SCREEN_SIZE } from './constants/ui';

var precision = SCREEN_SIZE.height / window.innerHeight;

if (precision !== 1) {
    lng.Element.prototype.enableTextTexture = (function(func) {
        return function() {
            const texture = func.apply(this, arguments);
            texture.precision = 1.5;
            return texture;
        };
    })(lng.Element.prototype.enableTextTexture);
}

export default function() {
    arguments[0].keys = platform.getPlatformKeyMapping();
    return Launch(App, ...arguments);
}
