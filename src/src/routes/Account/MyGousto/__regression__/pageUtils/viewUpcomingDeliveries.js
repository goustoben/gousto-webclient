const CONTAINER_ID = 'viewUpcomingDelivery'
const CTA_CONTAINER_ID = 'myGoustoNextBoxHelpCTA'
const NO_NEXT_ORDER_ID = 'noNextOrder'

export const selectHeader = () => cy.get(`[data-testing=${CONTAINER_ID}] h2`)

export const selectCTA = () => cy.get(`[data-testing=${CTA_CONTAINER_ID}]`)

export const selectNoNextOrder = () => cy.get(`[data-testing=${NO_NEXT_ORDER_ID}] p`)

export const selectNoNextOrderCTA = () => cy.get(`[data-testing=${NO_NEXT_ORDER_ID}] a`)
