import diff from './diff'
export default class Component {
  constructor(props){
    this.props = props

  }

  setState (state) {
    this.state = Object.assign({}, this.state, state)
    const virtualDom = this.render()
    // 获取旧 DOM
    const oldDom = this.getDom(oldDom)
    // 获取 组件容器
    const container = oldDom.parentNode
    // 比较新旧 dom
    diff(virtualDom, container, oldDom)
    
  }

  // 在 mountNativeElement 方法中调用，从而设置此组件的dom
  setDom (dom) {
    this.dom = dom
  }

  getDom (dom) {
    return this.dom
  }
}