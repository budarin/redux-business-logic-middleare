# redux-business-logic-middleare

Middleware for processing business login in redux application

Using:

app-business-ligic-middleware.js

```js
import { getBusinessLogicMiddleware } from '@budarin/redux-business-logic-middleare';

export const { onAction, middleware } = getBusinessLogicMiddleware();
```

duck.js

```js
import { onAction } = './app-business-logic-middleware';

const GET_EMPLOYER = 'GET_EMPLOYER';
const ADD_EMPLOYER = 'ADD_EMPLOYER';
const WAITING = 'WAITING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';


export const getEmployee = (employer) => ({
    type: GET_EMPLOYER,
    payload: { employer }
});


onAction(GET_EMPLOYER, async ({getState, dispatch}, payload) => {
    dispatch({ type: WAITING });
    try{
        const todo = await fetch('/employers', params: payload);
        dispatch({ type: ADD_EMPLOYER, todo });
        dispatch({ type: SUCCESS });
    } catch(ex) {
        dispatch({ type: ERROR, error: err });
    }
})

export default const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_EMPLOYER': {.
            ..
        }
        default:
            return state;
    }
};

...
```

Add midleware to stores middlewares

```js
import { createStore } from 'redux'
import { middleware as bMiddleware } = './app-business-ligic-middleware';


const store = createStore(reducers, initialState, applyMiddleware(bMiddleware));
```
