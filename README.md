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


export const getEmployee = ({ id }) => ({
    type: GET_EMPLOYER,
    payload: { id }
});


onAction(GET_EMPLOYER, async ({getState, dispatch}, payload) => {
    const { id } = payload
    dispatch({ type: WAITING });
    try{
        const employerInfo = await fetch('/employers', params: { id );
        dispatch({ type: ADD_EMPLOYER, employerInfo });
        dispatch({ type: SUCCESS });
    } catch(err) {
        dispatch({ type: ERROR, error: err });
    }
})

export default const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_EMPLOYER': {.
            ..
        }

        case 'WAITING': {.
            ..
        }

        case 'SUCCESS': {.
            ..
        }

        case 'ERROR': {.
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
