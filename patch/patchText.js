
// 参考 https://ahoge.cn/vue-design/v1/renderer-patch.html#%E6%9B%B4%E6%96%B0%E6%96%87%E6%9C%AC%E8%8A%82%E7%82%B9
// 如果一个 DOM 元素是文本节点或注释节点，那么可以通过调用该 DOM 对象的 nodeValue 属性读取或设置文本节点(或注释节点)的内容
export default function patchText(prevNode, nextVNode) {
  // 节点复用
  const el = (nextVNode.el = prevNode.el)
  if(nextVNode.text !== prevNode.text) {
    el.nodeValue = nextVNode.text
  }
}