'use strict';

const API = 'https://hacker-news.firebaseio.com/v0';
const defCount = 20;
const maxCount = 500;
const {hash} = window.location;
const hashVal = !hash ? defCount : +hash.substr(1);
const count = isNaN(hashVal)
  ? defCount : hashVal <= maxCount
    ? hashVal : maxCount;

let loadCount = 0;

function isShit (text, filter = topics) {
  for (let i = 0, l = filter.length; i < l; i++) {
    if (text.includes(filter[i])) return true;
  }
  return false;
}

function addStory ({title, url}) {
  if (
    url === undefined
    || isShit(title.toLowerCase())
    || isShit(url, sites)
  ) return;
  document.body.append(
    Object.assign(document.createElement('a'), {
      innerHTML: title,
      target: '_blank',
      href: url
    })
  );
  loadCount++;
  document.title = `クモ : ${loadCount}/${count}`;
}

fetch(`${API}/topstories.json`)
  .then(response => response.json())
  .then((stories) => {
    for (let i = 0; i < count; i++) {
      const id = stories[i];
      if (Object.prototype.hasOwnProperty.call(sessionStorage, id)) {
        addStory(JSON.parse(sessionStorage.getItem(id)));
        continue;
      }
      fetch(`${API}/item/${id}.json`)
        .then(data => data.json())
        .then((result) => {
          const story = {title: result.title, url: result.url};
          sessionStorage.setItem(id, JSON.stringify(story));
          addStory(story);
        });
    }
  });
