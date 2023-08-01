console.log('hello world' + import.meta.env.VITE_DIFF)

import h from './vdom'
import render from './render'

let vnode = h('div', {style: {color: 'red'}}, [
  h('p', {
    style: {
      backgroundColor: 'blue',
      with: '100px',
      height: '50px',
    }
  }),
  'text'
])

console.log(vnode)

render(vnode, document.getElementById('app'))