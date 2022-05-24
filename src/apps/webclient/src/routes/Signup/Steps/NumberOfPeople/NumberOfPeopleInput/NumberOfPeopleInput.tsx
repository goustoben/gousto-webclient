import React from 'react'
import { Button, ButtonColorVariant, Icon, IconVariant } from '@gousto-internal/citrus-react'
import css from './NumberOfPeopleInput.css'

const MAXIMUM_NUMBER_OF_PEOPLE = 6 // per design

interface NumberOfPeopleInputProps {
  numberOfPeople: number
  onNumberOfPeopleChange: (numberOfPeople: number) => void
}

export const NumberOfPeopleInput = ({
  numberOfPeople,
  onNumberOfPeopleChange,
}: NumberOfPeopleInputProps) => {
  const shouldRenderDecrementButton = numberOfPeople > 1
  const shouldRenderIncrementButton = numberOfPeople < MAXIMUM_NUMBER_OF_PEOPLE

  return (
    <div className={css.numberOfPeopleInput}>
      {shouldRenderDecrementButton ? (
        <Button
          onClick={() => onNumberOfPeopleChange(numberOfPeople - 1)}
          colorVariant={ButtonColorVariant.Secondary}
          className={css.changeNumberButton}
        >
          <Icon name="remove" variant={IconVariant.Actionable} />
        </Button>
      ) : (
        <div className={css.buttonSpacing} />
      )}
      <div className={css.counterContainer}>
        <div className={css.numberOfPeopleCounter}>{numberOfPeople}</div>
        <p>{numberOfPeople > 1 ? 'people' : 'person'}</p>
      </div>
      {shouldRenderIncrementButton ? (
        <Button
          onClick={() => onNumberOfPeopleChange(numberOfPeople + 1)}
          colorVariant={ButtonColorVariant.Secondary}
          className={css.changeNumberButton}
        >
          <Icon name="add" variant={IconVariant.Actionable} />
        </Button>
      ) : (
        <div className={css.buttonSpacing} />
      )}
    </div>
  )
}
