
import { CHILD_FLAG, NODE_FLAG } from '../vdom/flag'
import mount from '../mount'

function render(vnode, parent) {
  // 通过传入render的第二个参数来确定是否已经挂载渲染
  let prevNode = parent._vnode
  if(!prevNode) {
    mount(vnode, parent)
    parent._vnode = vnode
  }
} 

export default render