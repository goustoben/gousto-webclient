import StyledElement from 'StyledElement'

export const Col = (props) => StyledElement({ ...props, type: 'div' })

export const Row = (props) => StyledElement({ ...props, row: true, type: 'div' })

export default {
  Col,
  Row,
}

