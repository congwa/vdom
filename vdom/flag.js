

/**
 * NODE_FLAG 定义节点类型
 * ELEMENT: 1 元素节点
 * TEXT: 1 文本节点
 */
const NODE_FLAG = {
  ELEMENT: 1,    
  TEXT: 1 << 1
}

/**
 * CHILD_FLAG 定义子节点类型
 * NO_CHILD: 0 无子节点
 * SINGLE_CHILD: 2 单子节点
 * NO_KEY_CHILD: 4 无key子节点
 * KEY_CHILD: 8 key子节点
 */
const CHILD_FLAG = {
  NO_CHILD: 1,
  SINGLE_CHILD: 1 << 1,
  NO_KEY_CHILD: 1 << 2,
  KEY_CHILD: 1 << 3
}

// 既有key子节点又有非key子节点 12
CHILD_FLAG.MULTI_CHILD = CHILD_FLAG.NO_KEY_CHILD | CHILD_FLAG.KEY_CHILD

export { NODE_FLAG, CHILD_FLAG}