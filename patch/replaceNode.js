import mount from "../mount"

// 参考 https://ahoge.cn/vue-design/v1/renderer-patch.html#%E6%9B%BF%E6%8D%A2-vnode
export default function replaceNode(prevNode, nextVNode, parent) {
  parent.removeChild(prevNode.el)
  mount(nextVNode, parent)
}