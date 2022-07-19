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
import { SquareButton } from "../../core/squarebtn/SquareButton";

type Props = {
  trigger: UseFormTrigger<ExerciseFormData>;
  setValue: UseFormSetValue<ExerciseFormData>;
  getValues: UseFormGetValues<ExerciseFormData>;
  register: UseFormRegister<ExerciseFormData>;
};

export const Tips = ({ setValue, getValues, trigger, register }: Props) => {
  const tips = getValues("tips");

  const addTip = async () => {
    const tips = getValues("tips");
    setValue("tips", [...tips, ""]);
    await trigger("tips");
  };

  const removeTip = async (index: number) => {
    const tips = getValues("tips");
    tips.splice(index, 1);
    setValue("tips", [...tips]);
    await trigger("tips");
  };

  return (
    <div className={s.form_inner}>
      <div className={s.array_title}>
        <Text variant="h3">Tips</Text>
        <SquareButton
          type="button"
          variant="icon"
          icon="increase"
          width="18"
          height="18"
          onClick={addTip}
        />
        {/* <Button variant="ghost" type="button" onClick={addTip}>
          Add Tip +
        </Button> */}
      </div>
      <br />
      {tips.map((tip, index) => (
        <div key={`tip-${index + 1}`} className={s.array_title}>
          <Input
            name={`tip-${index + 1}`}
            label={`Tip ${index + 1}`}
            {...register(`tips.${index}`)}
            placeholder="..."
            setValue={setValue}
            onKeyPress={(e: React.KeyboardEvent) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
          <button
            className={s.trash_btn}
            type="button"
            onClick={() => removeTip(index)}
          >
            <Icon variant="trash" width="20" height="20" />
          </button>
        </div>
      ))}
    </div>
  );
};
