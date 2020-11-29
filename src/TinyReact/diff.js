import createDOMElement from './createDOMElement'
import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
import unmountElement from './unmountElement'
import diffComponent from './diffComponent'
import unmount from './unmount'

export default function diff (virtualDOM, container, oldDOM) {
  let oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  let oldComponent = oldVirtualDOM && oldVirtualDOM.component  
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

    let hasKey = false
    let keyedElements = {}
    oldDOM.childNodes && oldDOM.childNodes.forEach(oldChild => {
      if (oldChild.nodeType === 1) {
        let key = oldChild.getAttribute('key')
        if(key){
          hasKey = true
          keyedElements[key] = oldChild
        }
      } 
    })
    // console.log(hasKey, keyedElements);
    if(hasKey){
      virtualDOM.children && virtualDOM.children.forEach((child, i) => {
        let key = child.props.key
        let domElement = keyedElements[key]
        
        if(key && domElement){
          if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
            // 元素位置发生了变化
            // 将 domElement 插入到当前元素位置的前面 oldDOM.childNodes[i] 就是当前位置
            // domElement 就被放入了当前位置
            // 不仅换还要比较两个的差异
            oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
            diff(child, oldDOM,domElement)
          }else{
            diff(child, oldDOM,domElement)
          }
        }else{
          mountElement(child, oldDOM, oldDOM.childNodes[i])
        }
      })
    }else {
      // 将子节点遍历处理
      virtualDOM.children && virtualDOM.children.forEach((child, i) => {
        diff(child, oldDOM, oldDOM.childNodes[i])
      })
    }

    // const oldChildNodes = oldDOM.childNodes
    //   // 将多余的节点删除  这是没有 key 的方案
    //   if (virtualDOM.children && oldChildNodes.length > virtualDOM.children.length) {
        
    //     // 倒序删除
    //     for (let index = oldChildNodes.length-1 ; index > virtualDOM.children.length - 1; index--) {
    //       unmountElement(oldChildNodes[index])
    //     }
    //   } 

      // 获取就节点的数量
      let oldChildNodes = oldDOM.childNodes
      // 如果旧节点的数量多于要渲染的新节点的长度
      if (oldChildNodes && virtualDOM.children && oldChildNodes.length > virtualDOM.children.length) {
        if (hasKey) {
          for (
            let i = oldChildNodes.length - 1;
            i >= virtualDOM.children.length;
            i--
          ) {
            oldDOM.removeChild(oldChildNodes[i])
          }
        } else {
          for (let i = 0; i < oldChildNodes.length; i++) {
            let oldChild = oldChildNodes[i]
            let oldChildKey = oldChild._virtualDOM.props.key
            let found = false
            for (let n = 0; n < virtualDOM.children.length; n++) {
              if (oldChildKey === virtualDOM.children[n].props.key) {
                found = true
                break
              }
            }
            if (!found) {
              unmount(oldChild)
              i--
            }
          }
        }
      }

    

  } else if (virtualDOM && typeof virtualDOM.type === 'function') {
    // 是组件的情况
    diffComponent(virtualDOM, oldComponent, oldDOM, container)

  } else if(oldVirtualDOM && virtualDOM.type !== oldVirtualDOM.type && typeof oldVirtualDOM.type !== 'function') {
    // 节点类型不同， 并且不是 组件
    // mountElement(virtualDOM, container)  // 为啥不用这个呢？  因为是替换节点，而不是新增挂载节点
    const newELement = createDOMElement(virtualDOM)
    // 新dom替换旧dom
    oldDOM.parentNode.replaceChild(newELement, oldDOM)

  }
}