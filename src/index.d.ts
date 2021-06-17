import type { Dispatch, Middleware } from 'redux';

interface IStore {
    dispatch: Dispatch;
    getState: () => any;
}

interface IMiddlewareHandler {
    (store: IStore, payload: Record<string, any>): any;
}

interface IOnAction {
    (actionId: string, handler: IMiddlewareHandler): void;
}

interface IOffAction {
    (actionId: string): void;
}

interface IReduxBusinessLogicResult {
    onAction: IOnAction;
    offAction: IOffAction;
    middleware: Middleware;
}

export declare function getBusinessLogicMiddleware(): IReduxBusinessLogicResult;
