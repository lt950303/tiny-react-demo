export default function updateNodeElement (newElement, virtualDOM, oldVirtualDOM = {}) {
  const newProps = virtualDOM.props || {}
  const oldProps = oldVirtualDOM.props || {}

  Object.keys(newProps).forEach(propName => {
    const propValue = newProps[propName]
    const oldPropValue = oldProps[propName]
    // 判断新旧 props 是否相同
    if (propValue !== oldPropValue) {
      // 判断是否是 事件处理函数
      if (propName.slice(0, 2) === 'on') {
        // 注册事件
        const eventName = propName.toLocaleLowerCase().slice(2)
        newElement.addEventListener(eventName, propValue)
        newElement.removeEventListener(eventName, oldPropValue)
      }else if (propName === 'value' || propName === 'checked') {
        newElement[eventName] = propValue
      }else if (propName !== 'children') {
        if (propName === 'className') {
          newElement.setAttribute('class', propValue)
        } else {
          newElement.setAttribute(propName, propValue)
        }
      }
    }

  })

  // 判断 有删除的 props, 新的没有， 旧数据有。就是删除
  Object.keys(oldProps).forEach(propName => {
    const newPropValue = newProps[propName]
    const oldPropValue = oldProps[propName]
    // 判断新旧 props 是否相同
    if(!newPropValue) {
      // 判断是否是 事件处理函数
      if (propName.slice(0, 2) === 'on') {
        // 注册事件
        const eventName = propName.toLocaleLowerCase().slice(2)
        newElement.removeEventListener(eventName, oldPropValue)
      }else if (propName !== 'children') {
        newElement.removeAttribute(propName)
      }
    }
  })

}