import { Button as MuiButton, CircularProgress } from '@mui/material'


const Button = ({
  innerRef,
  loading,
  children,
  disabled,
  size = 'small',
  ...rest
}) => {
  const isSmall = size === 'small'

  return (
    <MuiButton ref={innerRef} disabled={loading || disabled} {...rest} size={size}>
      {loading ? <CircularProgress size={isSmall ? 20 : 24} color="inherit" /> : children}
    </MuiButton>
  )
}

export default Button
