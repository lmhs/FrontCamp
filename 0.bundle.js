webpackJsonp([0],{"./src/scripts/Article.js":function(e,t,r){"use strict";function n(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(i,s){try{var c=t[i](s),a=c.value}catch(e){return void r(e)}if(!c.done)return Promise.resolve(a).then(function(e){n("next",e)},function(e){n("throw",e)});e(a)}return n("next")})}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r("./src/scripts/loadImage.js"),a=function(e){return e&&e.__esModule?e:{default:e}}(c),u=function(){function e(t){i(this,e),this.author=t.author,this.title=t.title,this.desc=t.description,this.url=t.url,this.imageSrc=t.urlToImage,this.pubdate=t.publishedAt}return s(e,[{key:"appendTo",value:function(e){e.insertAdjacentHTML("beforeend",this.render())}},{key:"renderImg",value:function(){document.querySelector('article[data-url="'+this.url+'"]').insertAdjacentHTML("afterbegin",'<a class="article-link" target="_blank" href="'+this.url+'">\n        <img class="article-img" src="'+this.imageSrc+'" alt="'+this.title+'">\n      </a>')}},{key:"addImg",value:function(){function e(){return t.apply(this,arguments)}var t=n(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,a.default)(this.imageSrc);case 2:return e.next=4,function(e){t.renderImg()}();case 4:case"end":return e.stop()}},e,this)}));return e}()},{key:"render",value:function(){return this.imageSrc&&this.addImg().catch(function(e){console.error(e)}),'<article data-url="'+this.url+'" class="article" '+(this.pubdate?'pubdate="'+this.pubdate+'"':"")+'>\n        <div class="article-body">\n          '+(this.title?'<h3 class="article-title"><a class="article-title-link" target="_blank" href="'+this.url+'">'+this.title+"</a></h3>":"")+"\n          "+(this.author?'<span class="article-author">by '+this.author+"</span>":"")+"\n          "+(this.desc?'<a class="article-link" target="_blank" href="'+this.url+'"><p class="article-content">'+this.desc+"</p></a>":"")+"\n        </div>\n      </article>"}}]),e}();t.default=u},"./src/scripts/Reredux/ActionCreator.js":function(e,t,r){"use strict";function n(e,t){var r={type:e};return Object.create(r,t?{text:{value:t}}:void 0)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},"./src/scripts/Reredux/Reredux.js":function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e){return new o.default(e)}function s(e,t){return new f.default(e,t)}function c(e){return new f.default(e)}function a(e,t){return t?s(e,t):c(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.createStore=i,t.createAction=a;var u=r("./src/scripts/Reredux/Store.js"),o=n(u),l=r("./src/scripts/Reredux/ActionCreator.js"),f=n(l)},"./src/scripts/Reredux/Store.js":function(e,t,r){"use strict";function n(e){var r=this;this.reducer=e,this.listeners=[],this.state={articles:[]},t.default=n=function(){return r}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n,n.prototype.getState=function(){return this.state},n.prototype.subscribe=function(e){var t=this;return this.listeners.push(e),function(){t.listeners=t.listeners.filter(function(t){return t!==e})}},n.prototype.unsubscribe=function(e){this.subscribe(e)()},n.prototype.dispatch=function(e){this.state=this.reducer(this.getState(),e),this.listeners.forEach(function(e){return e()})}},"./src/scripts/loadArticles.js":function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function s(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(i,s){try{var c=t[i](s),a=c.value}catch(e){return void r(e)}if(!c.done)return Promise.resolve(a).then(function(e){n("next",e)},function(e){n("throw",e)});e(a)}return n("next")})}}function c(){x.dispatch((0,j.createAction)("ARTICLES_FILTERED","Filtering articles"))}function a(){var e=x.getState().articles;A.innerHTML="",e.length&&E.classList.remove("is-hidden");var t=!0,r=!1,n=void 0;try{for(var i,s=e[Symbol.iterator]();!(t=(i=s.next()).done);t=!0){var c=i.value;if(c.title&&c.description&&c.url){u(c).appendTo(A)}}}catch(e){r=!0,n=e}finally{try{!t&&s.return&&s.return()}finally{if(r)throw n}}}function u(e){return new _.default(e)}function o(e){var t=g.headlinesURL+e,r=new Request(t,{headers:g.headers});v(r).then(function(e){I=[].concat(i(e.articles)),x.dispatch((0,j.createAction)("ARTICLES_LOADED"))}).catch(function(e){console.error("Error status: "+e.statusText)})}function l(e){o(e.target.value)}function f(){return w.value}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};switch(arguments[1].type){case"ARTICLES_FILTERED_NO_AUTHOR":return e.author?{}:e;default:return e}}function h(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{articles:[]};switch(arguments[1].type){case"ARTICLES_LOADED":return Object.assign({},e,{articles:I});case"ARTICLES_FILTERED":var t=e.articles.map(function(e){return d(e,(0,j.createAction)("ARTICLES_FILTERED_NO_AUTHOR","Filtering articles"))});return Object.assign({},e,{articles:t});default:return e}}function p(){o(f())}Object.defineProperty(t,"__esModule",{value:!0});var v=function(){var e=s(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return r=e.sent,e.next=5,y.dataHelper.handleErrors(r);case 5:return r=e.sent,e.next=8,r.json();case 8:return n=e.sent,e.abrupt("return",n);case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}();t.default=p,r("./node_modules/whatwg-fetch/fetch.js");var m=r("./node_modules/element-dataset/lib/browser/index.es.js"),g=(n(m),r("./src/scripts/constants.js")),y=r("./src/scripts/helper.js"),b=r("./src/scripts/Article.js"),_=n(b),j=r("./src/scripts/Reredux/Reredux.js"),w=document.getElementById("news-channels"),A=document.getElementById("articles-results"),E=document.querySelector(".js-articles-section"),R=document.getElementById("filter-articles"),x=(0,j.createStore)(h),I=[];x.subscribe(a),R.addEventListener("click",c),w.addEventListener("change",l)},"./src/scripts/loadImage.js":function(e,t,r){"use strict";function n(e){return new Promise(function(t,r){var n=new Image;n.onload=function(){t(n)},n.onerror=function(t){var n="Couldn’t load image from "+e;r(new Error(n))},n.src=e})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n}});