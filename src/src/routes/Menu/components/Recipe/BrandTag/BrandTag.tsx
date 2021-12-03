import React from 'react'
import { useRecipeBrandTag } from 'routes/Menu/context/recipeContext'

import css from './BrandTag.module.css'

const BrandTag: React.FC = () => {
  const brandTag = useRecipeBrandTag()

  if (!brandTag) {
    return null
  }

  const { theme, text } = brandTag

  return (
    <div className={css.brandTag} style={{ color: theme.color }}>
      {text}
    </div>
  )
}

export { BrandTag }
