import createDOMElement from './createDOMElement'
import unmountElement from './unmountElement'

export default function mountNativeElement (virtualDOM, container, oldDOM) {
 
  // 创建DOM
  let newElement = createDOMElement(virtualDOM)

  // 将节点挂载到 节点上
  if(oldDOM){
    console.log(111);
    container.insertBefore(newElement, oldDOM)
  }else{
    container.appendChild(newElement)
  }

  // 如果是类组件
  const component = virtualDOM.component
  if (component) {
    component.setDom(newElement)
  }

}