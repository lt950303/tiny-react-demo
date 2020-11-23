import createDOMElement from './createDOMElement'

export default function mountNativeElement (virtualDOM, container) {
  // 创建DOM
  let newElement = createDOMElement(virtualDOM)

  // 将节点挂载到 节点上
  container.appendChild(newElement)

  // 如果是类组件
  const component = virtualDOM.component
  if (component) {
    component.setDom(newElement)
  }

}