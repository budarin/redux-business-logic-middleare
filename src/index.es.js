const actionHandlers = new Map();

export function onAction(actionId, handler) {
    actionHandlers.set(actionId, handler);
}

export function offAction(actionId) {
    actionHandlers.delete(actionId);
}

export const bussinesLogicMiddleware =
    (store) =>
    (next) =>
    (action) => {
        const handler = actionHandlers.get(action.type);

        if (!handler) {
            return next(action);
        }

        return handler(store, action);
    };