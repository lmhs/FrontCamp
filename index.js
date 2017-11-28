// Modules (exports, import)
import NewsRequest from './NewsRequest.js';
import { categorize } from './Filter.js';
import Article from './Article.js';
import Category from './Category.js';
{

  // let and const
  // settings for desctructuring assignment example
  const settings = {
    ['newsAPIURL'] : 'https://newsapi.org/v2'
  };

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
    },

    parseData(response) {
      return response.json()
        .then(json => {
          if (!response.ok) {
            Promise.reject(response)
          }
          return json
        });
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
      for (const articleData of data.articles) {
        const article = createArticle(articleData);
        article.appendTo(newsResults);
      }
    })
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

    const requestSources = new NewsRequest(loadSourcesURL);

    // fetch all sources
    // arrow function
    fetch(requestSources)
    .then(dataHelper.handleErrors)
    .then(dataHelper.parseData)
    .then((data = {sources: []}) => {
      select.innerHTML = '';

      // array for of
      for (const source of data.sources) {
        select.insertAdjacentHTML('beforeend', createListItem(source));
      }
      if (typeof category === 'undefined') {
        newsCategories.insertAdjacentHTML('beforeend', createCategories(categorize(data.sources)));
      }
      showHeadlines(data.sources[0].id);
    })
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
      const categoryValue = event.target.dataset.value;

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
