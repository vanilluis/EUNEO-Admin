// React&NextJS
import React from "react";
// 3rd party libraries
import {
  Control,
  DeepRequired,
  FieldErrorsImpl,
  UseFormTrigger,
} from "react-hook-form";
// Types
import { ProgramFormData } from "../../../types/formTypes";
// Styles
import s from "../Form.module.scss";
// Components
import { Input } from "../../core/input/Input";
import { Text } from "../../core/text/Text";

type Props = {
  control: Control<ProgramFormData>;
  trigger: UseFormTrigger<ProgramFormData>;
  errors: FieldErrorsImpl<DeepRequired<ProgramFormData>>;
};

export const General = ({ control, trigger, errors }: Props) => {
  return (
    <div className={s.form_inner}>
      <Text variant="h3">General Information</Text>
      <br />
      <Input
        type="text"
        name="name"
        label="Name*"
        placeholder="Name of program"
        errorMsg={errors?.name?.message}
        control={control}
        trigger={trigger}
        onKeyPress={(e: React.KeyboardEvent) => {
          e.key === "Enter" && e.preventDefault();
        }}
        rules={{
          required: {
            value: true,
            message: "Program Name is required",
          },
        }}
      />
    </div>
  );
};
