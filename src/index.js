import TinyReact from './TinyReact'

const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2>(编码必杀技)</h2>
    <div title="55555">
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3 name="55555">(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容<h1>hehheehh</h1></span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h1>这个将会被删除</h1>  
    2, 3 <input placeholder="请输人" />
  </div>
)

const newVirtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2>(编码必杀技)</h2>
    <div title="44444">
      嵌套1<div>嵌套 1.1</div>
    </div>
    <h3 >(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <button onClick={() => alert("你好!!!!")}>点击我</button>
  </div>
)

// TinyReact.render(virtualDOM,  document.getElementById('root'))
// setTimeout(() => {
//   TinyReact.render(newVirtualDOM,  document.getElementById('root'))
// }, 1500)

const Hello = () => {
  return <h1>Hello</h1>
}

const Heart = (props) => {
  return <div>
    <h1>{props.title}&hearts;</h1>
    {/* <Hello/> */}
  </div>
}

// TinyReact.render(<Heart title="Hello-LT" />,  document.getElementById('root'))

class Alert extends TinyReact.Component {
  constructor(props){
    super(props)
    this.state = {
      title: 'default-title'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({
      title: 'changed-----title'
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
  }
  componentDidUpdate(prevProps, preState) {
    console.log('componentDidUpdate');
  }

  render () {
    console.log(this.state.title);
    return <div>
      <div>{this.props.name}</div>
      <div>{this.props.age}</div>
      <div>state: {this.state.title}</div>
      <button onClick={this.handleClick}> 点我改变标题 </button>
    </div>
  }
}
// TinyReact.render(<Alert name="Hello-LT" age="25" />,  document.getElementById('root'))
// setTimeout(()=>{
//   TinyReact.render(<Alert name="world-Tng" age="99" />,  document.getElementById('root'))
//   // TinyReact.render(<Heart title="Hello-LT" />,  document.getElementById('root'))
// },1500)



class DemoRef extends TinyReact.Component {
  handle() {
    let value = this.input.value
    console.log(value)
    console.log(this.alert)
  }
  componentDidMount() {
    console.log("componentDidMount")
  }
  render() {
    return (
      <div>
        <input type="text" ref={input => (this.input = input)} />
        <button onClick={this.handle.bind(this)}>按钮</button>
        <Alert ref={alert => (this.alert = alert)} name="world-Tng" age="99" />
      </div>
    )
  }
}

TinyReact.render(<DemoRef name="Hello-LT" age="25" />,  document.getElementById('root'))