const actionHandlers = new Map();

function onAction(actionId, handler) {
    actionHandlers.set(actionId, handler);
}

function offAction(actionId) {
    actionHandlers.delete(actionId);
}

const bussinesMiddleware =
    ({ getState, dispatch }) =>
    (next) =>
    (action) => {
        const handler = actionHandlers.get(action.type);

        if (!handler) {
            return next(action);
        }

        return handler({ getState, dispatch }, action.payload);
    };

exports.getBusinessLogicMiddleware = {
    onAction,
    offAction,
    bussinesMiddleware,
};
