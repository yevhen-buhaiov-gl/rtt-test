import { Registry } from '@lightningjs/sdk';
import axios from 'axios';

const timeToCheck = 10000;

const checkNetworkUrl = 'https://google.com/';

const listenerCheckNetworkConnection = async (): Promise<boolean> => {
    try {
        const online = await axios.head(checkNetworkUrl);
        return online.status >= 200 && online.status < 300;
    } catch (err) {
        return false;
    }
};

export const checkConnectionBase = (): void =>
    Registry.setInterval(async () => {
        await listenerCheckNetworkConnection();
    }, timeToCheck);