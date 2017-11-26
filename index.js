// Modules (exports, import)
import NewsRequest from './NewsRequest.js';
import { categorize } from './Filter.js';
{

  // let and const
  // settings for desctructuring assignment example
  const settings = {
    newsAPIURL : 'https://newsapi.org/v2'
  };

  // destructuring assignment
  // property value shorthands
  // TODO: check why if type=module nested objects throw reference error
  const {
    newsAPIURL,
    sourcesParam : sourcesParam = 'sources=',
    sourcesPath : sourcesPath = '/sources',
    headlinesPath : headlinesPath = '/top-headlines'
  } = settings;

  // template literals
  const sourcesURL = `${newsAPIURL}${sourcesPath}`;
  const headlinesURL = `${newsAPIURL}${headlinesPath}?${sourcesParam}`;
  const select = document.getElementById('news-channels');
  const newsCategories = document.getElementById('news-categories');
  const newsResults = document.getElementById('news-results');

  const requestSources = new NewsRequest(sourcesURL);

  // method definitions
  let dataHelper = {
    handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    },

    parseData(response) {
      return response.json();
    }
  };

  // load headlines from a selected source
  function showHeadlines(source) {
    const newHeadlinesURL = headlinesURL + source;
    const requestHeadlines = new NewsRequest(newHeadlinesURL);

    fetch(requestHeadlines)
    .then(dataHelper.handleErrors)
    .then(dataHelper.parseData)
    .then((data = {articles: []}) => {
      newsResults.innerHTML = '';
      // array for of
      for (const article of data.articles) {
        newsResults.insertAdjacentHTML('beforeend', createArticle(article.description));
      }
    })
    .catch(error => {
      console.error(`Error status: ${error}`)
    });
  }

  // fetch all sources
  // arrow function
  fetch(requestSources)
  .then(dataHelper.handleErrors)
  .then(dataHelper.parseData)
  .then((data = {sources: []}) => {

    // array for of
    for (const source of data.sources) {
      select.insertAdjacentHTML('beforeend', createListItem(source));
    }
    // showHeadlines(data.sources[0].id);
    newsCategories.insertAdjacentHTML('beforeend', createCategories(categorize(data.sources)));
  })
  .catch(error => {
    console.error(`Error status: ${error}`)
  });

  select.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    showHeadlines(selectedValue);
  });

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
      return createCategory(key);
    }).reduce((html, item) => {
      return html += item;
    }, ``);
  }

  function createCategory(category) {
    return `<a href="javascript:void(0);" class="category${[category.selected ? ' category--is-selected' : '']}" data-value="${category.value}">${category.value}</a>`;
  }

  function createListItem(source) {
    return `<option value="${source.id}">${source.name}</option>`;
  }

  function createArticle(content) {
    return `<article>${content}</article>`;
  }
}