
import { CHILD_FLAG, NODE_FLAG } from '../vdom/flag'
import mount from '../mount'
import patch from '../patch'

function render(vnode, parent) {
  // 通过传入render的第二个参数来确定是否已经挂载渲染
  let prevNode = parent._vnode
  if(!prevNode) {
    mount(vnode, parent)
    parent._vnode = vnode
  } else {
    // 如果 parent已经通过虚拟node进行渲染，那么就进行对比
    if(vnode) {
      patch(prevNode, vnode, parent)
      parent._vnode = vnode
    } else {
      // 如果是空值，移除之前的渲染就好了
      parent.removeChild(prevNode.el)
    }
  }
} 

export default render