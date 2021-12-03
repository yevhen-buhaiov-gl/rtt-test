import { Lightning } from '@lightningjs/sdk';

import { FLEX_DIRECTION, ITEM_ALIGN, SCREEN_SIZE } from '../../constants/ui';
import { DEFAULT_VIEWPORT_SCROLL_OFFSET } from '../Carousel/Carousel.model';
import {
    CardRowTemplate,
    setCardRowCarousel,
    setCardRowLabel,
    LABELED_CAROUSEL_WIDTH,
    LABELED_CARD_ROW_HEIGHT,
    ICardRowConfigs,
    ICardRowCarouselParams,
} from './CardRow.model';

export default class CardRow extends Lightning.Component {
    private _total!: number;
    private _focusedIdx = 0;

    static _template(): ICommon {
        return CardRowTemplate;
    }

    set configs(v: ICardRowConfigs) {
        const {
            title,
            carouselType,
            items,
            width = LABELED_CAROUSEL_WIDTH,
            viewportScrollOffset = DEFAULT_VIEWPORT_SCROLL_OFFSET,
            carouselPosition,
        } = v;

        this.setLabeledCardRowConfigs(title, !!viewportScrollOffset, carouselPosition);
        this.setCardRowCarousel({
            positionLeft: 0,
            carouselType,
            items,
            carouselWidth: width,
            viewportScrollOffset,
        });
    }

    setCardRowCarousel(carouselParams: ICardRowCarouselParams): void {
        this.tag('Wrapper').patch({
            Carousel: setCardRowCarousel(carouselParams),
        });
    }

    setLabeledCardRowConfigs(title: string, shouldUsePadding = false, carouselPosition = 40): void {
        this.h = LABELED_CARD_ROW_HEIGHT;
        this.tag('CardRow').patch({
            w: SCREEN_SIZE.width,
            h: LABELED_CARD_ROW_HEIGHT,
            flex: {
                direction: FLEX_DIRECTION.column,
            },
            Label: setCardRowLabel(title, shouldUsePadding),
            Wrapper: {
                w: SCREEN_SIZE.width,
                h: this.h,
                x: carouselPosition,
                flex: { alignItems: ITEM_ALIGN.center },
            },
        });
    }

    get focusPosition(): number {
        return this.tag('Carousel').focusPosition;
    }

    set focusPosition(v: number) {
        this.tag('Carousel').focusPosition = v;
    }

    set total(v: number) {
        this._total = v;
    }

    get total(): number {
        return this._total;
    }

    get focusedIdx(): number {
        return this._focusedIdx;
    }

    set focusedIdx(v: number) {
        this._focusedIdx = v;
    }

    setIndex(idx: number): void {
        this.tag('Carousel').setIndex(idx, true);
    }

    _getFocused(): ITag {
        return this.tag('Carousel');
    }

    setInitialParams(): void {
        this.tag('Carousel').setInitialParams();
    }
}
