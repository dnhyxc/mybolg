import React from 'react'
import OutSideRoot from './child'
import { List } from '../createElement/create'

const OutRoot = () => {
  return (
    <div>
      <p>我在 root 里面</p>
      <OutSideRoot>
        <h1>渲染在root外面</h1>
        {List}
      </OutSideRoot>
    </div>
  )
}

export default OutRoot