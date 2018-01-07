import Store from './Store.js';
import ActionCreator from './ActionCreator.js';

export function createStore(reducer) {
  return new Store(reducer);
}

export function createAction(type) {
  return new ActionCreator(type);
}