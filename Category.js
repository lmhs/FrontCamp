export default class Category {
  constructor(category) {
    this.selected = category.selected;
    this.value = category.value;
  }

  render() {
    return `<a href="javascript:void(0);" class="category${[this.selected ? ' category--is-selected' : '']} js-category" data-value="${this.value}">${this.value}</a>`
  }
}