const CONTAINER_ID = 'getHelpPreviousOrder'

export const selectHeader = () => cy.get(`[data-testing=${CONTAINER_ID}] h2`)

export const selectCTA = () => cy.get(`[data-testing=${CONTAINER_ID}] a`)
