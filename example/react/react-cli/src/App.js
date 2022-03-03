import OutRoot from "./createPortal";
import CreateElement from './createElement/index'
import RenderSelf from './createPortal/renderSelf'

const App = () => {
  return (
    <div>
      <CreateElement />
      <OutRoot />
      <RenderSelf />
    </div>
  )
}

export default App