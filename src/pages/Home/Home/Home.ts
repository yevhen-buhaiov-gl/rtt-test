import { Lightning, Utils } from '@lightningjs/sdk';

import CardRow from 'src/components/CardRow/CardRow';
import { DefaultCard } from 'src/components/Cards/DefaultCard/DefaultCard';
import { CAROUSEL_TYPE } from 'src/constants/common';
import { HomeTemplate } from './Home.model';


export default class Home extends Lightning.Component {
    static _template(): ICommon {
        return HomeTemplate();
    }

    _setup(): void {
        this._setState('List');
    }

    _init(): void {
        const cardInfo: ICommon = { title: 'Test Item', imageUrl: Utils.asset('images/icon.png'), subText: 'Item subtext'};
        const markup: ICommon = Array(20).fill({ title: 'Test Content Row', videos: Array(25).fill(cardInfo)});
        const rows = markup.map(({ title, videos }: ICommon) => {
            const items = videos.map(({ title, imageUrl, subText }: ICommon) => ({
                type: DefaultCard,
                componentProps: {
                    title,
                    imageUrl,
                    subText,
                },
            }));

            return {
                type: CardRow,
                configs: {
                    items,
                    title,
                    carouselType: CAROUSEL_TYPE.DEFAULT_CARD,
                },
                total: items.length,
            };
        });
        this.content = rows || [];
    }

    toInitialState(): void {
        this._setState('List');
    }

    set content(v: ICommon) {
        this.tag('List').componentProps = {
            content: v,
            offsetTargetElement: this.tag('Container'),
            skipViewportCheck: false,
        };
    }

    static _states(): unknown[] {
        return [
            class List extends this {
                _getFocused(): ITag {
                    return this.tag('List');
                }
            },
        ];
    }
}
