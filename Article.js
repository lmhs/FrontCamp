export default class Article {
  constructor(articleData) {
    this.author = articleData.author;
    this.title = articleData.title;
    this.desc = articleData.description;
    this.url = articleData.url;
    this.imageSrc = articleData.urlToImage;
    this.pubdate = articleData.publishedAt;
  }

  render() {
    return `<article class="article" ${(this.pubdate !== null) ? `pubdate="${this.pubdate}">` : `` }
        ${this.imageSrc ? `<a class="article-link" target="_blank" href="${this.url}">
          <img class="article-img" src="${this.imageSrc}" alt="${this.title}">
        </a>` : `` }
        <div class="article-body">
          ${this.title ? `<h3 class="article-title"><a class="article-title-link" target="_blank" href="${this.url}">${this.title}</a></h3>` : `` }
          ${this.author ? `<span class="article-author">by ${this.author}</span>` : `` }
          ${this.desc ? `<a class="article-link" target="_blank" href="${this.url}"><p class="article-content">${this.desc}</p></a>` : `` }
        </div>
      </article>`;
  }
}
