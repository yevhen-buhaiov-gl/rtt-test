import List from 'src/components/List/List';
import { COLOR, SCREEN_SIZE } from 'src/constants/ui';

export const HomeTemplate = (): ICommon => ({
    rect: true,
    w: SCREEN_SIZE.width,
    h: SCREEN_SIZE.height,
    color: COLOR.gray,
    Container: {
        List: {
            type: List,
        },
    },
});
