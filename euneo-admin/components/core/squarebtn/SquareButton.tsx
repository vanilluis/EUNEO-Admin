// React&NextJS
import React from "react";
// Types
import { SquareButtonType } from "../../../types/types";
// Styles
import s from "./SquareButton.module.scss";
import classnames from "classnames";
// Components
import { Icon } from "../icon/Icon";
import { Text } from "../text/Text";

const c = classnames.bind(s);

export const SquareButton = ({
  label,
  children,
  disabled,
  icon,
  variant,
  width,
  height,
  color,
  ...props
}: SquareButtonType) => {
  const passProps: React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement> = { ...props };

  const childs = (
    <div className={c(s.squarebtn, color && s[color])}>
      {variant === "icon" && (
        <div className={c(s.iconContainer)}>
          <Icon variant={icon} width={width} height={height} />
        </div>
      )}
      {variant === "text" && (
        <div className={c(s.textContainer)}>
          <Text variant="date">{label}</Text>
          {icon && <Icon variant={icon} width="16" height="16" />}
        </div>
      )}
    </div>
  );

  return (
    <button {...passProps} disabled={disabled} aria-disabled={disabled}>
      {childs}
    </button>
  );
};
