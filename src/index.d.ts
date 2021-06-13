import type { Dispatch, Middleware, Store, StoreCreator } from 'redux';

interface IStore {
    dispatch: Dispatch;
    getState: () => any;
}

interface IMiddlewareHandler {
    (store: IStore, payload: Record<string, any>): any;
}

interface IReduxBusinessLogicResult {
    onAction: (action: string, handler: IMiddlewareHandler) => void;
    middleware: Middleware;
}

interface IReduxBusinessLogic {
    new (): IReduxBusinessLogicResult;
}

declare const ReduxBusinessLogic: IReduxBusinessLogic;

export default ReduxBusinessLogic;
