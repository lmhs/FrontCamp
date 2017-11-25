// Classes
export default class NewsRequest extends Request {

  constructor(url) {
    let apiKey = 'bdbeeb170f8c47a2b97aa0f6252bfb90';

    super(url, {
      headers : new Headers({
        'X-Api-Key' : apiKey
      })
    });


  }
}