import { NODE_FLAG, CHILD_FLAG } from './flag'

class VNode {
  /**
   * 
   * @param {*} tag 标签类型 
   * @param {*} data props data
   * @param {*} children  子VNode
   * @param {*} text 文本
   */
  constructor(tag, data, children, text) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text

    this.el = null
    this.flag = tag === undefined ? NODE_FLAG.TEXT : NODE_FLAG.ELEMENT
    this._isNode = true

    if(Array.isArray(children)) {
      
      if(children.length === 0) {
        // children为空数组时候标记为无子节点
        this.childFlag = CHILD_FLAG.NO_CHILD
      } else if (children.length === 1) {
        // 如果有一个, 标记为 SINGLE_CHILD 单子节点
        this.childFlag = CHILD_FLAG.SINGLE_CHILD
        this.children = children[0]
      } else {
        // 如果有多个标记为 KEY_CHILD key子节点
        this.childFlag = CHILD_FLAG.KEY_CHILD
        this.children = normalizeVNodes(children)
      }
    } else if (children == null) {
      this.childFlag = CHILD_FLAG.NO_CHILD
      // 如果传入的就是vnode，标记为子节点就好
    } else if (children._isNode) {
      this.childFlag = CHILD_FLAG.SINGLE_CHILD
      this.children = children
    } else {

      // 不认识的全部转化为文本 (不符合h函数规范的)
      this.childFlag = CHILD_FLAG.SINGLE_CHILD
      this.children = createTextVNode(children)
    }

  }
}

// 此函数作用说明 https://ahoge.cn/vue-design/v1/h.html#%E5%9C%A8vnode%E5%88%9B%E5%BB%BA%E6%97%B6%E7%A1%AE%E5%AE%9A%E5%85%B6children%E7%9A%84%E7%B1%BB%E5%9E%8B
function normalizeVNodes(children) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    // 不是VNode的话，尝试创建一个文本VNode
    if(!child._isNode) {
      child = children[i] = createTextVNode(child)
    }
    // 没有key的时候给一个key
    if(child.key == null) {
      child.key = '|' + i
    }
  }
  return children
}

function createTextVNode(text) {
  // `text + ''` 为了防止一些不认识的内容导致不能渲染，这里转化一下字符串
  return new VNode(undefined, undefined, undefined, text + '')
}

function h(tag, data, children) {
  // 官方说明：https://cn.vuejs.org/api/render-function.html#h
  // 省略 props的使用
  if(Array.isArray(data)) {
    children = data
    data = null
  }
  return new VNode(tag, data, children)  
}

export default h