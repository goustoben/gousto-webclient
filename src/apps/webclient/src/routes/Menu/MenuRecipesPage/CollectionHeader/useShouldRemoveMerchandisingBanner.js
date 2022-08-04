import { useAuth } from '../../domains/auth/useAuth'
import { CollectionSlug } from '../../domains/collections'
import { useCollectionQuerySlug } from '../../domains/collections/internal/useCollectionQuerySlug'
import { useLocation } from '../../domains/collections/internal/useLocation'

export const useShouldRemoveMerchandisingBanner = () => {
  const { isAuthenticated } = useAuth()
  const slug = useCollectionQuerySlug()
  const { query } = useLocation()
  const isAdminQuery = query && query['preview[auth_user_id]']

  // a condition is formed according to the requirements of the epic https://gousto.atlassian.net/browse/TG-6191
  const shouldRemoveMerchandisingBanner =
    !isAdminQuery && !isAuthenticated && slug !== CollectionSlug.CalorieControlled

  return shouldRemoveMerchandisingBanner
}
