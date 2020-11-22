import isFunction from './isFunction';
import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement';

export default function mountComponent (virtualDOM, container) {
  // 判断是 函数组件 还是 类组件：  通过判断对象是否有render 方法， 有就是类组件，反之函数组件
  let nextVirtualDOM = null
  if (isFunctionComponent(virtualDOM)) {
    console.log('函数组件');
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    console.log('类组件');
    nextVirtualDOM = buildClassComponent(virtualDOM)
  }
  
  if(nextVirtualDOM == null) return // 防止为 null 后续函数执行报错
  // 函数组件返回的是否还是 组件？
  if (isFunction(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container)
  } else {
    // 不是组件就直接生成DOM
    mountNativeElement(nextVirtualDOM, container)
  }

}

// 生成函数组件， 原理就是执行函数组件的函数，该函数存储在 virtualDOM.type 上
function buildFunctionComponent (virtualDOM) {
  // 函数组件的参数props存储在 virtualDOM.props 中
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent (virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {})
  return component.render()
}