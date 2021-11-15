import { setupServer } from 'msw/node'
import { handlers as sideHandlers } from 'routes/Menu/apis/sides.hook/sides.hook.mock'

const handlers = [...sideHandlers];

export const server = setupServer(...handlers)
