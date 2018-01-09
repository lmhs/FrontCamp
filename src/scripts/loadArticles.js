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
const filterArticlesBtn = document.getElementById('filter-articles');
let store = createStore(loadArticlesReducer);
let articles = [];
store.subscribe(renderArticles);

async function fetchHeadlines(requestHeadlines) {
  let response = await fetch(requestHeadlines);
  response = await dataHelper.handleErrors(response);
  const data = await response.json();

  return data;
}

function filterArticles() {
  store.dispatch(createAction('ARTICLES_FILTERED'));
}

filterArticlesBtn.addEventListener('click', filterArticles);

function renderArticles() {
  const articles = store.getState().articles;
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
    .then((data) => {
      articles = [...data.articles];
      store.dispatch(createAction('ARTICLES_LOADED'));
    })
    .catch(error => {
      console.error(`Error status: ${error.statusText}`)
    });
}

function headlinesUpdate(event) {
  showHeadlines(event.target.value);
}

select.addEventListener('change', headlinesUpdate);

function getSource() {
  return select.value;
}

function filterArticleReducer(state = {}, action) {
  switch (action.type) {
    case 'ARTICLES_FILTERED_NO_AUTHOR':
      return state.author ? {} : state;
      break;
    default:
      return state
  }
}

function loadArticlesReducer(state = {articles:[]}, action) {
  switch (action.type) {
    case 'ARTICLES_LOADED':
      return Object.assign({}, state, {articles});
      break;
    case 'ARTICLES_FILTERED':
      let filteredArticles = state.articles.map(article => filterArticleReducer(article, createAction('ARTICLES_FILTERED_NO_AUTHOR')));
      return Object.assign({}, state, {articles: filteredArticles});
      break;
    default:
      return state
  }
}

export default function articlesShow() {
  showHeadlines(getSource());
}
