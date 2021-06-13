import type { Middleware, Store } from 'redux';

interface IMiddlewareHandler {
    (store: Pick<Store, 'getState' | 'dispatch>'>, payload: Record<string, any>): any;
}

interface IReduxBusinessLogic {
    onAction: (action: string, handler: IMiddlewareHandler) => void;
    middleware: Middleware;
}

export declare function ReduxBusinessLogic(): IReduxBusinessLogic;
