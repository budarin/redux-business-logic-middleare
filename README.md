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

duck.js

```js
import { onAction } = '@budarin/redux-business-logic-middleare';

const GET_EMPLOYER = 'GET_EMPLOYER';
const ADD_EMPLOYER = 'ADD_EMPLOYER';
const WAITING = 'WAITING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';


export const getEmployee = ({ id }) => ({
    type: GET_EMPLOYER,
    payload: { id }
});


onAction(GET_EMPLOYER, async ({getState, dispatch}, action) => {
    const { id } = action.payload

    dispatch({ type: WAITING });

    try{
        const response = await fetch('/employers', params: { id } );

        if (response.ok) {
            let employerInfo = await response.json();

            dispatch({ type: ADD_EMPLOYER, employerInfo });
            dispatch({ type: SUCCESS });
        } else {
            dispatch({ type: ERROR, error: response.status });
        }
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
import { bussinesLogicMiddleware } =  '@budarin/redux-business-logic-middleare';


const store = createStore(reducers, initialState, applyMiddleware(bussinesLogicMiddleware));
```

To remove bussines-rule from processing

```js
import { offAction } =  '@budarin/redux-business-logic-middleare';

offAction(GET_EMPLOYER);
```