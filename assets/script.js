// arrow function
(() => {
  // let and const
  let settings = {
    apiKey : 'bdbeeb170f8c47a2b97aa0f6252bfb90'
  };

  // desctructuring assignment
  const {
    apiKey : API_KEY,
    newsAPIURL : NEWS_API_URL = 'https://newsapi.org/v2',
    params : params = {
      sources : SOURCES_PARAM = 'sources=',
      apiKey : API_KEY_PARAM = 'apiKey='
    },
    paths : paths = {
      sources : SOURCES_PATH = '/sources',
      headlines : HEADLINES_PATH = '/top-headlines'
    }
  } = settings;

  // template literals
  const sourcesURL = `${NEWS_API_URL}${SOURCES_PATH}?${API_KEY_PARAM}${API_KEY}`;
  const headlinesURL = `${NEWS_API_URL}${HEADLINES_PATH}?${SOURCES_PARAM}&${API_KEY_PARAM}${API_KEY}`;
  const select = document.getElementById('news-channels');
  const newsResults = document.getElementById('news-results');

  // fetch
  fetch(sourcesURL).then((response) => {
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    return response.json();
  }).then((data) => {
    data.sources.forEach((source) => {
      select.insertAdjacentHTML('beforeend', createListItem(source));
    });
  });

  select.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    const newHeadlinesURL = [headlinesURL.slice(0, headlinesURL.indexOf(`&${API_KEY_PARAM}`)),
      selectedValue,
      headlinesURL.slice(headlinesURL.indexOf(`&${API_KEY_PARAM}`), headlinesURL.length)].join('');

    fetch(newHeadlinesURL).then((response) => {
      if (response.status !== 200) {
        console.log(response.status);
        return;
      }
      return response.json();
    }).then((data) => {
      newsResults.innerHTML = '';
      // array for of
      for (const article of data.articles) {
        newsResults.insertAdjacentHTML('beforeend', createArticle(article.description));
      }
    });
  });

  function createListItem(source) {
    return `<option value="${source.id}">${source.name}</option>`;
  }

  function createArticle(content) {
    return `<article>${content}</article>`;
  }
})();