import PropTypes from 'prop-types'
import React from 'react'

import config from 'config'
import Svg from 'Svg'

import classNames from 'classnames'

import { connect } from 'react-redux'
import css from './ErrorPage.css'

const errors = {
  403: {
    title: "Something's Fishy",
    subTitle: "You're not able to see the page you have requested",
    svg: 'icon-gousto-iso',
  },
  404: {
    title: 'Oh crumbs!',
    subTitle: "We can't find the page you're looking for. Please try again or get in touch with our Customer Care team.",
    svg: 'icon-gousto-iso',
  },
  500: {
    title: 'Oh crumbs!',
    subTitle: "That wasn't meant to happen. Please try again or get in touch with our Customer Care team.",
    svg: 'icon-gousto-iso',
  },
}

const ErrorPage = ({ status }) => {
  const httpStatus = errors[status] ? status : '404'
  const page = errors[httpStatus]

  return (<div className={css.container}>
    <div className={css.row}>
      <div className={css.errorWrapSmall}>
        <div className={css.row}>
          <h1 className={css.textHeading}>{page.title}</h1>
          <h2 className={css.description}>{page.subTitle}</h2>
          <h3 className={css.descriptionSM}>Please try again or contact our customer care team.</h3>
          <h2 className={css.contact}>
            <a href={`tel:${config.company.telephone.link}`} className={classNames(css.contactLink, css.phoneNumber)}>
              <span className={css.iconEarphone}></span>
              {config.company.telephone.number}
            </a>
            <a href={`mailto:${config.company.email}`} className={css.contactLink}>
              <Svg fileName="icon-email" className={css.email} />
              {config.company.email}
            </a>
          </h2>
        </div>
        <div className={css.row}>
          <Svg fileName={page.svg} className={css.goustoIsotype} />
        </div>
      </div>
    </div>
          </div>)
}

ErrorPage.propTypes = {
  status: PropTypes.string,
}

ErrorPage.defaultProps = {
  status: '404',
}

const mapStateToProps = (state) => (
  {
    status: state.serverError,
  }
)

export default connect(mapStateToProps, {})(ErrorPage)
