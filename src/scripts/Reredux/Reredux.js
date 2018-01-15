import Store from './Store.js';
import ActionCreator from './ActionCreator.js';

export function createStore(reducer) {
  return new Store(reducer);
}

function createActionWithText(type, text) {
  return new ActionCreator(type, text);
}

function createActionWithoutText(type) {
  return new ActionCreator(type);
}

// Behavioral pattern
// Strategy
// Change strategy depending whether or not text param was passed to function
export function createAction(type, text) {
  return text ? createActionWithText(type, text) : createActionWithoutText(type);
}