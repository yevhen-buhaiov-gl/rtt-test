import Vizio from './platforms/vizio';
import Comcast from './platforms/comcast';
import Samsung from './platforms/samsung';
import LG from './platforms/lg';

const platformName = process.env.APP_PLATFORM;

let PlatformConstructor;

switch (process.env.APP_PLATFORM) {
    case 'vizio':
        PlatformConstructor = Vizio;
        break;
    case 'comcast':
        PlatformConstructor = Comcast;
        break;
    case 'samsung':
        PlatformConstructor = Samsung;
        break;
    case 'lg':
        PlatformConstructor = LG;
        break;
    default:
        PlatformConstructor = Samsung;
}

const Platforms = {
    platform: new PlatformConstructor(),
    platformName,
};

export const platform = Platforms.platform;

export default Platforms;
