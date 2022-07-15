// React&NextJS
import React from "react";
// 3rd party libraries
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
// Types
import { ProgramExercise, ProgramFormData } from "../../../types/formTypes";
import { Exercise } from "../../../types/types";
// Styles
import s from "../Form.module.scss";
// Components
import { Input } from "../../core/input/Input";
import { Icon } from "../../core/icon/Icon";
import Select from "../../core/select/Select";

type Props = {
  trigger: UseFormTrigger<ProgramFormData>;
  setValue: UseFormSetValue<ProgramFormData>;
  register: UseFormRegister<ProgramFormData>;
  removeExercise: (x: number, y: number) => void;
  index: number;
  dayIndex: number;
  e: ProgramExercise;
  exercises: Exercise[];
};

export const DaysExercise = ({
  setValue,
  trigger,
  register,
  removeExercise,
  index,
  dayIndex,
  e,
  exercises,
}: Props) => {
  return (
    <div className={s.program_exercise}>
      <Select
        label={`Exercise ${index + 1}`}
        className={s.exercise_select}
        placeholder="Select exercise..."
        filter={e.name ? { label: e.name, value: e.id } : null}
        options={exercises.map((e) => {
          return { label: e.name, value: e.id };
        })}
        onChange={(e) => {
          const name = exercises.find((ex) => ex.id === e.value).name;
          setValue(`days.${dayIndex}.exercises.${index}.id`, e.value);
          setValue(`days.${dayIndex}.exercises.${index}.name`, name);

          trigger(`days.${dayIndex}.exercises.${index}`);
        }}
      />
      {e.name && (
        <div className={s.exercise_info}>
          <Input
            name="reps"
            type="number"
            label="Reps"
            {...register(`days.${dayIndex}.exercises.${index}.reps`, {
              valueAsNumber: true,
            })}
            min="0"
            placeholder="..."
            setValue={setValue}
            onKeyPress={(e: React.KeyboardEvent) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
          <Input
            name="sets"
            label="Sets"
            type="number"
            {...register(`days.${dayIndex}.exercises.${index}.sets`, {
              valueAsNumber: true,
            })}
            min="0"
            placeholder="..."
            setValue={setValue}
            onKeyPress={(e: React.KeyboardEvent) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
          <Input
            name="quantity"
            label="Quantity"
            type="number"
            {...register(`days.${dayIndex}.exercises.${index}.quantity`, {
              valueAsNumber: true,
            })}
            min="0"
            placeholder="..."
            setValue={setValue}
            onKeyPress={(e: React.KeyboardEvent) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
        </div>
      )}
      <button
        className={s.trash_btn}
        type="button"
        onClick={() => removeExercise(dayIndex, index)}
      >
        <Icon variant="trash" width="20" height="20" />
      </button>
    </div>
  );
};
