# redux-bussiness-logic-middleare

Middleware for processing bussiness login in redux application.

## Instllation

Using npm

```shell
npm install --save-dev @budarin/redux-bussiness-logic-middleare
```

Using yarn

```shell
yarn add -D @budarin/redux-bussiness-logic-middleare
```

## Using:

Let's implement a simple bussiness rule for Todo: “when creating a todo, send the todo to the server and to the redux store”.

Let's describe the essence of Todo — its constants, actions, bussiness rules and a redeser in accordance with the concept of [ducks](https://github.com/erikras/ducks-modular-redux).

`./ducks/todo.js`

```js
import { sendTodo } from 'src/services/api'
import { onAction } from'@budarin/redux-bussiness-logic-middleare';

const SET_ERROR = 'TODO/SET_ERROR';
export const ADD_TODO = 'TODO/ADD_TODO';

export const setError = (error) => ({
    type: SET_ERROR,
    payload: error
})

export const addTodo = ( todo ) => ({
    type: ADD_TODO,
    payload: todo 
});

// our bussiness rule
export const addTodoMiddleware = async (store, next, action) => {
    // call the API method to send todo to the server
    try {
        await sendTodo(action.payload);
    } catch(error) {
        return store.dispatch(setError(error));
    }

     // otherwise, we pass the action to the next middleware
    return next(action);
}

// let's add the bussiness rule
onAction(ADD_TODO, addTodoMiddleware)


export default const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO: {
            ...
        }
        case SET_ERROR {
            ...
        }
        default:
            return state;
    }
};
```

Add midleware to stores middlewares

```js
import todoReducer from '../ducks/todo.js'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { bussinesLogicMiddleware } from '@budarin/redux-bussiness-logic-middleare';

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
import { ADD_TODO } from '../ducks/todo.js'
import { offAction } from '@budarin/redux-bussiness-logic-middleare';

offAction(ADD_TODO);
```
To remove all bussines-rules from processing

```js
import { removeAllbussinessRules } from '@budarin/redux-bussiness-logic-middleare';

removeAllbussinessRules();
```
