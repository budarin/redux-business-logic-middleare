# redux-business-logic-middleare

Middleware for processing business login in redux application.

## Instllation

Using npm

```shell
npm install --save-dev @budarin/redux-business-logic-middleare
```

Using yarn

```shell
yarn add -D @budarin/redux-business-logic-middleare
```

## Using:

Imagine downloading information about an employer by its id: 
- the user enters/selects the employer id and presses the "Get information about the employer" button
- the button click handler calls action creator getEmployee with employer's id and sends the received action to the store with dispatch
- app-business-logic-middleware intercepts the action and processes it: requesting data from the backend and placing the received information in the store


app-business-logic-middleware.js

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
        const response = await fetch('/employers', params: { id } );

        if (response.ok) {
            let employerInfo = await response.json();
            dispatch({ type: ADD_EMPLOYER, employerInfo });
        } else {
            dispatch({ type: ERROR, error: response.status });
        }

        dispatch({ type: SUCCESS });
    } catch(err) {
        dispatch({ type: ERROR, error: err });
    }
})

export default const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_EMPLOYER': {
            ...
        }

        case 'WAITING': {
            ...
        }

        case 'SUCCESS': {
            ...
        }

        case 'ERROR': {
            ...
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
import { middleware as bMiddleware } = './app-business-logic-middleware';


const store = createStore(reducers, initialState, applyMiddleware(bMiddleware));
```

To remove bussines-rule from processing

```js
export const { offAction } = getBusinessLogicMiddleware();

offAction(GET_EMPLOYER);
```