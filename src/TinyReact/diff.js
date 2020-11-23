import createDOMElement from './createDOMElement'
import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
import unmountElement from './unmountElement'

export default function diff (virtualDOM, container, oldDOM) {
  let oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  // 如果旧DOM 不存在
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type){
    // 节点类型相同
    if (virtualDOM.type === 'text') {
      // 文本节点
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 元素节点
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }
    // 将子节点遍历处理
    virtualDOM.children && virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i])
    })
    const oldChildNodes = oldDOM.childNodes
    // 将多余的节点删除
    if (virtualDOM.children && oldChildNodes.length > virtualDOM.children.length) {
      
      // 倒序删除
      for (let index = oldChildNodes.length-1 ; index > virtualDOM.children.length - 1; index--) {
        unmountElement(oldChildNodes[index])
      }
    } 

  } else if(oldVirtualDOM && virtualDOM.type !== oldVirtualDOM.type && typeof oldVirtualDOM.type !== 'function') {
    // 节点类型不同， 并且不是 组件
    // mountElement(virtualDOM, container)  // 为啥不用这个呢？  因为是替换节点，而不是新增挂载节点
    const newELement = createDOMElement(virtualDOM)
    // 新dom替换旧dom
    oldDOM.parentNode.replaceChild(newELement, oldDOM)

  }
}