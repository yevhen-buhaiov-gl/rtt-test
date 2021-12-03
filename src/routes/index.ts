import Home from 'src/pages/Home/Home/Home';


export enum Routes {
    HOME = 'home',
}

export const getRouteConfig = (path: Routes): ICommon | undefined =>
    routerConfig.routes.find((route) => route.path === path);

const routerConfig: IRouterConfig = {
    root: Routes.HOME,
    routes: [
        {
            path: Routes.HOME,
            component: Home,
        },
    ],
};

export default routerConfig;
