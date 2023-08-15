# vdom
基于virtual-dom、vue2、vue3、react的不同diff算法实现h、render函数，渲染成html。


## vNode

```js
class VNode {
  constructor(tag,data,children,text) {
    ...
}
```

## h函数

```js
function h(tag, data, children) {
  ...
  return new VNode(tag, data, children)
}
```

## render函数

```js
function render(vnode, parent) {
}
```

## vue2 diff

```js
function vue2diff(prevChildren, nextChildren, parent) {
}
```

## vue3 diff

```js
function vue3diff(prevChildren, nextChildren, parent) {
}
```

## react diff

```js
function reactdiff(prevChildren, nextChildren, parent) {
}
```

## patch

```js
function patch(prevNode, nextNode, parent) {
}
```

patch的三种情况处理

1. replaceNode

   ```js
   function replaceNode(prevNode, nextNode, parent) {
     ...
   }
   ```

2. patchElement

    ```js
      function patchElement(prevNode, nextNode, parent) {
        ...
      }
    ```
    

  同时，patchElement需要patchData、patchChildren的处理

  ```js
    function patchChildren(prevChildren,prevChildFlag,nextChildren,nextChildFlag,parent) {
      ...
    }
    function patchData(el, key, prevValue, nextValue) {
      ...
    }
  ```

3. patchText

   ```js
   function patchText(prevNode, nextNode) {
     ...
   }
   ```

## mount

```js
function mount(vnode, parent, refNode) {
}

function mountElement(vnode, parent, refNode) {
}

function mountText(vnode, parent) {
}
```

## 实现记录

### 2023-8-1日

- 实现h函数和render，效果如下

![h_render](/doc/h_render.png)

- tag -  1.0.0

### 2023-8-2日

- 完善mount逻辑

![mount](/doc/mount.png)

- tag -  1.0.1

### 2023-8-2日_

- 完善patch逻辑
- 完善vue2 diff

![gif](/doc/20230802-183933.gif)
![vue2_diff](/doc/vue2-diff.png)

- tag - 1.0.2

key的使用：通过diff算法得知两点

1. 错误用法 1：用index做key
   用index做key的效果实际和没有用diff算法是一样的，

   当我们用index作为key的时候，无论我们怎么样移动删除节点，到了diff算法中都会从头到尾依次patch(图中：所有节点均未有效的复用)

2. 错误用法2 ：用index拼接其他值作为key
   当已用index拼接其他值作为索引的时候，因为每一个节点都找不到对应的key，导致所有的节点都不能复用,所有的新vnode都需要重新创建。都需要重新create


### 2023-8-14日

- [完善vue3 diff](/diff/vue3.js)

![vue3diff](/doc/20230802-183933.gif)


- tag - 1.0.3


### 2023-8-15

- [完善react diff](/diff/react.js)

![react diff](/doc/react.gif)

- tag - 1.0.4