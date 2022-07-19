// React&NextJS
import React, { useState } from "react";
// Types
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { ProgramFormData } from "../../../types/formTypes";
// Styles
import s from "./Ticker.module.scss";
// Components
import { Button } from "../button/Button";
import { Text } from "../text/Text";
import { Label } from "../label/Label";

type Props = {
  name: any;
  label: string;
  minVal: number;
  maxVal: number;
  setValue: UseFormSetValue<ProgramFormData>;
  decreaseFunc?: Function;
  increaseFunc?: Function;
  price?: Number | string;
  tooltip?: string;
  initVal?: number;
  valueText?: string;
};

export const Ticker = ({
  name,
  label,
  minVal,
  maxVal,
  setValue,
  decreaseFunc,
  increaseFunc,
  price,
  tooltip,
  initVal,
  valueText,
}: Props) => {
  const [currVal, setCurrVal] = useState(initVal || 0);

  const increase = () => {
    if (currVal < maxVal) {
      setValue(name, currVal + 1);
      setCurrVal((value: number) => value + 1);
      increaseFunc && increaseFunc();
    }
  };

  const decrease = () => {
    if (currVal > minVal) {
      setValue(name, currVal - 1);
      setCurrVal((value: number) => value - 1);
      decreaseFunc && decreaseFunc();
    }
  };

  return (
    <div className={s.tickerContainer}>
      <div>
        {label && (
          <Label tooltip={tooltip} className={s.label}>
            {label}
          </Label>
        )}
        {price && (
          <Text className={s.price}>
            {price}
            {price !== "Included" && <span> / Per day</span>}
          </Text>
        )}
      </div>
      <div className={s.ticker}>
        <Button
          type="button"
          variant="ticker"
          icon="decrease"
          disabled={currVal === minVal}
          noPadd
          onClick={decrease}
        />
        <Text variant="p">
          {currVal} {valueText}
        </Text>
        <Button
          type="button"
          variant="ticker"
          icon="increase"
          noPadd
          onClick={increase}
        />
      </div>
    </div>
  );
};
