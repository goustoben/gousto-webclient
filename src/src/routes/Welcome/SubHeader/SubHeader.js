import PropTypes from 'prop-types'
import React from 'react'
import SectionHeader from 'SectionHeader'
import Content from 'containers/Content'

const SubHeader = ({ nameFirst, message, contentKeys }) => (
  <Content
    contentKeys={contentKeys}
    propNames="title"
  >
    <SectionHeader title={`Thanks ${nameFirst},`} contentSizeMax="LG" >
      <p>{message}</p>
    </SectionHeader>
  </Content>

)

SubHeader.propTypes = {
  contentKeys: PropTypes.string.isRequired,
  nameFirst: PropTypes.string.isRequired,
  message: PropTypes.string,
}

SubHeader.defaultProps = {
  message: 'You’ve just made your first step towards a life with more free time, better food and less hassle than ever before. Let the good times roll!',
}

export default SubHeader
