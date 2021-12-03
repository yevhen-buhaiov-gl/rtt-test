import { Lightning } from '@lightningjs/sdk';
import { ListContentParams, ListTemplate } from './List.model';
import { SCREEN_SIZE } from '../../constants/ui';
import { LIST_NAVIGATION, setDuration, STATIC } from '../../utils/animationProps';

export default class ListCarousel extends Lightning.Component {
    private _activeElementIdx = 0;
    private _offsets: number[] = [];
    private _offsetTag!: ITag;
    private _skipViewportCheck = true;
    private _shouldScrollDown = true;

    static _template(): ICommon {
        return ListTemplate();
    }

    set componentProps({
        content,
        offsetStart = 0,
        offsetTargetElement,
        skipViewportCheck = true,
    }: ListContentParams) {
        this._offsets = [];
        this._offsets.push(offsetStart);
        this._offsetTag = offsetTargetElement;
        this._skipViewportCheck = skipViewportCheck;
        this.tag('List').children = content;
        this.tag('List').children.forEach((child: ITag, idx: number) =>
            this._offsets.push(this._offsets[idx] + child.h)
        );

        if (this._activeElementIdx && this.listLength && content[this._activeElementIdx]) {
            this.setScrollPosition();
        }

        if (
            this._activeElementIdx &&
            content.length &&
            this._activeElementIdx > content.length - 1
        ) {
            this._activeElementIdx = content.length - 1;
            this.setOffset();
        }
    }

    get listItems(): ICommon {
        return this.tag('List').children;
    }

    setScrollPosition(): void {
        let step = this._activeElementIdx;
        while (
            step - 1 >= 0 &&
            !this.isMoreInViewPort(this._offsets[step - 1]) &&
            !this._skipViewportCheck
        ) {
            step -= 1;
        }

        this.setOffset(this._offsets[step]);
    }

    get activeIndex(): number {
        return this._activeElementIdx;
    }

    set activeIndex(index: number) {
        this._activeElementIdx = index;
        this.updateOffset(false);
    }

    get shouldScrollDown(): boolean {
        return this._shouldScrollDown;
    }

    set shouldScrollDown(v: boolean) {
        this._shouldScrollDown = v;
    }

    _handleUp(): void | boolean {
        if (this._activeElementIdx > 0) {
            this.pathFocusPosition(this._activeElementIdx, this._activeElementIdx - 1);
            this._activeElementIdx -= 1;

            (this._skipViewportCheck || this.isMoreInViewPort()) && this.updateOffset();
            return true;
        }

        return false;
    }

    _handleDown(): boolean {
        const isOnBottom = this._activeElementIdx < this.tag('List').children.length - 1;
        const shouldScrollDown = this._skipViewportCheck || this.isMoreInViewPort();
        if (isOnBottom) {
            this.pathFocusPosition(this._activeElementIdx, this._activeElementIdx + 1);
            this._activeElementIdx += 1;
            this.shouldScrollDown && shouldScrollDown && this.updateOffset();
        }

        return isOnBottom;
    }

    getChildFocusPosition(idx: number): number | undefined {
        return this.tag('List').children[idx]?.focusPosition;
    }

    setChildFocusPosition(idx: number, focusFramePosition: number): void {
        this.tag('List').children[idx].focusPosition = focusFramePosition;
    }

    // path focus data from previous focused carousel to the next carousel
    // so the next carousel can focus  nearest item
    pathFocusPosition(prevIdx: number, nextIdx: number): void {
        const prevFocusPosition = this.getChildFocusPosition(prevIdx);
        const nextFocusPosition = this.getChildFocusPosition(nextIdx);

        if (prevFocusPosition && nextFocusPosition) {
            this.setChildFocusPosition(nextIdx, prevFocusPosition);
        }
    }

    isMoreInViewPort(offset: number = this._offsets[this._activeElementIdx] as number): boolean {
        return !!(
            this._offsets.length &&
            (this._offsets[this._offsets.length - 1] as number) - offset > SCREEN_SIZE.height
        );
    }

    updateOffset(smooth = true): void {
        this._offsetTag.setSmooth(
            'y',
            -(this._offsets[this._activeElementIdx] as number),
            setDuration(smooth ? LIST_NAVIGATION : STATIC)
        );
    }

    setOffset(offset: number = <number>this._offsets[this._activeElementIdx]): void {
        typeof this._offsets[this._activeElementIdx] === 'number' &&
            this._offsetTag.patch({
                y: -offset,
            });
    }

    get offset(): number {
        return this._offsetTag.y;
    }

    set offset(v: number) {
        this._offsetTag.y = v;
    }

    _getFocused(): ITag {
        return this.tag('List').children[this._activeElementIdx];
    }

    setInitialParams(): void {
        this._activeElementIdx = 0;
        this.tag('List').children.forEach((component: ICommon) => {
            component.setInitialParams && component.setInitialParams();
        });
        this.setOffset();
    }

    getFocusedChildIdx(): number | number[] | undefined {
        const focused = this._getFocused();
        return focused?.focusedIdx;
    }

    setFocusedChildIdx(idx: number): void {
        const focused = this._getFocused();
        if (focused) {
            focused.setIndex && focused.setIndex(idx);
        } else {
            this.setInitialParams();
        }
    }

    clear(): void {
        this.tag('List').childList.clear();
    }

    get listLength(): number {
        return this.tag('List').childList.length;
    }
}
