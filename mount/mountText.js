

// 如果是文本节点非常简单，直接渲染即可，注意el真实节点关联到vnode
export default function(vnode, parent) {
  const el = document.createTextNode(vnode.text)
  vnode.el = el
  parent.appendChild(el)
}