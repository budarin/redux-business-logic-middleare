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

const GET_EMPLOYER = 'GET_EMPLOYER';

const FETCHING = 'FETCHING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';


export const getEmployee = (id) => ({
    type: GET_EMPLOYER,
    payload: { id }
});


onAction(GET_EMPLOYER, ({getState, dispatch}, payload) => {
    dispatch({ type: FETCHING });
    try{
        fetch('/eployes', params: payload);
        dispatch({ type: SUCCESS });
    } catch(ex) {
        dispatch({ type: ERROR, error: err });
    }
})

...

```

Add midleware to store's middlewares

```js
import { createStore } from 'redux'
import { middleware as blMiddleware } = './app-business-ligic-middleware';

...
const store = createStore(reducers, initialState, applyMiddleware(blMiddleware));
...
```
