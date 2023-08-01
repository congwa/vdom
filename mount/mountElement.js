// https://ahoge.cn/vue-design/v1/renderer.html#%E5%9F%BA%E6%9C%AC%E5%8E%9F%E7%90%86

// 挂载元素类型 也就是 普通标签
// 是拿到组件产出的 VNode，并将之挂载到正确的 container 中

import { CHILD_FLAG } from '../vdom/flag'
import mount from './index'
import patchData from '../patch/patchData'

//vue2源码地址 https://github1s.com/vuejs/vue/blob/HEAD/src/platforms/web/runtime/node-ops.ts#L37

// 这里的refNode是一个参考节点，可能在diff之后移动位置的时候插入refNode的前面  此api暂且不表
export default function mountElement(vnode, parent, refNode) {
  const { tag, children, data, childFlag } = vnode
  const el = document.createElement(tag)
  vnode.el = el
  
  // 处理属性
  if(data) {
    for(let key of Object.keys(data)) {
      // data 对属性进行应用
      patchData(el, key, null, data[key])
    }
  }

  if(childFlag !== CHILD_FLAG.NO_CHILD) {
    if(childFlag & CHILD_FLAG.SINGLE_CHILD) {
      mount(children, el)
    } else if (childFlag & CHILD_FLAG.MULTI_CHILD) {
      for(let child of children) {
        mount(child, el)
      }
    }
  }

  refNode? parent.insertBefore(el, refNode) : parent.appendChild(el)
}

