export default function updateNodeElement (newElement, virtualDOM) {
  const newProps = virtualDOM.props

  Object.keys(newProps).forEach(propName => {
    const propValue = newProps[propName]
    // 判断是否是 事件处理函数
    if (propName.slice(0, 2) === 'on') {
      // 注册事件
      const eventName = propName.toLocaleLowerCase().slice(2)
      newElement.addEventListener(eventName, propValue)
    }else if (propName === 'value' || propName === 'checked') {
      newElement[eventName] = propValue
    }else if (propName !== 'children') {
      if (propName === 'className') {
        newElement.setAttribute('class', propValue)
      } else {
        newElement.setAttribute(propName, propValue)
      }
    }
  })

}