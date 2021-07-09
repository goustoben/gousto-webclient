import React from 'react'
import { Heading, Card, CTA } from 'goustouicomponents'
import GoustoLink from 'Link'
import css from './NoNextOrder.css'

const NoNextOrder = () => (
  <div>
    <Heading size="fontStyleM" type="h2">
      Upcoming delivery
    </Heading>
    <Card>
      <p className={css.subtitle}>No scheduled deliveries</p>
      <GoustoLink to="/menu">
        <CTA
          isFullWidth
          variant="secondary"
          size="small"
          onClick={() => {}}
        >
          View this week’s menu
        </CTA>
      </GoustoLink>
    </Card>
  </div>
)
export { NoNextOrder }
