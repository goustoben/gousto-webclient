import React, { PropTypes } from 'react'

import { ModalContent } from 'ModalComponent'
import css from './ValueProposition'

const ValueProposition = ({ featureFlag, valueProposition }) => (
    (featureFlag && valueProposition)
    ? (
        <ModalContent>
            <div className={css.title}>{title}</div>
            <div className={css.message}>{message}</div>
        </ModalContent>
    ) : null
)

ValueProposition.prototype = {
    featureFlag: PropTypes.boolean,
    valueProposition: PropTypes.shapes({
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    })
}

ValueProposition.defaultProps = {
    valueProposition: {
        title: 'Not in on your delivery date?',
        message: 'Change your delivery day easily for any box you can choose recipes for.',
    }
}

export default ValueProposition
