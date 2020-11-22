import mountElement from './mountElement'
import updateTextNode from './updateTextNode'

export default function diff (virtualDOM, container, oldDOM) {
  let oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  // 如果旧DOM 不存在
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type){
    if (virtualDOM.type === 'text') {
      // 文本节点
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 元素节点
    }
    // 将子节点遍历处理
    virtualDOM.children && virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i])
    });

  }
}