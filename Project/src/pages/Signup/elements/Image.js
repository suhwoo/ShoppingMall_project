import React from 'react'
import styled from 'styled-components'

const Image = (props) => {
  const { width, height, borderRadius, src } = props
  return <_Image {...props} width={width} height={height} src={src} />
}

Image.defaultProps = {
  width: '200px',
  height: '100px',
  borderRadius: '0px',
  src:
    'https://s3-ap-northeast-1.amazonaws.com/bucketplace-v2-development/uploads/default_images/open_graph_icon_2.png',
}

const _Image = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
`
export default Image
