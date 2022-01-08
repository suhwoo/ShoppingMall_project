import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Text } from './index'

const Input = (props) => {
  const { width, placeholder, onChange, borderColor } = props
  return (
    <Fragment>
      <_Input
        {...props}
        style={{
          fontSize: '15px',
          fontWeight: '500',
        }}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Fragment>
  )
}

Input.defaultProps = {
  placeholder: '',
  width: '100%',
  borderColor: '#cccccc',
  onChange: () => {},
}

const _Input = styled.input`
  width: ${(props) => props.width};
  padding: 14px;
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 8px;
  box-sizing: border-box;
`

export default Input
