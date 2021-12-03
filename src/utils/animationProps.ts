import { platform } from './tv-platforms';

export interface IAnimationDuration {
    duration: number; // time in seconds
}

interface IDurationProp extends IAnimationDuration {
    force: boolean; // whether or not custom duration should be used when animation is disabled
}

interface IAnimationDurations {
    DEFAULT: IDurationProp;
    [prop: string]: IDurationProp;
}

interface IParams {
    DEFAULT: number;
    [prop: string]: number;
}

export const DEFAULT = 'DEFAULT';
export const STATIC = 'STATIC';
export const MENU_TITLE = 'MENU_TITLE';
export const MENU_ICON = 'MENU_ICON';
export const GRID_NAVIGATION = 'GRID_NAVIGATION';
export const FOCUS_FRAME_DEFAULT = 'FOCUS_FRAME_DEFAULT';
export const COLUMN_SECTION = 'COLUMN_SECTION';
export const HERO_IMAGES = 'HERO_IMAGES';
export const LOADER = 'LOADER';
export const LIST_NAVIGATION = 'LIST_NAVIGATION';
export const BUTTON_COLOR = 'BUTTON_COLOR';
export const PLAYER_COMPONENTS = 'PLAYER_COMPONENTS';
export const SLIDE_SHOW = 'SLIDE_SHOW';
export const IMAGE_HIDE = 'IMAGE_HIDE';

const durations: IAnimationDurations = {
    DEFAULT: { duration: 0.3, force: false },
    STATIC: { duration: 0, force: false },
    MENU_TITLE: { duration: 0.1, force: false },
    MENU_ICON: { duration: 0.1, force: false },
    GRID_NAVIGATION: { duration: 0.3, force: false },
    LIST_NAVIGATION: { duration: 0.5, force: false },
    FOCUS_FRAME_DEFAULT: { duration: 0.2, force: false },
    COLUMN_SECTION: { duration: 0.2, force: false },
    BUTTON_COLOR: { duration: 0.5, force: false },
    PLAYER_COMPONENTS: { duration: 1, force: true },
    SLIDE_SHOW: { duration: 1, force: true },
    HERO_IMAGES: { duration: 0.5, force: true },
    LOADER: { duration: 3, force: true },
    IMAGE_HIDE: { duration: 0.1, force: true },
};

const params: IParams = ((): IParams => {
    const isAnimated = platform?.isAnimated();
    return Object.entries(durations).reduce<IParams>((acc, [key, value]) => {
        acc[key] = isAnimated || value.force ? value.duration : 0;
        return acc;
    }, {} as IParams);
})();

export const setDuration = (prop?: string): IAnimationDuration => ({
    duration: (params[prop || DEFAULT] as number) ?? params.DEFAULT,
});
