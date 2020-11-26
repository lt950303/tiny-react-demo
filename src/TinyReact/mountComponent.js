import isFunction from './isFunction';
import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement';

export default function mountComponent (virtualDOM, container, oldDOM) {
  // 判断是 函数组件 还是 类组件：  通过判断对象是否有render 方法， 有就是类组件，反之函数组件
  let nextVirtualDOM = null
  let component = null
  if (isFunctionComponent(virtualDOM)) {
    console.log('函数组件');
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    console.log('类组件');
    nextVirtualDOM = buildClassComponent(virtualDOM)
    component = nextVirtualDOM.component
  }
  
  if(nextVirtualDOM == null) return // 防止为 null 后续函数执行报错
  // 函数组件返回的是否还是 组件？
  if (isFunction(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container, oldDOM)
  } else {
    // 不是组件就直接生成DOM
    mountNativeElement(nextVirtualDOM, container, oldDOM)
  }

  // 组件实例props存在 ref属性， 就将类组件 组件实例传递
  if (component) {
    component.componentDidMount()
    if(component.props && component.props.ref){
      component.props.ref(component)
    }
  }

  

}

// 生成函数组件， 原理就是执行函数组件的函数，该函数存储在 virtualDOM.type 上
function buildFunctionComponent (virtualDOM) {
  // 函数组件的参数props存储在 virtualDOM.props 中
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent (virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {})
  const nextVirtualDOM = component.render()
  nextVirtualDOM.component = component
  return nextVirtualDOM
}