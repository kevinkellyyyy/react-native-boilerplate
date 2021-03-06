import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middlewares = applyMiddleware(thunk);
const store = createStore(rootReducer, middlewares);

export default store;
