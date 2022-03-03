import { createPortal } from 'react-dom'

const OutSideRoot = (props) => {
  const wrap = document.createElement('div')
  wrap.setAttribute('id', 'portal')
  document.body.appendChild(wrap)

  return (
    createPortal(<>{props.children}</>, wrap)
  )
}

export default OutSideRoot

/**
 * ReactDOM.createPortal(child, container)
 */