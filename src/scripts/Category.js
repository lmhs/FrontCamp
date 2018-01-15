// Structural pattern
// Adapter
// Category uses the same method render as the Article module
// while Tag uses several parameters in constructor and buildLayout method
import Tag from './Tag.js';

export default class Category {
  constructor(category) {
    const tag = new Tag(category.value, category.selected);
    const x = Object.assign({}, tag, {
      render : tag.buildLayout
    });
    return x;
  }
}