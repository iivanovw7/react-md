import React, { forwardRef } from "react";
import { Button, ButtonProps } from "@react-md/button";

import useActionClassName, {
  AppBarActionClassNameProps,
} from "./useActionClassName";

export interface AppBarActionProps
  extends ButtonProps,
    AppBarActionClassNameProps {}

/**
 * This component is really just a simple wrapper for the `Button` component
 * that adds a few additional styles to prevent the button from shrinking when
 * an `AppBar` has a lot of content.  It also will automatically add spacing
 * either before or after this button when the `first` or `last` props are
 * provided.
 */
const AppBarAction = forwardRef<HTMLButtonElement, AppBarActionProps>(
  function AppBarAction(
    {
      className,
      first = false,
      last = false,
      children,
      inheritColor,
      buttonType = "icon",
      theme = "clear",
      ...props
    },
    ref
  ) {
    return (
      <Button
        {...props}
        buttonType={buttonType}
        theme={theme}
        ref={ref}
        className={useActionClassName({ first, last, inheritColor, className })}
      >
        {children}
      </Button>
    );
  }
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    AppBarAction.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      first: PropTypes.bool,
      last: PropTypes.bool,
      buttonType: PropTypes.oneOf(["text", "icon"]),
      theme: PropTypes.oneOf([
        "primary",
        "secondary",
        "warning",
        "error",
        "clear",
      ]),
      inheritColor: PropTypes.bool,
    };
  } catch (e) {}
}

export default AppBarAction;
