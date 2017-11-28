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
    return `<a class="article-link" target="_blank" href="${this.url}">
              <img class="article-img" src="${this.imageSrc}" alt="${this.title}">
            </a>`;
  }

  addImg() {
    Promise.all([loadImage(this.src)])
      .then(images => {
        images.forEach(image => {
          renderImg();
        })
      })
      .catch(errorMsg => {
        console.error(errorMsg);
      })
  }

  render() {

    return `<article class="article" ${(this.pubdate !== null) ? `pubdate="${this.pubdate}">` : `` }
        ${this.imageSrc ? this.addImg() : `` }
        <div class="article-body">
          ${this.title ? `<h3 class="article-title"><a class="article-title-link" target="_blank" href="${this.url}">${this.title}</a></h3>` : `` }
          ${this.author ? `<span class="article-author">by ${this.author}</span>` : `` }
          ${this.desc ? `<a class="article-link" target="_blank" href="${this.url}"><p class="article-content">${this.desc}</p></a>` : `` }
        </div>
      </article>`;
  }
}
