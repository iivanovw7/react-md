/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import {
  InteractionStatesOptions,
  useInteractionStates,
} from "@react-md/states";

import buttonThemeClassNames, {
  ButtonThemeProps,
} from "./buttonThemeClassNames";

/**
 * This interface includes all the props that the `Button` component accepts so
 * the main use case might be creating a functionality wrapper for the `Button`
 * component, but passes all props down as normal.
 */
export interface ButtonProps
  extends ButtonThemeProps,
    ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<InteractionStatesOptions<HTMLButtonElement>, "disableSpacebarClick"> {
  /**
   * The button's type attribute. This is set to "button" by default so that
   * forms are not accidentally submitted when this prop is omitted since
   * buttons without a type attribute work as submit by default.
   */
  type?: "button" | "reset" | "submit";

  /**
   * Any children to render within the button. This will normally just be text
   * or an icon.
   *
   * Please note that it is considered invalid html to have a `<div>` as a
   * descendant of a `<button>`.
   */
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    type = "button",
    disabled = false,
    theme = "clear",
    themeType = "flat",
    buttonType = "text",
    className: propClassName,
    children,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    enablePressedAndRipple: propEnablePressedAndRipple,
    ...props
  },
  ref
) {
  const enablePressedAndRipple =
    typeof propEnablePressedAndRipple === "boolean"
      ? propEnablePressedAndRipple
      : themeType === "contained";

  const { ripples, className, handlers } = useInteractionStates({
    handlers: props,
    className: buttonThemeClassNames({
      theme,
      themeType,
      buttonType,
      disabled,
      className: propClassName,
    }),
    disabled,
    disableRipple,
    disableProgrammaticRipple,
    rippleTimeout,
    rippleClassNames,
    rippleClassName,
    rippleContainerClassName,
    enablePressedAndRipple,
  });

  return (
    <button
      {...props}
      {...handlers}
      ref={ref}
      type={type}
      className={className}
      disabled={disabled}
    >
      {children}
      {ripples}
    </button>
  );
});

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Button.propTypes = {
      type: PropTypes.oneOf(["button", "reset", "submit"]),
      className: PropTypes.string,
      theme: PropTypes.oneOf([
        "clear",
        "primary",
        "secondary",
        "warning",
        "error",
      ]),
      themeType: PropTypes.oneOf(["flat", "outline", "contained"]),
      buttonType: PropTypes.oneOf(["text", "icon"]),
      disabled: PropTypes.bool,
      children: PropTypes.node,
      disableRipple: PropTypes.bool,
      disableProgrammaticRipple: PropTypes.bool,
      rippleTimeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          appear: PropTypes.number,
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
      rippleClassNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          appear: PropTypes.string,
          appearActive: PropTypes.string,
          enter: PropTypes.string,
          enterActive: PropTypes.string,
          enterDone: PropTypes.string,
          exit: PropTypes.string,
          exitActive: PropTypes.string,
          exitDone: PropTypes.string,
        }),
      ]),
      rippleClassName: PropTypes.string,
      rippleContainerClassName: PropTypes.string,
      enablePressedAndRipple: PropTypes.bool,
    };
  } catch (e) {}
}

export default Button;
