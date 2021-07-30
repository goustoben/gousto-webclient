import { setupServer } from 'msw/node'
import { handlers as sideHandlers } from '../src/routes/Menu/apis/sides.hook.mock'

const handlers = [...sideHandlers];

export const server = setupServer(...handlers)
