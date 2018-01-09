export default class Tag {
  constructor(value, selected) {
    this.value = value;
    this.selected = selected;
  }

  buildLayout() {
    return `<a href="javascript:void(0);" class="category${[this.selected ? ' category--is-selected' : '']} js-category" data-value="${this.value}">${this.value}</a>`
  }
}