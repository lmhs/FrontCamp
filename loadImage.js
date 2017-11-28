export default function loadImage(url) {
  return new Promise((resolve, reject) => {
    let image = new Image();

    image.onload = function() {
      resolve(image);
    }

    image.onerror = function(error) {
      const msg = `Couldn’t load image from ${url}`;
      reject(new Error(msg));
    }

    image.src = url;
  });
}