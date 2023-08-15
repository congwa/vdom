
import mount from "../mount";
import patch from "../patch";

export default function react(prevChildren, nextChildren, parent) {
  console.log('run react diff')

  let prevIndexMap = {},
    nextIndexMap = {};

  // 旧的节点根据key作为索引，记录下标，方便对比
  for (let i = 0; i < prevChildren.length; i++) {
    let { key } = prevChildren[i]
    prevIndexMap[key] = i
  }

  let lastIndex = 0;

  for (let i = 0; i < nextChildren.length; i++) {
    let nextChild = nextChildren[i],
      nextKey = nextChild.key,
      // 新节点再在旧节点列表的位置
      j = prevIndexMap[nextKey];

    // 记录新节点的key在新节点的位置
    nextIndexMap[nextKey] = i;

    // 新节点在旧节点里面没有出现
    if(j === undefined) {
      // 根据新节点是不是第一个来判断插入位置
      let refNode = i === 0 ? prevChildren[0].el : nextChildren[i - 1].el.nextSibling
      mount(nextChild, parent, refNode)
    // 新节点在旧节点出现了
    } else {
      // 复用节点
      patch(prevChildren[j], nextChild, parent)

      // 边界情况: 如果j < 上一次j，说明需要移动位置。 (新节点从小到大遍历,如果位置没有发生改变，j新节点在老节点的位置也是递增的） 
      if(j < lastIndex) {
        // 移动位置肯定是以新节点为准
        let refNode = nextChildren[i - 1].el.nextSibling
        parent.insertBefore(nextChild.el, refNode)
      } else {
        lastIndex = j
      }
    }
  }

  // 移除旧节点在新节点中没有的元素
  for (let i = 0; i < prevChildren.length; i++) {
    let { key } = prevChildren[i]
    if(!nextIndexMap.hasOwnProperty(key)) {
      parent.removeChild(prevChildren[i].el)
    }
  }
}