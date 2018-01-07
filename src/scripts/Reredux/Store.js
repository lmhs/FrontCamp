export default function Store(reducer) {
  let instance = this;
  this.reducer = reducer;
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

Store.prototype.setArticles = function (articles) {
  this.state = { articles };
  this.callback();
}

Store.prototype.subscribe = function (callback) {
  this.callback = callback;
  console.log('subscribed!');
}

Store.prototype.dispatch = function(action) {
  this.reducer(action);
}