import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDOMElement (virtualDOM) {
  let newElement = null
  if(virtualDOM.type === 'text'){
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
    // 更新节点的 props 属性
    updateNodeElement(newElement, virtualDOM)
  }

  newElement._virtualDOM = virtualDOM

  // DOM 上有 ref 属性， 就将 DOM 传递给该属性绑定的方法
  if(virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(newElement)
  }
  
  // 渲染子节点
  if (virtualDOM.children) {
    virtualDOM.children.forEach(child => {
      mountElement(child, newElement)
    });
  }

  return newElement
}