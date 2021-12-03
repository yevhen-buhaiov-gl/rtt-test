import { Utils } from '@lightningjs/sdk';

export enum COLOR {
    black = 0xff000000,
    white = 0xffffffff,
    green = 0xff4e9102,
    lightGreen = 0xff99cc00,
    blue = 0xff225cb3,
    yellow = 0xffedf04f,
    gray = 0xff2d3134,
    gray2 = 0xff3e3e3e,
    darkGray = 0xff27292d,
    darkGray2 = 0xff2d3134,
    darkGray3 = 0xff121416,
    darkGray4 = 0xff1b1b1b,
    darkGray5 = 0xff212327,
    darkGray6 = 0xff303030,
    lightGray = 0xff3f4447,
    lightGray2 = 0x80191a1d,
    lightGray3 = 0xff55565b,
    lightGray4 = 0xffedf1f3,
    lightGray5 = 0xffe6eaed,
    lightGray6 = 0xffa0a0a0,
    lightGray7 = 0xff8d8d8d,
    lightRed = 0xfff9838a,
    transparent = 0x00ffffff,
    semiTransparent = 0x80000000,
    semiLightTransparent = 0x80ffffff,
    purple = 0xff6117ab,
    magenta = 0xffc80e83,
    red = 0xffe22c3a,
    red2 = 0xffc6002b,
    red3 = 0xffe22c3a,
    pink = 0xffc80e83,
    rose = 0xfff4747c,
    orange = 0xfff57f17,
    lightOrange = 0xfff1b501,
}

export const NAV_BAR_WIDTH = 140;

export interface FONT_FACE_ITEM {
    family: FONT_FACE;
    url: string;
}

export function getFonts(fonts: FONT_FACE[]): FONT_FACE_ITEM[] {
    return fonts.map((family: FONT_FACE): FONT_FACE_ITEM => ({ family, url: FONT_URL(family) }));
}

export enum FONT_FACE {
    regular = 'Regular',
    bold = 'Bold',
}

export const FONT_URL = (fontFace: FONT_FACE): string => {
    switch (fontFace) {
        case FONT_FACE.regular:
            return Utils.asset('fonts/Roboto/Roboto-Regular.ttf');
        case FONT_FACE.bold:
            return Utils.asset('fonts/Roboto/Roboto-Bold.ttf');

        default:
            throw new Error(`${fontFace} not found`);
    }
};

export enum FONT_STYLE {
    normal = 'normal',
    bold = 'bold',
    italic = 'italic',
}

export enum SCREEN_SIZE {
    width = 1920,
    height = 1080,
}

export enum FLEX_DIRECTION {
    row = 'row',
    column = 'column',
}

export enum JUSTIFY_CONTENT {
    center = 'center',
    flexStart = 'flex-start',
    flexEnd = 'flex-end',
    spaceBetween = 'space-between',
    spaceAround = 'space-around',
    spaceEvenly = 'space-evenly',
}

export enum ITEM_ALIGN {
    center = 'center',
    flexStart = 'flex-start',
    flexEnd = 'flex-end',
    stretch = 'stretch',
}

export enum ALIGN_TYPE {
    column = 'column',
    row = 'row',
}

export enum IMAGE_GRAVITY {
    center = 'center',
}

export enum TEXT_ALIGN {
    left = 'left',
    right = 'right',
    center = 'center',
}

export enum ANIMATION_STOP_METHOD {
    fade = 'fade',
    reverse = 'reverse',
    forward = 'forward',
    immediate = 'immediate',
    onetotwo = 'onetotwo',
}

export enum PAGE_TRANSITION_TYPE {
    left = 'left',
    right = 'right',
    up = 'up',
    down = 'down',
    fade = 'fade',
    crossFade = 'crossFade',
}

export enum TEXTURE_EVENTS {
    txLoaded = 'txLoaded',
    txError = 'txError',
    txUnloaded = 'txUnloaded',
    progress = 'progress',
}

export enum RESIZE_MODE_TYPE {
    cover = 'cover',
    contain = 'contain',
}
