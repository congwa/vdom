
import mount from "../mount"
import patch from "../patch"

// vue2 diff 是 双端比较
export default function vue2(prevChildren, nextChildren, parent) {
  console.log('run vue2 diff')

  let prevStartIndex = 0,
    nextStartIndex = 0,
    prevEndIndex = prevChildren.length -1,
    nextEndIndex = nextChildren.length - 1,
    prevStartNode = prevChildren[prevStartIndex],
    prevEndNode = prevChildren[prevEndIndex],
    nextStartNode = nextChildren[nextStartIndex],
    nextEndNode = nextChildren[nextEndIndex]
    // 旧的头指针大于等于旧的尾指针 同时满足 新的头指针 大于等于新的尾指针， 循环条件退出，代表全部对比完
    while (prevStartIndex <= prevEndIndex && nextStartIndex <= nextEndIndex) {
      // 旧的起始节点不存在，旧的起始位置++
      if(prevStartNode === undefined) {
        prevStartNode = prevChildren[++prevStartIndex];
        console.log(prevStartNode)
        // 旧的尾部节点不存在，旧的尾部位置 --
      } else if (prevEndNode === undefined) {
        prevEndNode = prevChildren[--prevEndIndex];
        // 旧的起始节点 和 新的起始节点 对比key相同 相同更进入深入对比，  看看是不是完整的一样，子有无变化
      } else if (prevStartNode.key === nextStartNode.key) {
        patch(prevStartNode, nextStartNode, parent);

        prevStartIndex++;
        nextStartIndex++;
        prevStartNode = prevChildren[prevStartIndex];
        console.log(prevStartNode)
        nextStartNode = nextChildren[nextStartIndex];
        // 根据上面类推 旧的尾节点和 新的起始节点 对比key系统，  看看是不是完整的一样，子有无变化
      } else if (prevEndNode.key === nextEndNode.key) {
        patch(prevEndNode, nextEndNode, parent);

        prevEndIndex--;
        nextEndIndex--;
        prevEndNode = prevChildren[prevEndIndex];
        nextEndNode = nextChildren[nextEndIndex];
        // 旧的头节点 和 新的尾部节点 对比key，移动到旧的尾节点后面，保证和新的节点顺序相同， 看看是不是完整的一样，子有无变化
      } else if (prevStartNode.key === nextEndNode.key) {
        patch(prevStartNode, nextEndNode, parent)
        parent.insertBefore(prevStartNode.el, prevEndNode.el.nextSibling)
        prevStartIndex++
        nextEndIndex--
        prevStartNode = prevChildren[prevStartIndex]
        console.log(prevStartNode)
        nextEndNode = nextChildren[nextEndIndex]
        // 旧的尾节点和新的头节点对比key， key相同的时候，移动到开始节点的前面， 深入对比一下， 看看是不是完整的一样，子有无变化
      } else if (prevEndNode.key === nextStartNode.key) {
        patch(prevEndNode, nextStartNode, parent)
        parent.insertBefore(prevEndNode.el, prevStartNode.el)
        prevEndIndex--
        nextStartIndex++
        prevEndNode = prevChildren[prevEndIndex]
        nextStartNode = nextChildren[nextStartIndex]
        // 以上情况都不满足，进入下一次查找，则根据新的子节点的起始节点的key在旧的子节点数组中查找相同key的节点 ，跨越一大步
      } else {
        let nextKey = nextStartNode.key,
        prevIndex = prevChildren.findIndex(child => child && (child.key === nextKey))

        if (prevIndex === -1) { // 如果在旧的子节点数组中找不到相同key的节点，则将新的子节点添加到DOM中
          mount(nextStartNode, parent, prevStartNode.el);
          // 如果找到了相同key的节点，则深入对比这两个节点，移动到前面，并将旧的节点数组中的对应位置设为undefined
        } else {
          let prevNode = prevChildren[prevIndex];
          patch(prevNode, nextStartNode, parent);
          parent.insertBefore(prevNode.el, prevStartNode.el);
          prevChildren[prevIndex] = undefined;
        }

        // 新的子节点++ 进行下一次对比
        nextStartIndex++;
        nextStartNode = nextChildren[nextStartIndex];
      }
    }

    // 全部对比完成后，此时保证顺序

    if(nextStartIndex > nextEndIndex) { // 则表示旧的节点有剩余节点需要移除  边界情况可能会多出一个
      while (prevStartIndex <= prevEndIndex) {
        if (!prevChildren[prevStartIndex]) { // 如果旧子节点数组中的节点已经被移除，则继续新节点
          prevStartIndex++;
          continue;
        }
        parent.removeChild(prevChildren[prevStartIndex++].el); // 移除旧子节点数组中的节点
      }
    } else if (prevStartIndex > prevEndIndex) { // 则表示新的节点有剩余节点需要添加 边界情况可能会遗漏一个
      while(nextStartIndex <= nextEndIndex) {
        mount(nextChildren[nextStartIndex++], parent, prevStartNode?.el); 
      }
    }
}