import React, { Prototype } from 'react'

import { ModalFooter } from 'ModalComponent'

const Footer = ({ callToActions, onClickKeepOrder, onClickSkipCancel }) => {
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
            <button className={css.keepButton} onClick={() => onClickKeepOrder}>
                {keepCopy}
            </button>
            <div className={css.skipAnyWay} onClick={() => onClickSkipCancel}>
                {confirmCopy}
            </div>
        </ModalFooter>
    )
}

Footer.prototype = {
    callToActions: PropTypes.shape({
		confirm: PropTypes.string,
		keep: PropTypes.string,
	}),
    onClickKeepOrder: Prototype.func,
    onClickSkipCancel: Prototype.func,
}

export default Footer
