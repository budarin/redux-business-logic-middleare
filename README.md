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

Let's implement a simple business rule for Todo: “the name of todo must begin with a letter”.

Let's describe the essence of Todo — its constants, actions, business rules and a redeser in accordance with the concept of [ducks](https://github.com/erikras/ducks-modular-redux).

`./ducks/todo.js`

```js
import { onAction } = '@budarin/redux-business-logic-middleare';

export const ADD_TODO = 'TODO/ADD_TODO';
const ERROR = 'TODO/ERROR';

export const addTodo = ( todo ) => ({
    type: ADD_TODO,
    payload: { todo }
});

// let's add our business rule
onAction(ADD_TODO, (store, next, action) => {

    // if the 1st character is a digit:
    // we will not send the action further
    // but we will send a new action with an error to the Store
    if (isNaN(parseInt(action.payload.todo[0])) === false) {
        return store.dispatch({
          type: ERROR, 
          payload: 'Todo должен начинаться с символа' 
        });
    }

    // otherwise, we pass the action to the next middleware
    return next(action);
})

export default const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TODO/ADD_TODO': {
            ...
        }
        case 'TODO/ERROR': {
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
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { bussinesLogicMiddleware } = '@budarin/redux-business-logic-middleare';
import todoReducer from '../ducks/todo.js'

const reducers = combineReducers(
    ...
    todoReducer,
    ...
);

const store = createStore(
    reducers, 
    initialState, 
    applyMiddleware(bussinesLogicMiddleware)
);
```

To remove bussines-rule from processing

```js
import { offAction } = '@budarin/redux-business-logic-middleare';
import { ADD_TODO } from '../ducks/todo.js'

offAction(ADD_TODO);
```