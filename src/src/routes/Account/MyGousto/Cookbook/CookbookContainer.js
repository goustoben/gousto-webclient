import { connect } from 'react-redux'
import { Cookbook } from './Cookbook'

const mapStateToProps = (state) => ({
})

export const CookbookContainer = connect(mapStateToProps)(Cookbook)
