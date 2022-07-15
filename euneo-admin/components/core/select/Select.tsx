// React&NextJS
import React, { useEffect, useState } from "react";
// 3rd party libraries
import Selector from "react-select";
import { Control, FieldValues, UseFormTrigger } from "react-hook-form";
// Styles
import s from "./Select.module.scss";
import c from "classnames";
import { Label } from "../label/Label";
// Components

type SelectProps = {
  label?: string;
  placeholder?: string;
  defaultValue?: any;
  onChange?: Function;
  className?: string;
  name?: string;
  control?: Control<FieldValues, object>;
  trigger?: UseFormTrigger<FieldValues>;
  options: Array<{ label: unknown; value: unknown }>;
  errorMsg?: boolean;
  innerRef?: any;
  filter?: { label: unknown; value: unknown };
  [key: string]: unknown;
};

type OptionProps = {
  children: React.ReactNode;
  getStyles: Function;
  isFocused: boolean;
  isSelected: boolean;
  isDisabled?: boolean;
  innerRef: React.LegacyRef<HTMLDivElement>;
  innerProps: any;
  className?: string;
};

const Option = (props: OptionProps) => {
  const {
    children,
    // className,
    getStyles,
    // isDisabled, // fínt að geyma þetta þar sem að við gætum notað þetta seinna
    isFocused,
    isSelected,
    innerRef,
    innerProps,
  } = props;
  {
    return (
      <div
        ref={innerRef}
        css={getStyles("option", props)}
        className={c(
          s.option,
          isFocused && s["option__is_focused"],
          isSelected && s["option__is_selected"]
        )}
        {...innerProps}
      >
        {children}
      </div>
    );
  }
};

function Select({
  // label,
  label,
  placeholder,
  onChange,
  className,
  options,
  filter,
  ...props
}: SelectProps) {
  const [device, setDevice] = useState(true);
  const [hasValue, setHasValue] = useState<boolean | string>(false);
  const customOptions = [...options];

  useEffect(() => {
    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth <= 800
    ) {
      setDevice(false);
    }
  }, []);

  return (
    <div className={s.input_container}>
      <Label className={c(s.label, hasValue && s.hasValue)}>{label}</Label>
      <Selector
        components={{ Option }}
        options={customOptions}
        placeholder={placeholder}
        className={c(s.select, className)}
        isSearchable={true}
        defaultValue={
          filter ? { label: filter.label, value: filter.value } : ""
        }
        // @ts-ignore
        onChange={(e) => {
          setHasValue("locked");

          onChange(e);
        }}
        onFocus={() => setHasValue(true)}
        onBlur={() => hasValue !== "locked" && device && setHasValue(false)}
        {...props}
      />
    </div>
  );
}

export default Select;
