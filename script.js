{
  // let and const
  const settings = {
    apiKey : 'bdbeeb170f8c47a2b97aa0f6252bfb90'
  };

  // destructuring assignment
  // property value shorthands
  const {
    apiKey,
    newsAPIURL = 'https://newsapi.org/v2',
    params = {
      sources : sourcesParam = 'sources='
    },
    paths = {
      sources : sourcesPath = '/sources',
      headlines : headlinesPath = '/top-headlines'
    }
  } = settings;

  // template literals
  const sourcesURL = `${newsAPIURL}${sourcesPath}`;
  const headlinesURL = `${newsAPIURL}${headlinesPath}?${sourcesParam}`;
  const select = document.getElementById('news-channels');
  const newsResults = document.getElementById('news-results');

  class NewsRequest extends Request {
    constructor(url) {
      super(url, {
        headers : new Headers({
          'X-Api-Key' : apiKey
        })
      });
    }
  }

  let requestSources = new NewsRequest(sourcesURL);

  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  function parseData(response) {
    return response.json();
  }

  // fetch
  // arrow function
  fetch(requestSources)
  .then(handleErrors)
  .then(parseData)
  .then(data => {
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
    .then(handleErrors)
    .then(parseData)
    .then(data => {
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