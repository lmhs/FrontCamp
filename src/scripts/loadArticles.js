// export default articlesShow;

import 'whatwg-fetch';
import elementDatasetPolyfill from 'element-dataset';
import {headers, sourcesURL, headlinesURL} from './constants.js';
import {dataHelper} from './helper.js';
import Article from './Article.js';

const select = document.getElementById('news-channels');
const articlesResults = document.getElementById('articles-results');
const articlesSection = document.querySelector('.js-articles-section');

async function fetchHeadlines(requestHeadlines) {
  let response = await fetch(requestHeadlines);
  response = await dataHelper.handleErrors(response);
  const data = await response.json();

  articlesResults.innerHTML = '';

  if (data.articles.length) {
    articlesSection.classList.remove('is-hidden');
  }

  // array for of
  for (const articleData of data.articles) {
    if (articleData.title && articleData.description && articleData.url) {
      const article = createArticle(articleData);
      article.appendTo(articlesResults);
    }
  }
}

function createArticle(data) {
  return new Article(data);
}

// load headlines from a selected source
function showHeadlines(source) {
  const newHeadlinesURL = headlinesURL + source;
  const requestHeadlines = new Request(newHeadlinesURL, { headers });
  fetchHeadlines(requestHeadlines)
    .catch(error => {
      console.error(`Error status: ${error.statusText}`)
    });
}

function headlinesUpdate(event) {
  const selectedValue = event.target.value;
  showHeadlines(selectedValue);
}

select.addEventListener('change', headlinesUpdate);

function getSource() {
  return select.value;
}

export default function articlesShow() {
  showHeadlines(getSource());
}