import { setCarouselConfigs, ICarouselConfig, CAROUSEL_HEIGHT } from '../Carousel/Carousel.model';
import { RESIZE_MODE_TYPE, SCREEN_SIZE } from '../../constants/ui';
import Carousel from '../Carousel/Carousel';
import { CAROUSEL_TYPE } from '../../constants/common';
import { Lightning } from '@lightningjs/sdk';

export interface ICardRowConfigs {
    carouselType: CAROUSEL_TYPE;
    title: string;
    description?: string;
    items: IComponent[];
    colors?: [number, number];
    width?: number;
    viewportScrollOffset?: number;
    carouselPosition?: number;
    img_uri?: string;
    imgOffsetX?: number;
}

export interface ICardRowCarouselParams {
    x?: number;
    w?: number;
    items: IComponent[];
    carouselType: CAROUSEL_TYPE;
    carouselWidth: number;
    viewportScrollOffset?: number;
    positionLeft: number;
}

interface ICardRowCarousel {
    x?: number;
    w?: number;
    h: number;
    type: typeof Carousel;
    items: IComponent[];
    configs: ICarouselConfig;
}

export const CAROUSEL_PADDING_LEFT = 135;
export const LABELED_CARD_ROW_HEIGHT = 450;
export const LABELED_CAROUSEL_WIDTH = 1668;
export const ITEMS_BEFORE_PAGINATION = 5;

export const CardRowTemplate: ICommon = {
    CardRow: {},
};

const commonTextParams = {
    maxLinesSuffix: '...',
    wordWrapWidth: 389,
};

export enum CardRowFireAncestors {
    onFocusChanged = '$onFocusChanged',
}

export const setCardRowLabel = (title: string, shouldUsePadding = false): ICommon => {
    return {
        x: shouldUsePadding ? CAROUSEL_PADDING_LEFT : 0,
        flexItem: {
            marginTop: 25,
        },
        text: {
            ...commonTextParams,
            fontSize: 36,
            maxLines: 1,
            wordWrapWidth: 1000,
            text: title,
        },
    };
};

interface IOverlayParams {
    w: number;
    h: number;
    color1: number;
    color2?: number;
    zIndex?: number;
}

export const setOverlay = ({ w, h, color1, color2, zIndex = 0 }: IOverlayParams): ICommon => {
    const colorRight = Number.isInteger(color2) ? color2 : color1;
    return {
        zIndex,
        w,
        h,
        colorLeft: color1,
        colorRight: colorRight,
        rect: true,
    };
};

export const setBackgroundImageLayout = (
    w: number,
    h: number,
    src: string,
    overlapWidth: number
): ICommon => {
    return {
        flexItem: false,
        alpha: 0.01,
        w,
        h,
        BottomBackground: {
            w,
            h,
            src,
        },
        TopBackground: {
            zIndex: 2,
            h,
            texture: {
                type: Lightning.textures.ImageTexture,
                src,
                resizeMode: { type: RESIZE_MODE_TYPE.cover, w: overlapWidth, h, clipX: 0 },
            },
        },
    };
};

export const setCardRowCarousel = ({
    x = 0,
    w = SCREEN_SIZE.width,
    items,
    carouselType,
    carouselWidth,
    viewportScrollOffset,
    positionLeft = 0,
}: ICardRowCarouselParams): ICardRowCarousel => ({
    x,
    w,
    h: CAROUSEL_HEIGHT[carouselType] as number,
    type: Carousel,
    items,
    configs: setCarouselConfigs({
        carouselType,
        viewPortWidth: carouselWidth,
        viewportScrollOffset,
        positionLeft,
    }),
});
