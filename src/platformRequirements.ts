export const setPlatformRequirements = (platform: string): void => {
    switch (platform) {
        case 'vizio':
            injectPlatformAPI('http://localhost:12345/scfs/cl/js/vizio-companion-lib.js');
            break;
        case 'comcast':
            injectPlatformAPI('https://cdn.thor.comcast.com/sdk/money-badger.min.js');
            break;
        case 'samsung':
            injectPlatformAPI('$WEBAPIS/webapis/webapis.js');
            break;
        default:
            break;
    }
    injectPlatformAPI('https://html2canvas.hertzen.com/dist/html2canvas.min.js');
};

function injectPlatformAPI(src: string): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.getElementsByTagName('head')[0]?.appendChild(script);
}
