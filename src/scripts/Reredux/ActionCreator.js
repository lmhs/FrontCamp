import Store from './Store.js';

export default function ActionCreator(type) {
  const action = {
    type
  };
  console.log(action);
  return action
}