import icon from '../images/GitHub-Mark-32px.png';

export default (() => {
  debugger;
  let image = new Image();
  image.src = icon;
  image.className = 'github-icon';
  let element = document.querySelector('.js-github-link');
  element.insertBefore(image, element.firstChild);
})();