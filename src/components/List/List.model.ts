import { FLEX_DIRECTION, SCREEN_SIZE } from '../../constants/ui';

export interface ListContentParams {
    content: ICommon[];
    offsetStart?: number;
    offsetTargetElement: ITag;
    skipViewportCheck?: boolean;
}

interface IListTemplateParams {
    x?: number;
    w?: number;
}

export const ListTemplate = ({
    x = 0,
    w = SCREEN_SIZE.width,
}: IListTemplateParams = {}): ICommon => ({
    List: {
        x,
        w,
        boundsMargin: [400, 0, 400, 0],
        flex: {
            direction: FLEX_DIRECTION.column,
        },
    },
});
