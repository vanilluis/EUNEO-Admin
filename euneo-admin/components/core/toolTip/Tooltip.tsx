// React&NextJS
import React from "react";
// Types
import { TooltipType } from "../../../types/types";
// Styles
import s from "./Tooltip.module.scss";
import classnames from "classnames";
// Components
import { Icon } from "../icon/Icon";
import { Text } from "../text/Text";

const c = classnames.bind(s);

export const Tooltip = ({
  disabled,
  text,
  className,
  clicked,
  setClicked,
}: TooltipType) => {
  return (
    <div className={c(s.infoContainer, s[clicked && "active"], className)}>
      <button
        type="button"
        disabled={disabled}
        className={c(s.iconButton)}
        aria-disabled={disabled}
        onClick={() => {
          if (setClicked) {
            setClicked((prev: boolean) => !prev);
          }
        }}
      >
        <Icon className={s.icon} variant="info" />
      </button>
      <div className={s.infoBox}>
        <Text variant="p-small" className={s.infoText}>
          {text}
        </Text>
      </div>
    </div>
  );
};

Tooltip.defaultProps = {
  isActive: false,
  text: "Andlátstilkynning er alltaf birt á minningarsíðu hins látna / hinnar látnu og sýnileg þar til xxx tími er liðinn frá andláti. Með því að birta einnig á andlátstilkynningarsíðunni eru meiri líkur á að tilkynninginn berist fleirum.",
};
