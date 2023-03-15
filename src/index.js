const actionHandlers = new Map();

function onAction(actionId, handler) {
    actionHandlers.set(actionId, handler);
}

function offAction(actionId) {
    actionHandlers.delete(actionId);
}

function removeAllBussinesRules(params) {
    actionHandlers.clear()
}

const bussinesLogicMiddleware =
    (store) =>
    (next) =>
    (action) => {
        const handler = actionHandlers.get(action.type);

        if (!handler) {
            return next(action);
        }

        return handler(store, next, action);
    };

exports.getBusinessLogicMiddleware = {
    onAction,
    offAction,
    removeAllBussinesRules,
    bussinesLogicMiddleware,
};
