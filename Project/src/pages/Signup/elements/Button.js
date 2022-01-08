import React from 'react'
import styled from 'styled-components'
const Button = (props) => {
  const {
    bgColor,
    width,
    padding,
    children,
    fontColor,
    onClick,
    onMouseOver,
    onMouseLeave,
  } = props
  return (
    <_Button
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      {...props}
      onClick={onClick}
    >
      {children}
    </_Button>
  )
}

Button.defaultProps = {
  bgColor: '#35c4ef',
  width: '100%',
  fontColor: 'white',
  onClick: () => {},
  onMouseOver: () => {},
  onMouseLeave: () => {},
}

const _Button = styled.button`
  width: ${(props) => props.width};
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};
  box-sizing: border-box;
  border: 2px solid #35c4ef;
  border-radius: 8px;
`

export default Button
