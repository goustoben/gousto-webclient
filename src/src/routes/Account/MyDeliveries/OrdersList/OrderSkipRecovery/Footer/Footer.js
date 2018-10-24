import PropTypes from 'prop-types'
import React from 'react'

import { ModalFooter } from 'ModalComponent'

import css from './Footer.css'

const propTypes = {
    callToActions: PropTypes.shape({
		confirm: PropTypes.string,
		keep: PropTypes.string,
	}),
    onClickKeepOrder: PropTypes.func,
    onClickSkipCancel: PropTypes.func,
}

const Footer = ({ orderType, callToActions, onClickKeepOrder, onClickSkipCancel }) => {
    let keepCopy
    let confirmCopy

    if (callToActions) {
        keepCopy = callToActions.keep
        confirmCopy = callToActions.confirm
    } else {
        keepCopy = 'Keep Box'
        confirmCopy = `${orderType === 'pending' ? 'Cancel' : 'Skip'} anyway`
    }

    return (
        <ModalFooter>
        <div className={css.skipAnyWay} onClick={() => onClickSkipCancel() }>
                {confirmCopy}
            </div>
            <button className={css.keepButton} onClick={() => onClickKeepOrder() }>
                {keepCopy}
            </button>
        </ModalFooter>
    )
}

Footer.propTypes = propTypes

export default Footer
