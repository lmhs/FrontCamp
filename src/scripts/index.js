// Modules (exports, import)
// Polyfills
import 'whatwg-fetch';
import elementDatasetPolyfill from 'element-dataset';
import 'nodelist-foreach-polyfill';
//// import NewsRequest from './NewsRequest.js';
// Modules
import { categorize } from './Filter.js';
import Article from './Article.js';
import Category from './Category.js';

import 'styles.css';
import './github-icon.js';

{
  if (env === 'development') {
    console.log('Application is started');
  }

  elementDatasetPolyfill();

  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }

  // let and const
  // settings for desctructuring assignment example
  const settings = {
    ['newsAPIURL'] : 'https://newsapi.org/v2'
  };

  let apiKey = 'bdbeeb170f8c47a2b97aa0f6252bfb90';
  const headers = new Headers({
    'X-Api-Key' : apiKey
  });

  // destructuring assignment
  // property value shorthands
  // TODO: check why if type=module nested objects throw reference error
  const {
    newsAPIURL,
    sourcesParam : sourcesParam = 'sources=',
    categoriesParam : categoriesParam = 'category=',
    sourcesPath : sourcesPath = '/sources',
    headlinesPath : headlinesPath = '/top-headlines'
  } = settings;

  // template literals
  const sourcesURL = `${newsAPIURL}${sourcesPath}`;
  const headlinesURL = `${newsAPIURL}${headlinesPath}?${sourcesParam}`;
  const select = document.getElementById('news-channels');
  const newsCategories = document.getElementById('news-categories');
  const newsResults = document.getElementById('news-results');

  // method definitions
  let dataHelper = {
    handleErrors(response) {
      if (!response.ok) {
        Promise.reject({
          status : response.status,
          statusText : response.statusText
        });
      }
      return response;
    }
  };

  async function fetchHeadlines(requestHeadlines) {
    let response = await fetch(requestHeadlines);
    response = await dataHelper.handleErrors(response);
    const data = await response.json();

    newsResults.innerHTML = '';
    // array for of
    for (const articleData of data.articles) {
      if (articleData.title && articleData.description && articleData.url) {
        const article = createArticle(articleData);
        article.appendTo(newsResults);
      }
    }
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

  function loadSources(category) {
    let loadSourcesURL;

    if (category && category !== 'all') {
      loadSourcesURL = `${sourcesURL}?${categoriesParam}${category}`;
    } else {
      loadSourcesURL = sourcesURL;
    }

    const requestSources = new Request(loadSourcesURL, { headers });

    // fetch all sources
    // arrow function
    async function makeSourcesRequest(requestSources) {
      let response = await fetch(requestSources);
      response = await dataHelper.handleErrors(response);
      const data = await response.json();

      select.innerHTML = '';

      // array for of
      for (const source of data.sources) {
        select.insertAdjacentHTML('beforeend', createListItem(source));
      }
      if (typeof category === 'undefined') {
        newsCategories.insertAdjacentHTML('beforeend', createCategories(categorize(data.sources)));
      }
      showHeadlines(data.sources[0].id);
    }

    makeSourcesRequest(requestSources)
      .catch(error => {
        console.error(`Error status: ${error.statusText}`)
      });
  }

  loadSources();

  function headlinesUpdate(event) {
    const selectedValue = event.target.value;
    showHeadlines(selectedValue);
  }

  select.addEventListener('change', headlinesUpdate);

  function categoriesUpdate(event) {
    let categories = newsCategories.querySelectorAll('.js-category');
    if (event.target && event.target.matches('.js-category')) {
      const categoryEl = event.target;
      const categoryValue = categoryEl.dataset.value;

      categories.forEach((category) => {
        if (category.dataset.value !== categoryValue) {
          category.classList.remove('category--is-selected');
        }
      });

      event.target.classList.add('category--is-selected');
      loadSources(categoryValue);
    }
  }

  newsCategories.addEventListener('click', categoriesUpdate)

  function createCategories(categories) {
    // Array.from(categories.keys()) also works
    const keys = [...categories.keys()];
    keys.unshift('all');

    return keys.map((key, index) => {
      let selected = false;
      if (index === 0) {
        selected = true;
      }
      return {
        value: key,
        selected
      }
    }).map(key => {
      const category = createCategory(key);
      return category.render();
    }).reduce((html, item) => {
      return html += item;
    }, ``);
  }

  function createCategory(data) {
    return new Category(data);
  }

  function createListItem(source) {
    return `<option value="${source.id}">${source.name}</option>`;
  }

  function createArticle(data) {
    return new Article(data);
  }
}
