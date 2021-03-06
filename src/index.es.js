export const getBusinessLogicMiddleware = () => {
    const actionHandlers = new Map();

    return {
        onAction: (actionId, handler) => {
            actionHandlers.set(actionId, handler);
        },

        offAction: (actionId) => {
            actionHandlers.delete(actionId);
        },

        middleware:
            ({ getState, dispatch }) =>
            (next) =>
            (action) => {
                const handler = actionHandlers.get(action.type);

                if (!handler) {
                    return next(action);
                }

                return handler({ getState, dispatch }, action.payload);
            },
    };
};
