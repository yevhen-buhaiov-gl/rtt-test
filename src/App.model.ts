interface IFont {
    family: string;
    url: string;
}

const setTemplate = ({ template }: { template: ICommon }): ICommon => ({
    ...template,
});

export { IFont, setTemplate };
