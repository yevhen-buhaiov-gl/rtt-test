import { Lightning } from '@lightningjs/sdk';
import { DefaultCardTemplate, IDefaultCardProps } from './DefaultCard.model';
import { COLOR, FONT_FACE } from '../../../constants/ui';
import { BUTTON_COLOR, setDuration } from 'src/utils/animationProps';

export class DefaultCard extends Lightning.Component {
    readonly componentProps!: IDefaultCardProps;
    private onFocus!: string;

    static _template(): ICommon {
        return DefaultCardTemplate();
    }

    _handleCardInfo(): void {
        this.tag('Title').patch({ text: {
            fontSize: 24,
            text: this.componentProps.title,
            fontFace: FONT_FACE.bold,
        }});
    }

    _init(): void {
        const { onFocus, isHiddenCardText, imageUrl } = this.componentProps;
        !isHiddenCardText &&
            this.tag('SubText').patch({
                text: this.componentProps?.subText?.replace(/(\r\n|\n|\r)/gm, ' ') || '',
            });
        !isHiddenCardText && this._handleCardInfo();
        this.tag('Image').patch({ src: imageUrl});
        if (onFocus) this.onFocus = onFocus;
    }

    _focus(): void {
        this.tag('Background').setSmooth('color', COLOR.lightGray3, setDuration(BUTTON_COLOR));
        this.onFocus &&
            this.fireAncestors(this.onFocus, {
                title: this.componentProps.title,
                subtitle: this.componentProps.subText,
                img_uri: this.componentProps.imageUrl,
                type: this.componentProps.type,
            });
        !this.componentProps.isHiddenCardText && this._handleCardInfo();
    }

    _unfocus(): void {
        this.tag('Background').setSmooth('color', COLOR.lightGray, setDuration(BUTTON_COLOR));
    }

    _handleEnter(): void {
        if (this.componentProps.onEnter) {
            this.componentProps.onEnter();
        }
    }
}
