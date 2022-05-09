/* Note: when including RibbonTrigger directly, make sure you don't need the
 * shouldLimitToOncePerSession functionality.  Only RibbonTriggerContainer
 * supports it.  Exposing RibbonTrigger is an escape hatch to allow adding a
 * trigger (without the once-per-session limit check) to components that are
 * covered by unit tests that have no Redux store mocks and that therefore
 * would fail without extensive refactoring. */
export { RibbonTrigger } from './RibbonTrigger'
export { RibbonTriggerContainer } from './RibbonTriggerContainer'
export { RibbonIsAuthenticatedAttributeReporter } from './RibbonIsAuthenticatedAttributeReporter'
