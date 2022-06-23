import React, { SyntheticEvent } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { useBasketHook } from "../../model/context/useBasket";
import { useSetBrowserCTAVisibilityHook } from "../../model/context/useSetBrowserCTAVisibility";
import { getRecipeButtonProps } from "./recipeButtonPropsSelector";
import {
  cssAddButton,
  cssButtonText,
  cssHideOnMobile,
  cssRemoveButton,
  cssAddButtonLine,
  cssRemoveButtonLine,
} from "./styles";

const buttonClassNameToStyle = (
  key: ReturnType<typeof getRecipeButtonProps>["buttonClassName"]
) =>
  ({
    addButton: cssAddButton,
    removeButton: cssRemoveButton,
  }[key] || cssAddButton);

const lineClassNameToStyle = (
  key: ReturnType<typeof getRecipeButtonProps>["lineClassName"]
) =>
  ({
    addButtonLine: cssAddButtonLine,
    removeButtonLine: cssRemoveButtonLine,
  }[key] || cssAddButton);

const Button = styled.button(
  (props: any) =>
    buttonClassNameToStyle(props.buttonProps.buttonClassName) as any
);
const Container = styled.span(cssButtonText as any);
const Line = styled.line(
  (props: any) => lineClassNameToStyle(props.buttonProps.lineClassName) as any
);
const ButtonText = styled.span(cssHideOnMobile as any);

export const AddRecipeButton: React.FC<{ recipeId: string }> = ({
  recipeId,
}) => {
  const useBasket = useBasketHook();
  const {
    canAddRecipes,
    addRecipe,
    removeRecipe,
    reachedLimit,
    isRecipeInBasket,
  } = useBasket();
  const useSetBrowserCTAVisibility = useSetBrowserCTAVisibilityHook();
  const { setBrowserCTAVisible } = useSetBrowserCTAVisibility();
  const isInBasket = isRecipeInBasket(recipeId);
  const disabled = reachedLimit && !isInBasket;

  const buttonProps = getRecipeButtonProps(isInBasket);

  const buttonAction: React.EventHandler<SyntheticEvent<unknown>> = (e) => {
    e.stopPropagation();

    if (!canAddRecipes) {
      setBrowserCTAVisible();

      return;
    }

    if (isInBasket) {
      removeRecipe(recipeId);
    } else {
      addRecipe(recipeId);
    }
  };

  const buttonKeyPressAction: React.KeyboardEventHandler = (e) => {
    e.stopPropagation();

    if (e.keyCode === 13) {
      buttonAction(e);
    }
  };

  return (
    <Button
      buttonProps={buttonProps}
      name="addRecipeButton"
      type="button"
      disabled={disabled}
      onClick={buttonAction}
      onKeyPress={buttonKeyPressAction}
      data-testing={disabled ? "menuRecipeAddDisabled" : "menuRecipeAdd"}
      aria-label={buttonProps.buttonText}
    >
      <Container>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Line
            buttonProps={buttonProps}
            y1="7"
            x2="14"
            y2="7"
            strokeWidth="2"
          />
          {!isInBasket && (
            <line x1="7" y1="14" x2="7" stroke="white" strokeWidth="2" />
          )}
        </svg>
        <ButtonText>{buttonProps.buttonText}</ButtonText>
      </Container>
    </Button>
  );
};

AddRecipeButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
};
