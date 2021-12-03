export interface IActionMetricsHandlerParams {
    action: string;
    payload: IPayloadActionMetrics;
}

export interface IMetricsHandlerParams {
    message: string;
    visible: boolean;
}

interface IPayloadActionMetrics {
    contentState: string;
    secondsPlayed: number;
}
