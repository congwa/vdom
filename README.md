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
  ```
# vdom
Based on virtual-dom、vue2、vue3、react's different diff algorithm implementation、render function、电影成html。


## h function


```js
function h(tag, data, children) {
  ...
  return new VNode(tag, data, children)
}
```


## render function


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
patch的正视题手机电视


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


  At the same time, patchElement needs to handle patchData、patchChildren
  ```

3. patchText
   ```js
   function patchText(prevNode, nextNode) {
     ...
   }
   ```# vdom
Based on virtual-dom、vue2、vue3、react's different diff algorithm implementation、render function、电影成html。


## h function


```js
function h(tag, data, children) {
  ...
  return new VNode(tag, data, children)
}
```


## render function


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
patch的正视题手机电视


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


  At the same time, patchElement needs to handle patchData、patchChildren
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
3. patchText
   ```js
   function patchText(prevNode, nextNode) {
     ...
   }
   ```
