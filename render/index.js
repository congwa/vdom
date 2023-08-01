
import { CHILD_FLAG, NODE_FLAG } from '../vdom/flag'

function render(vnode, parent) {
  // 伪代码 -- 假定 parent 是一个 dom
  
  // vnode转el
  const { tag, children, data, childFlag, flag } = vnode

  let el
  if (flag & NODE_FLAG.ELEMENT) {
    el = createNode(vnode)
  } else if (flag & NODE_FLAG.TEXT) {
    el = createText(vnode)
  } else {
    el = createText(vnode)
  }


  // if data ...
  for (let attr in data) {
    if(attr === 'style') {
      for (let key in data[attr]) {
        el.style[key] = data[attr][key]
      }
    }
  }
  // if(childFlag !== CHILD_FLAG.NO_CHILD) {
  //   if(childFlag &  CHILD_FLAG.MULTI_CHILD) { // 按位与 ， 这里的意思是判断有没有非零值

  //   }
  // }
  if(children && children.length) {
    for (let child of children) {
      render(child, el)
    }  
  }
  
  parent.appendChild(el)
}


function createNode(vnode) {
  const { tag, children, data, childFlag } = vnode
  const el = document.createElement(tag)
  vnode.el = el
  return el
}

function createText(vnode) {
  const el = document.createTextNode(vnode.text)
  vnode.el = el
  return el
}

export default render