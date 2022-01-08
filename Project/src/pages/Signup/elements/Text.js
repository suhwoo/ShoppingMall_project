import React from 'react'
import styled from 'styled-components'

const Text = (props) => {
  const { children, weight, margin, size, color, underline, onClick } = props

  const styles = { weight, margin, size, color, underline }

  return (
    <P onClick={onClick} {...styles}>
      {children}
    </P>
  )
}

Text.defaultProps = {
  underline: false,
  weight: '',
  margin: '0px',
  size: '14px',
  color: '#333333',
  onClick: () => {},
}

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  margin: ${(props) => props.margin};
  text-decoration: ${(props) => (props.underline ? `underline` : '')};
`
export default Text
