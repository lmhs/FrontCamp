// Modules (exports, import)
// Polyfills
import 'whatwg-fetch';
import elementDatasetPolyfill from 'element-dataset';
import 'nodelist-foreach-polyfill';
//// import NewsRequest from './NewsRequest.js';
// Modules
import {dataHelper} from './helper.js';
import {headers, sourcesURL, categoriesParam} from './constants.js';
import { categorize } from './Filter.js';
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

  const select = document.getElementById('news-channels');
  const newsCategories = document.getElementById('news-categories');
  const showArticlesBtn = document.getElementById('show-articles');
  const articlesResults = document.getElementById('articles-results');
  const articlesSection = document.querySelector('.js-articles-section');


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
      articlesResults.innerHTML = '';
      articlesSection.classList.add('is-hidden');
    }

    makeSourcesRequest(requestSources)
      .catch(error => {
        console.error(`Error status: ${error.statusText}`)
      });
  }

  loadSources();

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

  function loadArticles() {
    return import(
      /* webpackChunkName: "0" */
      /* webpackMode: "lazy" */
      './loadArticles.js').then(module => {
        module.default();
      }
    ).catch(err => {
      console.log(`Chunk loading failed: ${err}`);
    });
  }

  newsCategories.addEventListener('click', categoriesUpdate);

  showArticlesBtn.addEventListener('click', loadArticles);

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
}
