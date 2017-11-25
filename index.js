// Modules (exports, import)
import NewsRequest from './NewsRequest.js';
{

  // let and const
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

  // fetch
  // arrow function
  fetch(requestSources)
  .then(dataHelper.handleErrors)
  .then(dataHelper.parseData)
  .then((data = {sources: []}) => {
    // array for of
    for (const source of data.sources) {
      select.insertAdjacentHTML('beforeend', createListItem(source));
    }
  })
  .catch(error => {
    console.error(`Error status: ${error}`)
  });

  select.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    const newHeadlinesURL = headlinesURL + selectedValue;

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
  });

  function createListItem(source) {
    return `<option value="${source.id}">${source.name}</option>`;
  }

  function createArticle(content) {
    return `<article>${content}</article>`;
  }
}