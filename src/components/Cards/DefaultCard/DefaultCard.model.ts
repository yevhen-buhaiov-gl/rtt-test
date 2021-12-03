import { Lightning } from '@lightningjs/sdk';
import { COLOR } from '../../../constants/ui';

export interface IDefaultCardProps {
    id: number;
    title: string;
    subText: string;
    imageUrl: string;
    type: string;
    onFocus?: string | null;
    onEnter?(): void;
    label?: ICommon | null;
    isHiddenCardText?: boolean;
}

export enum DEFAULT_IMAGE_SIZE {
    width = 300,
    height = 300,
    radius = 6,
}

export enum DEFAULT_CARD_SIZE {
    width = 300,
    height = 360,
}

const maxLinesStyles = {
    maxLines: 1,
    wordWrapWidth: 300,
    maxLinesSuffix: ' ...',
};

export const DefaultCardTemplate = (): ICommon => ({
    rect: true,
    w: DEFAULT_CARD_SIZE.width,
    h: DEFAULT_CARD_SIZE.height,
    color: COLOR.transparent,
    rtt: true, // using rtt leads to screen blinking
    Background: {
        rect: true,
        w: DEFAULT_CARD_SIZE.width,
        h: DEFAULT_CARD_SIZE.height,
        color: COLOR.lightGray,
        shader: {
            type: Lightning.shaders.RoundedRectangle,
            radius: DEFAULT_IMAGE_SIZE.radius,
        },
    },
    Image: {
        w: DEFAULT_IMAGE_SIZE.width,
        h: DEFAULT_IMAGE_SIZE.height,
        shader: {
            type: Lightning.shaders.RoundedRectangle,
            radius: [DEFAULT_IMAGE_SIZE.radius, DEFAULT_IMAGE_SIZE.radius, 0, 0],
        },
    },
    Title: {
        y: 305,
        x: 15,
        w: 285,
        h: 30,
    },
    SubText: {
        y: 330,
        x: 15,
        text: {
            fontSize: 18,
            textColor: COLOR.semiLightTransparent,
            ...maxLinesStyles,
        },
    },
});
