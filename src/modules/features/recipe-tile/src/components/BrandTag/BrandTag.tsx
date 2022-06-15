import React from 'react'

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { useRecipeBrandHook } from '../../model/context/useRecipeBrand';
import { cssBrandTag } from './styles';

export const BrandTag = () => {
  const useRecipeBrand = useRecipeBrandHook()
  const { useRecipeBrandTag } = useRecipeBrand()
  const brandTag = useRecipeBrandTag()

  if (!brandTag) {
    return null
  }

  const { theme, text } = brandTag

  return (
    <div
      css={css(cssBrandTag)}
      style={{ color: theme?.color }}
    >
      {text}
    </div>
  )
}
