(() => {
  const API_KEY = 'bdbeeb170f8c47a2b97aa0f6252bfb90';
  const NEWS_API_URL = 'https://newsapi.org/v2'
  const SOURCES_URL = `${NEWS_API_URL}/sources?apiKey=${API_KEY}`;
  let headlinesUrl = `${NEWS_API_URL}/top-headlines?sources=&apiKey=${API_KEY}`;
  let select = document.getElementById('news-channels');

  fetch(SOURCES_URL).then((response) => {
    if (response.status !== 200) {
      console.log(`${response.status}`);
      return;
    }
    return response.json();
  }).then((data) => {
    data.sources.forEach((item) => {
      select.insertAdjacentHTML('beforeend', createListItem(item));
    });
  });

  function createListItem(source) {
    return `<option>${source.name}</option>`
  }
})();