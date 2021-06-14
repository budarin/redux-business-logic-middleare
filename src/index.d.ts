import type { Dispatch, Middleware, Store, StoreCreator } from 'redux';

interface IStore {
    dispatch: Dispatch;
    getState: () => any;
}

interface IMiddlewareHandler {
    (store: IStore, payload: Record<string, any>): any;
}

interface IOnAction {
    (action: string, handler: IMiddlewareHandler): void;
}

interface IOffAction {
    (action: string): void;
}

interface IReduxBusinessLogicResult {
    onAction: IOnAction;
    offAction: IOffAction;
    middleware: Middleware;
}

export declare function getBusinessLogicMiddleware(): IReduxBusinessLogicResult;
