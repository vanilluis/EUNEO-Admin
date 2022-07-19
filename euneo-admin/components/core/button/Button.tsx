// React&NextJS
import React from "react";
import NextLink from "next/link"; // alias of Link
// Types
import { ButtonType } from "../../../types/types";
// Styles
import s from "./Button.module.scss";
import classnames from "classnames";
// Components
import { Icon } from "../icon/Icon";

const c = classnames.bind(s);

export const Button = ({
  invert,
  mirror,
  noPadd,
  label,
  arrowDirection,
  children,
  to,
  disabled,
  icon,
  className,
  variant,
  ...props
}: ButtonType) => {
  const passProps: React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement> = { ...props };
  const isExternal = to && /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(to || "");

  passProps.className = c(
    s[variant],
    s[disabled && "disabled"],
    s[invert && variant + "__invert"],
    s[mirror && variant + "__mirror"],
    s[noPadd && variant + "__noPadd"],
    className
  );

  const childs = (
    <>
      <div className={s.label}>
        {children}
        {label}
      </div>
      {variant === "arrow" && (
        <div
          className={c(
            s[invert ? "arrowContainer__invert" : "arrowContainer"],
            s[arrowDirection]
          )}
        >
          {icon ? <Icon variant={icon} /> : <Icon variant="arrow" />}
        </div>
      )}
      {variant === "arrowL" && (
        <div className={c(s[arrowDirection])}>
          {icon ? <Icon variant={icon} /> : <Icon variant="arrowL" />}
        </div>
      )}
      {variant === "ticker" && (
        <div className={s.ticker}>
          <Icon
            variant={`ticker-${icon as "increase" | "decrease"}`}
            width="24"
            height="24"
          />
        </div>
      )}
      {variant === "icon" && (
        <div className={c(s.iconContainer, s[arrowDirection])}>
          <Icon variant={icon} />
        </div>
      )}
    </>
  );

  if (isExternal) {
    return (
      <a target="_blank" rel="noopener noreferrer" href={to} {...passProps}>
        {childs}
      </a>
    );
  }

  if (to) {
    return (
      <NextLink href={to}>
        <a {...passProps}>{childs}</a>
      </NextLink>
    );
  }

  return (
    <button {...passProps} disabled={disabled} aria-disabled={disabled}>
      {childs}
    </button>
  );
};

Button.defaultProps = {
  variant: "default",
  arrowDirection: "r",
};
