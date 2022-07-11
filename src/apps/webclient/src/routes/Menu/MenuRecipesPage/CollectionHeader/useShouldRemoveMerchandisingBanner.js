import { useAuth } from '../../domains/auth/useAuth'
import { CollectionSlug } from '../../domains/collections'
import { useCollectionQuerySlug } from '../../domains/collections/internal/useCollectionQuerySlug'

export const useShouldRemoveMerchandisingBanner = () => {
  const { isAuthenticated } = useAuth()
  const slug = useCollectionQuerySlug()

  // a condition is formed according to the requirements of the epic https://gousto.atlassian.net/browse/TG-6191
  const shouldRemoveMerchandisingBanner =
    !isAuthenticated && slug !== CollectionSlug.CalorieControlled

  return shouldRemoveMerchandisingBanner
}
