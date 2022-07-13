// React&NextJS
import React, { useEffect, useState } from "react";
// 3rd party libraries
import {
  Control,
  Controller,
  DeepRequired,
  FieldErrorsImpl,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
// Types
import { ExerciseFormData, exerciseTypes } from "../../../types/formTypes";
// Styles
import s from "../Form.module.scss";
// Components
import { Input } from "../../core/input/Input";
import { Text } from "../../core/text/Text";
import { Filters as TypeSelector } from "../../core/filters/Filters";
import { VideoDrop } from "../../components/videoDrop/VideoDrop";
import { Label } from "../../core/label/Label";

type Props = {
  control: Control<ExerciseFormData>;
  trigger: UseFormTrigger<ExerciseFormData>;
  errors: FieldErrorsImpl<DeepRequired<ExerciseFormData>>;
  watch: UseFormWatch<ExerciseFormData>;
  setValue: UseFormSetValue<ExerciseFormData>;
};

export const General = ({
  control,
  trigger,
  errors,
  setValue,
  watch,
}: Props) => {
  const [typeIndex, setTypeIndex] = useState(0);

  return (
    <div className={s.form_inner}>
      <Text variant="h3">General Information</Text>
      <br />
      <Input
        type="text"
        name="name"
        label="Name*"
        placeholder="Name of exercise"
        errorMsg={errors?.name?.message}
        control={control}
        trigger={trigger}
        onKeyPress={(e: React.KeyboardEvent) => {
          e.key === "Enter" && e.preventDefault();
        }}
        rules={{
          required: {
            value: true,
            message: "Exercise name is required",
          },
        }}
      />
      <TypeSelector
        label="Type*"
        filterNames={exerciseTypes}
        selectedIndex={typeIndex}
        onClick={(e: React.BaseSyntheticEvent) => {
          setValue("type", e.target.innerHTML);
        }}
        setState={setTypeIndex}
      />
      <br />
      <Label tooltip="">Exercise video</Label>
      <VideoDrop name="videoLink" control={control} watch={watch} />
    </div>
  );
};
