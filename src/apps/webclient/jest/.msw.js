import { setupServer } from 'msw/node'
import { handlers as sideHandlers } from '../src/routes/Menu/apis/sides.hook.mock'
import { handlers as pricingHandlers } from 'routes/Menu/domains/pricing/usePricing.mock.js'

const handlers = [...sideHandlers, ...pricingHandlers];

export const server = setupServer(...handlers)
