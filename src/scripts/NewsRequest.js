// Classes
class NewsRequest extends Request {

  constructor(url) {
    let apiKey = 'bdbeeb170f8c47a2b97aa0f6252bfb90';
    const headers = new Headers({
      'X-Api-Key' : apiKey
    });

    super(url, {
      headers
    });
  }
}

export {NewsRequest as default}
