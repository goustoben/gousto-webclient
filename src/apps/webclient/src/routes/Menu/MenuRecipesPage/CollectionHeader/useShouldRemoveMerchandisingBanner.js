import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useCollectionQuerySlug } from '../../domains/collections/internal/useCollectionQuerySlug'
import { useAuth } from '../../domains/auth/useAuth'
import { CollectionSlug } from '../../domains/collections'

export const useShouldRemoveMerchandisingBanner = () => {
  const { isAuthenticated } = useAuth()
  const slug = useCollectionQuerySlug()
  const isRemoveMerchandisingBannerWebEnabled = useIsOptimizelyFeatureEnabled(
    'beetroots_remove_merchandising_banner_web_enabled',
  )

  // a condition is formed according to the requirements of the epic https://gousto.atlassian.net/browse/TG-6191
  const shouldRemoveMerchandisingBanner =
    isRemoveMerchandisingBannerWebEnabled &&
    !isAuthenticated &&
    slug !== CollectionSlug.CalorieControlled

  return shouldRemoveMerchandisingBanner
}
