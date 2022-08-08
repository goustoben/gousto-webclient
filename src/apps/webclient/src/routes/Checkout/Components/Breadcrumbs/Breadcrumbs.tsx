import React, { useEffect, useState } from 'react'

import Link from 'Link'
import Svg from 'Svg'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'

import { trackCheckoutNavigationLinks } from 'actions/tracking'
import {
  Breadcrumbs as BreadcrumbsEnum,
  CHECKOUT_BREADCRUMBS,
  CheckoutStepIds,
} from 'routes/Checkout/checkoutConfig'

import css from './Breadcrumbs.css'

/**
 * Map of breadcrumb to step in checkout flow. User may visit different steps that belong to same breadcrumb.
 * That object allows tracking what proper step to return.
 */
type BreadcrumbsToSteps = {
  [key in BreadcrumbsEnum]?: CheckoutStepIds
}

type BreadcrumbsProps = {
  /**
   * Current step breadcrumb.
   */
  currentBreadcrumb: BreadcrumbsEnum
  /**
   * Breadcrumbs to step mapping define what exact step for a breadcrumb did user "choose".
   * E.g. for "/delivery" it can be both "Delivery" and "PayWithApplePay" steps. User selects one of them and that info
   * is stored within that mapping.
   */
  breadcrumbsToStepsMapping: BreadcrumbsToSteps
}

/**
 * Breadcrumbs component for Checkout component.
 * Previous steps user has already visited in checkout flow can be navigated to via breadcrumbs.
 */
const Breadcrumbs = ({ currentBreadcrumb, breadcrumbsToStepsMapping }: BreadcrumbsProps) => {
  const dispatch = useDispatch()
  /**
   * Furthest step breadcrumb user has ever reached.
   * Breadcrumbs before that step would be links to previous steps.
   * That would allow user to revisit previous steps and return to "furthest" via breadcrumbs links.
   */
  const [furthestBreadcrumbIndex, setFurthestBreadcrumbIndex] = useState<number>(0)

  useEffect(() => {
    const currentBreadcrumbIndex = CHECKOUT_BREADCRUMBS.indexOf(currentBreadcrumb)
    if (furthestBreadcrumbIndex < currentBreadcrumbIndex) {
      setFurthestBreadcrumbIndex(currentBreadcrumbIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBreadcrumb])

  const renderBreadcrumb = (breadcrumb: BreadcrumbsEnum, index: number) => {
    const stepId = breadcrumbsToStepsMapping[breadcrumb] as CheckoutStepIds // stepId serves as route to step

    const isFutureStepBreadcrumb = index > furthestBreadcrumbIndex

    return (
      <li key={breadcrumb} className={css.listItem}>
        {isFutureStepBreadcrumb ? (
          <span className={css.futureItem}>{breadcrumb}</span>
        ) : (
          <Link
            clientRouted
            to={`/check-out/${stepId}`}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            tracking={() => dispatch(trackCheckoutNavigationLinks(breadcrumb))}
            className={classNames(css.linkItem, {
              [css.isActive]: breadcrumb === currentBreadcrumb,
            })}
          >
            {breadcrumb}
          </Link>
        )}
        <Svg
          fileName="icon-chevron-small-right"
          className={classNames(css.breadcrumbsSeparator, {
            [css.hidden]: index === CHECKOUT_BREADCRUMBS.length - 1,
          })}
        />
      </li>
    )
  }

  return (
    <div className={css.breadcrumbsContainer}>
      <ul className={css.breadcrumbsList}>{CHECKOUT_BREADCRUMBS.map(renderBreadcrumb)}</ul>
    </div>
  )
}

export { Breadcrumbs }
