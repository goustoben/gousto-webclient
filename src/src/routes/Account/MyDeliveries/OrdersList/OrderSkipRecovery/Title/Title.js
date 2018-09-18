import React, { Prototype } from 'react'

import { ModalTitle } from 'ModalComponent'

import css from './Title'

const Title = ({ title, orderType }) => {
    const titleCopy = title || `Are you sure you want to ${(orderType === 'pending') ? 'cancel' : 'skip'}?`

    return (
        <ModalTitle>
            <div className={css.title}>
                {titleCopy}
            </div>
        </ModalTitle>
    )
}

Title.prototype = {
    title: Prototype.string.isRequired,
    orderType: Prototype.string.isRequired,
}

Title.defaultProps = {
    title: '',
    orderType: '',
}


export default Title
