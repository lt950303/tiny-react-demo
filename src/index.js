import TinyReact from './TinyReact'

const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2>(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容<h1>hehheehh</h1></span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h3>这个将会被删除</h3>  
    2, 3 <input placeholder="请输人" />
  </div>
)

const newVirtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2>(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段修改后的内容！！！！！<h1>hhahahahhh</h1></span>
    <button onClick={() => alert("你好!!!!")}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
  </div>
)

TinyReact.render(virtualDOM,  document.getElementById('root'))
setTimeout(() => {
  TinyReact.render(newVirtualDOM,  document.getElementById('root'))
}, 1500)

const Hello = () => {
  return <h1>Hello</h1>
}

const Heart = (props) => {
  return <div>
    <h1>{props.title}&hearts;</h1>
    <Hello/>
  </div>
}

// TinyReact.render(<Heart title="Hello-LT" />,  document.getElementById('root'))

class Alert extends TinyReact.Component {
  constructor(props){
    super(props)
  }

  render () {
    return <div>
      <div>{this.props.name}</div>
      <div>{this.props.age}</div>
    </div>
  }
}
// TinyReact.render(<Alert name="Hello-LT" age="25" />,  document.getElementById('root'))