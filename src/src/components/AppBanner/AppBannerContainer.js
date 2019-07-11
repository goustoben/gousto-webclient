import { connect } from 'react-redux'
import { AppBanner } from './AppBanner'

const mapStateToProps = () => ({ appTitle: 'Gousto for iOS', rating: 4.6 })

const AppBannerContainer = connect(mapStateToProps, {})(AppBanner)

export { AppBannerContainer }
