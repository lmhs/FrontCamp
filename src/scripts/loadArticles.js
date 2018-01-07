// export default articlesShow;

import 'whatwg-fetch';
import elementDatasetPolyfill from 'element-dataset';
import {headers, sourcesURL, headlinesURL} from './constants.js';
import {dataHelper} from './helper.js';
import Article from './Article.js';
import {createAction, createStore} from './Reredux/Reredux.js';

const select = document.getElementById('news-channels');
const articlesResults = document.getElementById('articles-results');
const articlesSection = document.querySelector('.js-articles-section');
let store = createStore(loadArticlesReducer);
store.subscribe(renderArticles);

async function fetchHeadlines(requestHeadlines) {
  let response = await fetch(requestHeadlines);
  response = await dataHelper.handleErrors(response);
  const data = await response.json();

  store.setArticles(data.articles);
}

function renderArticles() {
  const articles = store.getState().articles;
  console.log(articles);
  articlesResults.innerHTML = '';

  if (articles.length) {
    articlesSection.classList.remove('is-hidden');
  }

  // array for of
  for (const articleData of articles) {
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

function headlinesUpdate() {
  store.dispatch(createAction('ARTICLES_CHANGE'));
}

select.addEventListener('change', headlinesUpdate);

function getSource() {
  return select.value;
}

function loadArticlesReducer(action) {
  switch (action.type) {
    case 'ARTICLES_LOAD':
    case 'ARTICLES_CHANGE':
      showHeadlines(getSource());
  }
}

export default function articlesShow() {
  store.dispatch(createAction('ARTICLES_LOAD'));
}