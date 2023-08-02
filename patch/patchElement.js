
import patchData from './patchData'
import replaceNode from './replaceNode'
import patchChildren from './patchChildren'


// 参考 https://ahoge.cn/vue-design/v1/renderer-patch.html#%E6%9B%B4%E6%96%B0%E6%A0%87%E7%AD%BE%E5%85%83%E7%B4%A0


export default function patchElement(prevNode, nextNode, parent) {
  // 如果新旧 VNode 描述的是不同的标签，则调用 replaceNode 函数，使用新的 VNode 替换旧的 VNode
  // 这就又引申出了一条更新原则：我们认为不同的标签渲染的内容不同
  if(prevNode.tag !== nextNode.tag) {
    replaceNode(prevNode, nextNode, parent)
    return
  }

  /**
   * 接下来处理相同标签的情况，
   * 
   * 两个 VNode 之间的差异就只会出现在 VNodeData 和 children 上
   * 
   */

  // 尽量的去复用旧的 dom
  const el = (nextNode.el = prevNode.el)
  
  let prevData = prevNode.data, nextData = nextNode.data

  // 判断一下新的data是否有值， 有值再进行赋值处理，无值略过
  if(nextData) {
    for (let key of Object.keys(nextData)) {
      let prevValue = prevData[key], nextValue = nextData[key]
      patchData(el, key, prevValue, nextValue)
    }
  }

  if(prevData) {
    for (let key of Object.keys(prevData)) {
      if(!nextData.hasOwnProperty(key)) {
        // 新的值赋予空值
        patchData(el, key, prevData[key], null)
      }

      // 旧的重复的值在上面已经进行替换
    }
  }

  // 接下来处理子类型，需要用到对比算法

  let prevChildren = prevNode.children,
    nextChildren = nextNode.children,
    prevChildFlag = prevNode.childFlag,
    nextChildFlag = nextNode.childFlag

  patchChildren(prevChildren,prevChildFlag, nextChildren, nextChildFlag, el)
}