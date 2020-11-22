/**
 * 创建Vitrual Dom
 * @param {*} type 节点类型
 * @param {*} props 阶段属性
 * @param  {...any} children 子节点
 * 
 * 每次 babel 遇到 JSX 语法都会执行这个函数
 * 
 * 这个函数要做什么？
 * 1. 返回 js 描述的虚拟Dom 对象
 * 2. 将 JSX 中的 true、false、null、移除 
 * 3. 将文本节点描述为 { type: 'text', props: { textContent: 值 } }
 * 
 * 辅助知识点
 * 1. Array reduce 用法： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduce
 * 
 */

export default function createElement (type, props, ...children) {
  // 这里 ... 加不加是一样的
  const childElements = [].concat(...children).reduce((result, child) => {
    // 将 JSX 中的 true、false、null、移除 
    if(child !== false && child !== true && child !== null){
      if(child instanceof Object){
        // 如果是 非字符节点
        result.push(child)
      }else{
        // 如果是 字符节点
        result.push({ type: 'text', props: { textContent: child } })
      }
    }
    return result
  },[])
  return {
    type,
    // 为了 react 插槽： this.props.children
    props: Object.assign({ children:  childElements}, props),
    children: childElements
  }
}