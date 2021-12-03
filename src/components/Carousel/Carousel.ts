/*
Carousel (Lightning.components.ListComponent) can be configured with adding "configs" object, it takes next props:
   * w, h - carousel's width and height,
   * y, x - carousel's position
   * itemSize - scroll area size in pixels per item (padding included),
   * scrollTransition - Example:  { duration: 0.5 },
   * invertDirection: boolean - Inverts the scrolling direction,
   * roll: boolean - Should the list jump when scrolling between end to start or like infinite carousel,
   * viewportScrollOffset: 0.05,
   * itemScrollOffset: 0,
   * rollMin: number - restricting the start scroll position
   * rollMax: number - restricting the end scroll position
   * progressAnimation - custom animation that is applied when an item is (partially) selected.
   * horizontal : boolean - display items horizontally or vertically

Basic List Component Methods :
  * setNext - scroll to next item
  * setPrevious - scroll to previous item
  * getElement(index) - get List element by index
  * setIndex(index) - scroll to  indexed element
  All methods can be viewed in source file (lightning-web.js)

Custom Methods
  * To notify parent component about focus changes you can pass function NAME: string.
    Ex: this.tag('Carousel').notifyFocusChange = '$functionName'
*/

import { Lightning, Log } from '@lightningjs/sdk';
import { CarouselTemplate, ICarouselConfig } from './Carousel.model';

export default class Carousel extends Lightning.Component {
    private _focusedItemIdx = 0;
    private _focusFrameIdx = 0;
    private _cardsInViewPort = 0;
    private _focusFramePositions: number[] = [];
    private _items: IComponent[] = [];
    private _configs!: ICarouselConfig;
    private _positionLeft = 0;
    private _notifyFocusChange!: string;

    static _template(): ICommon {
        return CarouselTemplate;
    }

    set items(v: IComponent[]) {
        if (!this._items.length) {
            this._items = v;
            this.tag('Carousel').items = v;
        } else {
            this._items = [...this._items, ...v];
            this.tag('Carousel').itemList.a(v);
        }
    }

    set configs(v: ICarouselConfig) {
        const { viewPortWidth, positionLeft, ...configs } = v;
        this._configs = v;
        this._cardsInViewPort = Math.floor(viewPortWidth / v.itemSize);
        this._positionLeft = positionLeft;
        this.tag('Carousel').patch(configs);
    }

    get configs(): ICarouselConfig {
        return this._configs;
    }

    set notifyFocusChange(v: string) {
        this._notifyFocusChange = v;
    }

    get notifyFocusChange(): string {
        return this._notifyFocusChange;
    }

    get active(): IComponent {
        return this.tag('Carousel').getElement(this.index);
    }

    get index(): number {
        return this.tag('Carousel').realIndex;
    }

    getIndex(): number {
        return this._focusedItemIdx;
    }

    resetCarousel(): void {
        this._focusedItemIdx = 0;
        this._focusFrameIdx = 0;
        this._items = [];
        this.tag('Carousel').items = [];
    }

    _handleUp(): void | boolean {
        if (!this.configs.horizontal) {
            return this.setPrevious();
        }
        return false;
    }

    _handleDown(): void | boolean {
        if (!this.configs.horizontal) {
            return this.setNext();
        }
        return false;
    }

    _handleLeft(): void | boolean {
        if (this.configs.horizontal) {
            return this.setPrevious();
        }
    }

    _handleRight(): void | boolean {
        if (this.configs.horizontal) {
            return this.setNext();
        }
    }

    setIndex(index: number, immediate = false): void {
        const updateIndex =
            index <= this.getCarouselLength() - 1 ? index : this.getCarouselLength() - 1;

        this._focusedItemIdx = updateIndex;
        this.onFocusChanged(this._focusedItemIdx);
        let carouselIndex = 0;
        this._focusFrameIdx = updateIndex;

        if (updateIndex >= this._cardsInViewPort) {
            this._focusFrameIdx = this._cardsInViewPort - 1;
            carouselIndex = updateIndex - this._cardsInViewPort + 1;
        }

        this.tag('Carousel').setIndex(carouselIndex, immediate);
    }

    setPrevious(): void | boolean {
        if (this._focusedItemIdx === 0) {
            return false;
        }

        this.onFocusChanged(--this._focusedItemIdx);
        if (this._focusFrameIdx !== 0) {
            this.setPreviousFocusFramePosition();
        } else {
            this.tag('Carousel').setPrevious();
        }
    }

    setNext(): void | boolean {
        if (this._focusedItemIdx >= this.getCarouselLength() - 1) {
            return false;
        }

        this.onFocusChanged(++this._focusedItemIdx);

        if (this._focusFrameIdx > this._cardsInViewPort - 1) {
            this.tag('Carousel').setNext();
        } else {
            this.setNextFocusFramePosition();
        }
    }

    setNextFocusFramePosition(): void {
        ++this._focusFrameIdx;
    }

    setPreviousFocusFramePosition(): void {
        --this._focusFrameIdx;
    }

    onActive(): void {
        this.onFocusChanged(this._focusedItemIdx);
    }

    onFocusChanged(index: number): void {
        if (this.notifyFocusChange) {
            try {
                this.fireAncestors(this.notifyFocusChange, index);
            } catch (err) {
                Log.error('Failed to notify about focus change ', err);
            }
        }
    }

    get focusPosition(): number {
        return this._positionLeft;
    }

    /**
     * accepts previous carousel focus position,
     * calculates and sets focus to nearest  item
     */
    set focusPosition(v: number) {
        if (this._cardsInViewPort < 2) return;
        const closestIdx = this.findClosestFocusItemIdx(v);
        if (closestIdx !== this._focusFrameIdx) {
            let diff = closestIdx - this._focusFrameIdx;
            const lastItemIdx = this.getCarouselLength() - 1;

            if (this._focusedItemIdx + diff > lastItemIdx) {
                diff = lastItemIdx - this._focusedItemIdx;
            }

            this._focusFrameIdx += diff;
            this._focusedItemIdx += diff;
        }
    }

    findClosestFocusItemIdx(position: number): number {
        let idx = 0;
        let diff = Math.abs(position - <number>this._focusFramePositions[0]);

        for (let i = 1; i < this._focusFramePositions.length; i++) {
            const nextDiff = Math.abs(position - <number>this._focusFramePositions[i]);
            if (nextDiff > diff) {
                break;
            } else {
                diff = nextDiff;
                idx = i;
            }
        }

        return idx;
    }

    _getFocused(): ITag {
        return this.tag('Carousel').items[this._focusedItemIdx];
    }

    getCarouselLength(): number {
        return this.tag('Carousel').items.length;
    }

    setInitialParams(): void {
        this._focusFrameIdx = 0;
        this.setIndex(0, true);
    }
}
