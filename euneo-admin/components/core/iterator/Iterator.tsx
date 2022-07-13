// React&NextJS
import React from "react";
// Types
import { IteratorType } from "../../../types/types";
// Styles
import s from "./Iterator.module.scss";
import classnames from "classnames";
// Components
import { Icon } from "../icon/Icon";

const c = classnames.bind(s);

export const Iterator = ({
  label,
  children,
  disabled,
  icon,
  variant,
  width,
  height,
  ...props
}: IteratorType) => {
  const passProps: React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement> = { ...props };

  const childs = (
    <div className={s.iterator}>
      <div className={s.label}>
        {children}
        {label}
      </div>
      {variant === "icon" && (
        <div className={c(s.iconContainer)}>
          <Icon variant={icon} width={width} height={height} />
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
