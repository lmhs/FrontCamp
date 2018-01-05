// let and const
// settings for desctructuring assignment example
const settings = {
  ['newsAPIURL'] : 'https://newsapi.org/v2'
};

let apiKey = 'bdbeeb170f8c47a2b97aa0f6252bfb90';
export const headers = new Headers({
  'X-Api-Key' : apiKey
});

// destructuring assignment
// property value shorthands
// TODO: check why if type=module nested objects throw reference error
export const {
  newsAPIURL,
  sourcesParam : sourcesParam = 'sources=',
  categoriesParam : categoriesParam = 'category=',
  sourcesPath : sourcesPath = '/sources',
  headlinesPath : headlinesPath = '/top-headlines'
} = settings;

// template literals
export const sourcesURL = `${newsAPIURL}${sourcesPath}`;
export const headlinesURL = `${newsAPIURL}${headlinesPath}?${sourcesParam}`;
