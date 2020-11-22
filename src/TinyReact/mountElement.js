import mountNativeElement from './mountNativeElement'
import isFunction from './isFunction'
import mountComponent from './mountComponent'

export default function mountElement (virtualDOM, container) {
  // 判断是  函数组件 还是 dom元素
  if (isFunction(virtualDOM)) {
    mountComponent(virtualDOM, container)
  } else {
    mountNativeElement(virtualDOM, container)
  }
  
}