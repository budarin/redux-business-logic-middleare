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
import { onAction } = './app-business-ligic-middleware';

const GET_EMPLOYER = 'ADD_TODO';

const GET_EMPLOYER = 'ADD_TODO_ITEM';
const WAITING = 'WAITING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';


export const getEmployee = (todo) => ({
    type: ADD_TODO,
    payload: { todo }
});


onAction(GET_EMPLOYER, async ({getState, dispatch}, payload) => {
    dispatch({ type: WAITING });
    try{
        const todo = await fetch('/todo', params: payload);
        dispatch({ type: ADD_TODO_ITEM, todo });
        dispatch({ type: SUCCESS });
    } catch(ex) {
        dispatch({ type: ERROR, error: err });
    }
})
```

Add midleware to stores middlewares

```js
import { createStore } from 'redux'
import { middleware as blMiddleware } = './app-business-ligic-middleware';


const store = createStore(reducers, initialState, applyMiddleware(blMiddleware));
```
