import React from "react";

import { css } from "@emotion/react";

import {
  cssDisabled,
  cssInputRadioContainer,
  cssInputRadioLabel,
  cssInputRadioLabelChecked,
  cssInputRadioMask,
} from "./styles";

/**
 * TODO: This component should be replaced with one from Citrus component library
 */

type InputRadioProps = {
  children: React.ReactNode;
  id: string;
  name: string;
  value: string;
  isChecked: boolean;
  onChange: () => void;
  isDisabled?: boolean;
};

export const InputRadio = ({
  children,
  id,
  isDisabled,
  name,
  value,
  isChecked,
  onChange,
}: InputRadioProps) => (
  <label
    css={css(cssInputRadioContainer, isDisabled ? cssDisabled : null)}
    htmlFor={id}
  >
    <input
      id={id}
      type="radio"
      name={name}
      value={value}
      disabled={isDisabled}
      onChange={onChange}
      checked={isChecked}
    />
    <div css={css(cssInputRadioMask)} />
    <div
      css={css(
        cssInputRadioLabel,
        isChecked ? cssInputRadioLabelChecked : null
      )}
    >
      {children}
    </div>
  </label>
);
