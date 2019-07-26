/**
 * クモ
 * HN client
 *
 * @author Josh Avanier
 * @license MIT
 */

const H = 'https://hacker-news.firebaseio.com/v0'
const h = window.location.hash
const x = !h ? 20 : +h.substr(1)
const c = x <= 500 ? x : 500

const {appVersion, userAgent} = navigator
if (!!~appVersion.indexOf('Win')
  || !!~userAgent.indexOf('MSIE')
  || !!~userAgent.indexOf('Win')) {
  alert('Nope')
} else {
  fetch(`${H}/topstories.json`)
    .then(r => r.json())
    .then(d => {
      for (let i = 0; i < c; i++) {
        fetch(`${H}/item/${d[i]}.json`)
          .then(r => r.json())
          .then(({title, url}) => {
            document.body.append(Object.assign(document.createElement('a'), {
              innerHTML: title,
              target: '_blank',
              href: url
            }))
          })
      }
    })
}
