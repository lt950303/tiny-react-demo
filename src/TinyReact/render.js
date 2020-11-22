import diff from './diff'

export default function render (virtualDOM, container, oldDOM=container.firstChild) {
  // 比较节点差异
  diff(virtualDOM, container, oldDOM)
}