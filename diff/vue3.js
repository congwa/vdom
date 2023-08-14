// 需要一个序列作为基础的参照序列，其他未在稳定序列的节点，进行移动
// 求最长递增子序列

/**
 * 
 1 初始化一个和序列长度相同的状态数组，并赋值每一个值为1，这是因为每一个项本身就是一个递增子序列，长度为1
 2 遍历状态数组，取当前下标x对应序列的值，和序列前面的值比较，如果比前面下标y对应的值大，说明和当前下标序列值能构成递增子序列，此时取y对应的状态数组中的值加1，和当前x在状态数组值比较，取较大值更新状态数组x的值。这一步就是动态规划的核心，可以结合下方参考代码慢慢领会。
 3 遍历状态数组，取出最大的值，即为最长的递增序列长度。
 */

import mount from "../mount";
import patch from "../patch";

function lis(arr) {
  let len = arr.length, // 获取数组arr的长度
    result = [], // 用于存储递增子序列的索引数组
    dp = new Array(len).fill(1); // 动态规划状态数组，初始值都为1，表示每个元素本身就是一个长度为1的递增子序列

  for (let i = 0; i < len; i++) {
    result.push([i]); // 初始化result数组，将每个元素都作为一个独立的递增子序列加入result中
  }

  for (let i = len - 1; i >= 0; i--) {
    let cur = arr[i], // 当前元素
      nextIndex = undefined; // 下一个递增元素的索引，初始化为undefined

    if (cur === -1) continue; // 如果当前元素为-1，则跳过此次循环

    for (let j = i + 1; j < len; j++) {
      let next = arr[j]; // 下一个元素

      if (cur < next) {
        // 判断当前元素是否小于下一个元素
        let max = dp[j] + 1; // 计算当前递增子序列的长度

        if (max > dp[i]) {
          // 如果当前递增子序列的长度大于之前的最大子序列长度，则更新最大子序列长度和下一个递增元素的索引
          nextIndex = j; // 更新下一个递增元素的索引
          dp[i] = max; // 更新最大子序列长度
        }
      }
    }

    if (nextIndex !== undefined) {
      result[i] = [...result[i], ...result[nextIndex]]; // 将result数组中的当前元素与下一个递增元素所在的子序列合并，更新result数组
    }
  }

  let index = dp.reduce(
    (prev, cur, i, arr) => (cur > arr[prev] ? i : prev),
    dp.length - 1
  ); // 找出dp数组中最大值对应的索引
  return result[index]; // 返回最长递增子序列的索引数组
}

export default function vue3(prevChildren, nextChildren, parent) {
  console.log("run vue3 diff");
  let j = 0,
    prevEnd = prevChildren.length - 1,
    nextEnd = nextChildren.length - 1,
    prevNode = prevChildren[j],
    nextNode = nextChildren[j];
    
    outer: {
      // 前面一致的节点相同直接应用
      while (prevNode.key === nextNode.key) {
        patch(prevNode, nextNode, parent)
        j++
        // 边界情况：已经到达结尾
        if (j > prevEnd || j > nextEnd) break outer
        prevNode = prevChildren[j]
        nextNode = nextChildren[j]
      }
  
      prevNode = prevChildren[prevEnd]
      nextNode = nextChildren[nextEnd]
      // 后面一致的节点直接应用
      while (prevNode.key === nextNode.key) {
        patch(prevNode, nextNode, parent)
        prevEnd--
        nextEnd--
        // 边界情况: 是否到达前面的
        if (j > prevEnd || j > nextEnd) break outer
        prevNode = prevChildren[prevEnd]
        nextNode = nextChildren[nextEnd]
      }
    }

    // 此时已经处理完前面一样的和后面一样的节点

    // 前后对比完，发现j大于之前的数量，小于新增节点的总数量， 那么需要把新增的节点create
    if (j > prevEnd && j <= nextEnd) {
      
      // 保证从最后一个往前插入，避免多余的节点，一直插在中间
      let nextPos = nextEnd + 1,
        refNode = nextPos >= nextChildren.length
          ? null
          : nextChildren[nextPos].el
      while (j <= nextEnd) {
        mount(nextChildren[j++], parent, refNode)
      }
      return
    } else if (j > nextEnd) { // 删除多余的节点
      while (j <= prevEnd) {
        parent.removeChild(prevChildren[j++].el)
      }
      return
    }

    // 完美的情况已经对比完，现在对比乱序部分

    // 第一步： 通过老节点的key找到对应新节点的index:开始遍历老的节点，判断有没有key， 如果存在key通过新节点的nextIndexMap找到与新节点index,如果不存在key那么会遍历剩下来的新节点试图找到对应index。
    // 第二步：如果存在index证明有对应的老节点，那么直接复用老节点进行patch，没有找到与老节点对应的新节点，删除当前老节点。
    // 第三步：source找到对应新老节点关系。

    let nextStart = j,
      prevStart = j,
      nextLeft = nextEnd - j + 1,
      nextIndexMap = {},
      source = new Array(nextLeft).fill(-1),
      patched = 0,
      lastIndex = 0,
      move = false;

    // 遍历所有新节点把索引和对应的key,存入map 
    for (let i = nextStart; i <= nextEnd; i++) {
      let key = nextChildren[i].key
      nextIndexMap[key] = i
    }

    // 通过遍历旧子序列，确定可复用节点在新的子序列中的位置
    // 从左向右遍历旧子序列，patch匹配的相同类型的节点，移除不存在的节点
    for (let i = prevStart; i <= prevEnd; i++) {
      let prevChild = prevChildren[i],
        prevKey = prevChild.key,
      
        nextIndex = nextIndexMap[prevKey];
      
      // nextIndex = undefined， 表示确定在新节点里面没有此节点，直接删除
      // nextLeft需要patched的节点数量
      if (patched >= nextLeft || nextIndex === undefined) {
        parent.removeChild(prevChild.el)
        continue
      }
      // 已经patched的节点数量+1
      patched++

      // nextIndex存在，代表新节点存在好节点里面，key相同，直接复用
      let nextChild = nextChildren[nextIndex]
      // 确定在新节点中有此老节点，直接复用老节点进行patch
      patch(prevChild, nextChild, parent)
      
      // 
      // 记录复用节点的真实索引
      source[nextIndex - nextStart] = i
      
      // 如果旧节点在新节点中的相对位置保持不变，那么不需要移动，因为遍历是递增的，所以 新的节点的位置前面的一定小于后面的，也就是 nextIndex < lastIndex， 如果大了就说明要发生移动
      if (nextIndex < lastIndex) {
        move = true // 
      } else {
        lastIndex = nextIndex
      }
    }

    // 通过上面的步骤，处理了复用的节点，需要移除的节点， 确定了要移动的位置，也就是source


    // 复用节点发生了位置变化，找出新节点的复用节点的最大递增子序列，只移动相对位置前后发生变化的子节点。做到最小改动。
    // 
    if(move) {
      // 发生复用的节点的最小递增序列， 这里是新节点，因为最终的渲染一定是新节点的
      const seq = lis(source);
      let j = seq.length - 1;
      // 遍历需要加入的所有节点
      for (let i = nextLeft - 1; i >= 0; i--) {
        let pos = nextStart + i,
          nextPos = pos + 1,
          nextChild = nextChildren[pos],
          refNode = nextChildren[nextPos]?.el
        // 当前节点没有被复用，直接插入
        if (source[i] === -1) {
  
          mount(nextChild, parent, refNode)
          // 如果此下标不是最长序列里面的下标，那么需要移动位置， 不用管之前的位置，按照移动到最新的节点位置即可
        } else if (i !== seq[j]) {
          parent.insertBefore(nextChild.el, refNode)
        } else {
          // 最长递增序列移动位置
          j--
        }
      }

    }

    // 没有发生移动，确定插入的位置进行插入即可
    if(!move) {
      // 遍历需要加入的所有节点
      for (let i = nextLeft - 1; i >= 0; i--) {
        // 如果此节点没有被复用，那么进行插入
        if (source[i] === -1) {
          let pos = nextStart + i,
            nextPos = pos + 1,
            nextChild = nextChildren[pos],
            refNode = nextChildren[nextPos]?.el;
        
          mount(nextChild, parent, refNode)
        }
      }
    }


}
