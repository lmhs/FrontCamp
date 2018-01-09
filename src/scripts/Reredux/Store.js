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

// Store.prototype.setArticles = function (articles) {
//   this.state = { articles };
//   this.callback();
// }
// callback => listener
Store.prototype.subscribe1 = function (callback) {
  this.callback = callback;
  console.log('subscribed!');
}

Store.prototype.subscribe = function (listener) {
  this.listeners.push(listener);
}

Store.prototype.dispatch = function(action) {
  this.state.articles = this.reducer(this.getState(), action);
  this.listeners.forEach((listener) => listener())
}