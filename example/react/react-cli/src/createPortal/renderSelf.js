import React from 'react'
import { createPortal } from 'react-dom'

const List = React.createElement('h1', { className: 'test_portal' }, '使用createPortal渲染在指定容器中')

const RenderSelf = () => {
  const wrap = document.createElement('div')
  wrap.className = 'container'
  document.body.appendChild(wrap)

  return (
    createPortal(List, wrap)
  )
}

export default RenderSelf
