import React from "react";
import styled from "@emotion/styled";

import { useRecipeBrandHook } from "../../model/context/useRecipeBrand";
import { cssBrandTag } from "./styles";

const StyledDiv = styled.div({...cssBrandTag, label: '-BrandTag'} as any);

export const BrandTag = () => {
  const useRecipeBrand = useRecipeBrandHook();
  const { useRecipeBrandTag } = useRecipeBrand();
  const brandTag = useRecipeBrandTag();

  if (!brandTag) {
    return null;
  }

  const { theme, text } = brandTag;

  return <StyledDiv style={{ color: theme?.color }}>{text}</StyledDiv>;
};
