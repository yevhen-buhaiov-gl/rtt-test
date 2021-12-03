import { Lightning } from '@lightningjs/sdk';
import { DEFAULT_CARD_SIZE } from '../Cards/DefaultCard/DefaultCard.model';
import { SCREEN_SIZE } from '../../constants/ui';
import { CAROUSEL_TYPE } from '../../constants/common';
import { setDuration, IAnimationDuration } from '../../utils/animationProps';

interface ICarouselConfigsParams {
    carouselType: CAROUSEL_TYPE;
    w?: number;
    viewportScrollOffset?: number;
    scrollTransition?: IAnimationDuration;
    horizontal?: boolean;
    roll?: boolean;
    viewPortWidth?: number;
    positionLeft: number;
}

interface ICarouselConfig {
    itemSize: number;
    horizontal: boolean;
    w: number;
    h: number;
    y?: number;
    x?: number;
    scrollTransition?: IAnimationDuration;
    viewportScrollOffset?: number;
    roll?: boolean;
    rollMin?: number;
    rollMax?: number;
    viewPortWidth: number;
    itemWidth: number;
    positionLeft: number;
}

export const CarouselTemplate = {
    Carousel: {
        boundsMargin: [0, 400, 0, 400],
        type: Lightning.components.ListComponent,
    },
};

interface ICarouselParams {
    [CAROUSEL_TYPE.DEFAULT_CARD]: number | string;
}

export const CAROUSEL_HEIGHT: ICarouselParams = {
    [CAROUSEL_TYPE.DEFAULT_CARD]: DEFAULT_CARD_SIZE.height,
};

const PADDING_BETWEEN_CARDS = 40;
const DEFAULT_CAROUSEL_WIDTH = SCREEN_SIZE.width;
export const DEFAULT_VIEWPORT_SCROLL_OFFSET = 0.05;
const DEFAULT_SCROLL_TRANSITION: IAnimationDuration = setDuration();

// Amount of pixels to scroll during navigation
const ITEM_WIDTH = {
    [CAROUSEL_TYPE.DEFAULT_CARD]: DEFAULT_CARD_SIZE.width,
};

const setCarouselConfigs = ({
    carouselType,
    w = DEFAULT_CAROUSEL_WIDTH,
    horizontal = true,
    roll = true,
    scrollTransition = DEFAULT_SCROLL_TRANSITION,
    viewportScrollOffset = DEFAULT_VIEWPORT_SCROLL_OFFSET,
    viewPortWidth = DEFAULT_CAROUSEL_WIDTH,
    positionLeft,
}: ICarouselConfigsParams): ICarouselConfig => {
    return {
        w,
        h: CAROUSEL_HEIGHT[carouselType] as number,
        viewportScrollOffset,
        scrollTransition,
        horizontal,
        roll,
        itemSize: ITEM_WIDTH[carouselType] + PADDING_BETWEEN_CARDS,
        rollMin: ITEM_WIDTH[carouselType] + PADDING_BETWEEN_CARDS,
        rollMax: SCREEN_SIZE.width,
        viewPortWidth,
        itemWidth: ITEM_WIDTH[carouselType],
        positionLeft,
    };
};

export { setCarouselConfigs, ICarouselConfig };
