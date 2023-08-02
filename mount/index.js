
import { NODE_FLAG } from '../vdom/flag'
import mountElement from './mountElement'
import mountText from './mountText'

// 挂载逻辑
export default function mount(vnode, parent, refNode) {
  const { flag } = vnode
  // 通过vnode的节点类型来判断如何进行挂载
  if(flag & NODE_FLAG.ELEMENT) {
    mountElement(vnode, parent, refNode)
  } else if(flag & NODE_FLAG.TEXT) {
    mountText(vnode, parent)
  }
}