import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { cityReducer } from './redux/reducers';

const store = createStore(
  cityReducer,
  applyMiddleware(thunk)
);

export default store;
