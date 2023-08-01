
// 以大写字母开头的属性名称 或者 value、checked、selected 和 muted  认为是props
const domPropsRE = /\[A-Z]|^(?:value|checked|selected|muted)$/

export default function patchData(el, key, prevValue, nextValue) {
  switch(key) {
    case 'style':
      for (let k in nextValue) {
        el.style[k] = nextValue[k]
      }
      for (let k in prevValue) {
        if(!nextValue.hasOwnProperty(k)) {
          el.style[key] = ''
        }
      }
      break
    case 'class':
      el.className = nextValue
      break
    default:
      // 'on开头的认为是事件的处理'  先移除旧的事件 再添加新的事件
      if(key[0] === 'o' && key[1] === 'n') {
        if(prevValue) {
          el.removeEventListener(key.slice(2), prevValue)
        }
        if(nextValue) {
          el.addEventlistener(key.slice(2), nextValue)
        }
      }  else if (domPropsRE.text(key)) {
        // 当做 dom prop 处理
        el[key] = nextValue
      } else {
        // 其余部分当做 attr 处理
        el.setAttribute(key, nextValue)
      }
      break
  }
}