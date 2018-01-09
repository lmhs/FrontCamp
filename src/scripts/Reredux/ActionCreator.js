// Creational pattern
// Prototype
// creates and returns new object which prototype is action
export default function ActionCreator(type, text) {
  const action = {
    type
  };
  return Object.create(action, text ? {
    text: {
      value: text
    }
  } : undefined);
}