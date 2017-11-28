import loadImage from './loadImage.js';

export default class Article {
  constructor(articleData) {
    this.author = articleData.author;
    this.title = articleData.title;
    this.desc = articleData.description;
    this.url = articleData.url;
    this.imageSrc = articleData.urlToImage;
    this.pubdate = articleData.publishedAt;
  }

  appendTo(parent) {
    parent.insertAdjacentHTML('beforeend', this.render());
  }

  renderImg() {
    let article = document.querySelector(`article[data-url="${this.url}"]`);
    article.insertAdjacentHTML('afterbegin',
      `<a class="article-link" target="_blank" href="${this.url}">
        <img class="article-img" src="${this.imageSrc}" alt="${this.title}">
      </a>`);
  }

  addImg() {
    loadImage(this.imageSrc)
      .then(image => {
        this.renderImg();
      })
      .catch(errorMsg => {
        console.error(errorMsg);
      })
  }

  render() {
    if (this.imageSrc) {
      this.addImg();
    }

    return `<article data-url="${this.url}" class="article" ${this.pubdate ? `pubdate="${this.pubdate}">` : `` }
        <div class="article-body">
          ${this.title ? `<h3 class="article-title"><a class="article-title-link" target="_blank" href="${this.url}">${this.title}</a></h3>` : `` }
          ${this.author ? `<span class="article-author">by ${this.author}</span>` : `` }
          ${this.desc ? `<a class="article-link" target="_blank" href="${this.url}"><p class="article-content">${this.desc}</p></a>` : `` }
        </div>
      </article>`;
  }
}
