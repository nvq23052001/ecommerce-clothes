import { CircularProgress } from '@mui/material'
import './index.scss'


const Loading = ({ className, fullScreen, style, small }) => {
  return (
    <div
      style={style}
      className={`Loading-container${small ? ' small' : ''} ${fullScreen && 'full'} ${className}`}
    >
      <CircularProgress size={small ? 34 : 50} color="primary" />
    </div>
  )
}

export default Loading
