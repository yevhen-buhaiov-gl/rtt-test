import CardRow from '../components/CardRow/CardRow';
import { CARD_ROW_TYPE, CAROUSEL_TYPE } from '../constants/common';

interface IGenerateLabeledRowParams {
    items: ICommon[];
    title: string;
    width?: number;
    viewportScrollOffset?: number;
    carouselPosition?: number;
    total?: number;
}

interface IRowConfigs extends IGenerateLabeledRowParams {
    carouselType: CAROUSEL_TYPE;
}

interface ILabeledRowConfigs extends IRowConfigs {
    type: CARD_ROW_TYPE.LABELED;
}

interface IGenerateRowComponentResult<T> {
    type: typeof CardRow;
    configs: T;
    total: number;
}

interface ICAROUSEL_TYPE_BY_CARD_NAME {
    [prop: string]: CAROUSEL_TYPE;
}

const CAROUSEL_TYPE_BY_CARD_NAME: ICAROUSEL_TYPE_BY_CARD_NAME = {
    DefaultCard: CAROUSEL_TYPE.DEFAULT_CARD,
};

const setCarouselType = (cardName: string): CAROUSEL_TYPE =>
    (CAROUSEL_TYPE_BY_CARD_NAME[cardName] as CAROUSEL_TYPE) || CAROUSEL_TYPE.DEFAULT_CARD;

export const generateLabeledRowComponent = ({
    title,
    items,
    width,
    viewportScrollOffset,
    carouselPosition,
    total,
}: IGenerateLabeledRowParams): IGenerateRowComponentResult<ILabeledRowConfigs> => {
    return {
        type: CardRow,
        configs: {
            items,
            title,
            type: CARD_ROW_TYPE.LABELED,
            carouselType: setCarouselType(items[0]?.type?.name),
            width,
            viewportScrollOffset,
            carouselPosition,
        },
        total: total || items.length,
    };
};
