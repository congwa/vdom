import patch from './index'
import mount from '../mount'
import { CHILD_FLAG } from '../vdom/flag'
import diff from '../diff'

// 对新旧 VNode 的子节点进行同层级的比较
// 参考 https://ahoge.cn/vue-design/v1/renderer-diff.html#%E5%87%8F%E5%B0%8Fdom%E6%93%8D%E4%BD%9C%E7%9A%84%E6%80%A7%E8%83%BD%E5%BC%80%E9%94%80
// 进入diff算法流程
/**
 * 
 * 新旧对比  一共枚举出9种类情况，依次对比
 * 
 * 旧的单个的情况
 *  - 新的单个  -  比较两个vnode就好了
 *  - 新的没有  - 把旧的子节点移除
 *  - 新的多个  -  旧的移除，新的都重新挂载上   这里即便复用也没太大的必要，因为肯定会发生大面积的渲染
 * 
 * 旧的没有子节点的情况
 *  - 新的单个 - 新的子节点直接插入
 *  - 新的没有 - 无变化
 *  - 新的多个 - 新的依次挂载
 * 
 * 旧的多个的情况
 *  - 新的单个 - 移除所有旧的，添加新的
 *  - 新的没有 - 把所有旧的删除
 *  - 新的多个 - 进行diff算法，尽量的复用，因为存在之前有10个，现在有10个，只是其中一个属性变了，没必要大面积重新渲染来影响性能
 */
/** */
export default function patchChildren(prevChildren, prevChildFlag, nextChildren, nextChildFlag, parent) {
  // 判断节点类型
  switch ( prevChildFlag ) {
    // 旧的children 是单个子节点
    case CHILD_FLAG.SINGLE_CHILD:
      switch (nextChildFlag) {
        // 旧的单个 新的单个  - 比较两个vnode就好了
        case CHILD_FLAG.SINGLE_CHILD:
          patch(prevChildren, nextChildren, parent)
          break
        // 旧的单个 新的没有
        case CHILD_FLAG.NO_CHILD:
          parent.removeChild(prevChildren.el)
          break
        // 旧的单个 新的多个
        default: 
          parent.removeChild(prevChildren.el)
          for (let child of nextChildren) {
            mount(child, parent)
          }
          break
      }
      break
    // 旧的children 没有子节点
    case CHILD_FLAG.NO_CHILD:
      switch(nextChildFlag) {
        // 旧的没有，新的子节点中是单个子节点直接插入进入
        case CHILD_FLAG.SINGLE_CHILD:
          mount(nextChildren, parent)
          break
        case CHILD_FLAG.NO_CHILD:
          // 旧的没有，旧的新的都没东西，不做操作
          break
        default:
          // 旧的没有，新的有多个子节点, 多个子节点依次挂载进去就可以
          for (const child of nextChildren) {
            mount(child, parent)
          }
          break
      }
      break
    // 旧的 children有多个子节点
    default:
      switch (nextChildFlag) {
        // 旧的多个，新的单个 - 移除所有旧的，添加新的
        case CHILD_FLAG.SINGLE_CHILD:
          for (const child of prevChildren) {
            parent.removeChild(child.el)
          }
          mount(nextChildren, parent)
          break
        // 旧的多个，新的没有 - 把所有旧的删除
        case CHILD_FLAG.NO_CHILD:
          for (const child of prevChildren) {
            parent.removeChild(child.el)
          }
          break
        // 旧的多个， 新的多个 - 进行diff算法
        default: 
          const diffMethodName = import.meta.env.VITE_DIFF // vue2 vue3 react
          diff[diffMethodName](prevChildren, nextChildren, parent)
          break
      }
      break
  }
}