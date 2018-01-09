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

Store.prototype.subscribe = function (listener) {
  this.listeners.push(listener);
  return () => {
    this.listeners = this.listeners.filter(l => l !== listener);
  }
}

Store.prototype.dispatch = function(action) {
  this.state = this.reducer(this.getState(), action);
  this.listeners.forEach((listener) => listener())
}
