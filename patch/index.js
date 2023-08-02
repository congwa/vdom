import { NODE_FLAG } from '../vdom/flag'
import replaceNode from './replaceNode'
import patchText from './patchText'
import patchElement from './patchElement'

export default function patch(prevNode, nextVNode, parent) {
  // 如果新节点和旧节点的节点类型不相同， 我们认为不同的节点类型渲染的内容不同， 直接替换
  if(prevNode.flag !== nextVNode.flag) {
    replaceNode(prevNode, nextVNode, parent)
    // 如果新节点和旧节点类型相同，且是节点类型
  } else if (nextVNode.flag === NODE_FLAG.ELEMENT) {
    // 节点类型相同，就要考虑不同的情况了，具体的情况看方法内有详细说明
    patchElement(prevNode, nextVNode, parent)
    // 如果新节点和旧节点类型相同，且是文本节点
  } else if (nextVNode.flag === NODE_FLAG.TEXT) {
    patchText(prevNode, nextVNode)
  }
}