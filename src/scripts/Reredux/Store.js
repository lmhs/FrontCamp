// Creational pattern
// Singleton
// There cannot be additional store instances in the app
export default function Store(reducer) {
  let instance = this;
  this.reducer = reducer;
  this.listeners = [];
  this.state = {
    articles: []
  };

  Store = function () {
    return instance
  }
}

Store.prototype.getState = function () {
  return this.state;
}

// Behavioral pattern
// Observer
// Subscribe() -> subscribe()
// Unsubscribe() -> unsubscribe()
// Subscribers -> this.listeners
// publish() -> dispatch()
Store.prototype.subscribe = function (listener) {
  this.listeners.push(listener);
  return () => {
    this.listeners = this.listeners.filter(l => l !== listener);
  }
}

Store.prototype.unsubscribe = function(listener) {
  this.subscribe(listener)();
}

Store.prototype.dispatch = function(action) {
  this.state = this.reducer(this.getState(), action);
  this.listeners.forEach((listener) => listener())
}
