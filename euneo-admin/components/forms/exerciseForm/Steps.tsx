// React&NextJS
import React from "react";
// 3rd party libraries
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
// Types
import { ExerciseFormData } from "../../../types/formTypes";
// Styles
import s from "../Form.module.scss";
// Components
import { Input } from "../../core/input/Input";
import { Text } from "../../core/text/Text";
import { Button } from "../../core/button/Button";
import { Icon } from "../../core/icon/Icon";
import { Iterator } from "../../core/iterator/Iterator";

type Props = {
  trigger: UseFormTrigger<ExerciseFormData>;
  setValue: UseFormSetValue<ExerciseFormData>;
  getValues: UseFormGetValues<ExerciseFormData>;
  register: UseFormRegister<ExerciseFormData>;
};

export const Steps = ({ setValue, getValues, trigger, register }: Props) => {
  const steps = getValues("steps");

  const addStep = async () => {
    const steps = getValues("steps");
    setValue("steps", [...steps, ""]);
    await trigger("steps");
  };

  const removeStep = async (index: number) => {
    const steps = getValues("steps");
    steps.splice(index, 1);
    setValue("steps", [...steps]);
    await trigger("steps");
  };

  return (
    <div className={s.form_inner}>
      <div className={s.array_title}>
        <Text variant="h3">Steps</Text>
        <Iterator
          type="button"
          variant="icon"
          icon="increase"
          width="18"
          height="18"
          onClick={addStep}
        />
        {/* <Button variant="ghost" type="button" onClick={addStep}>
          Add Step +
        </Button> */}
      </div>
      <br />
      {steps.map((step, index) => (
        <div className={s.array_title} key={`step-${index + 1}`}>
          <Input
            key={`step-${index + 1}`}
            name={`step-${index + 1}`}
            label={`Step ${index + 1}`}
            {...register(`steps.${index}`)}
            placeholder="..."
            setValue={setValue}
            onKeyPress={(e: React.KeyboardEvent) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
          <button
            className={s.trash_btn}
            type="button"
            onClick={() => removeStep(index)}
          >
            <Icon variant="trash" width="20" height="20" />
          </button>
        </div>
      ))}
    </div>
  );
};
