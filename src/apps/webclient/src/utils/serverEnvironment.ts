import { canUseWindow } from 'utils/browserEnvironment'

export const isServer = () => !canUseWindow()
