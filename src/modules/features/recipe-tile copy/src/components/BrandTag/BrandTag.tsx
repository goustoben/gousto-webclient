import React from 'react'
import { useRecipeBrandTag } from './useRecipeBrandTag'
import css from './BrandTag.css'

const BrandTag = (props: any) => {
  const brandTag = useRecipeBrandTag()

  if (!brandTag) {
    return null
  }

  const { theme, text } = brandTag

  return (
    <div className={css.brandTag} style={{ color: theme?.color }}>
      {text}
    </div>
  )
}

export { BrandTag }
