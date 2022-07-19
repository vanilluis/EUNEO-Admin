// React&NextJS
import React, { useState } from "react";
// 3rd party libraries
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
// Types
import {
  defaultProgramExercise,
  ProgramDay,
  ProgramFormData,
} from "../../../types/formTypes";
// Styles
import s from "../Form.module.scss";
// Components
import { Text } from "../../core/text/Text";
import { SquareButton } from "../../core/squarebtn/SquareButton";
import { Exercise } from "../../../types/types";
import { DaysExercise } from "./DaysExercise";

type Props = {
  trigger: UseFormTrigger<ProgramFormData>;
  setValue: UseFormSetValue<ProgramFormData>;
  getValues: UseFormGetValues<ProgramFormData>;
  register: UseFormRegister<ProgramFormData>;
  addDay: () => void;
  copyDay: (i: number) => void;
  exercises: Exercise[];
};

export const Days = ({
  setValue,
  getValues,
  trigger,
  register,
  addDay,
  copyDay,
  exercises,
}: Props) => {
  const days = getValues("days");
  const [clearing, setClearing] = useState<boolean>(false);

  const addExercise = async (index: number) => {
    const selectedDay = days[index];
    selectedDay.exercises.push(defaultProgramExercise);
    const updatedDays = [...days];
    updatedDays[index] = selectedDay;

    setValue("days", [...updatedDays]);
    await trigger("days");
  };

  const removeDay = async (index: number) => {
    const allDays = getValues("days");
    allDays.splice(index, 1);
    setValue("days", [...allDays]);
    await trigger("days");
  };

  const removeExercise = async (dayIndex: number, index: number) => {
    setClearing(true);

    const selectedDay = days[dayIndex];
    selectedDay.exercises.splice(index, 1);

    setValue(`days.${dayIndex}`, { ...selectedDay });
    await trigger(`days.${dayIndex}`);

    setClearing(false);
  };

  const hasExercises = (d: ProgramDay) => {
    if (d && d?.exercises?.length > 0) return true;

    return false;
  };

  const exercisesValid = (d: ProgramDay) => {
    let valid = true;
    d?.exercises?.forEach((e) => {
      if (!e.name || e.reps <= 0 || e.sets <= 0) {
        valid = false;
        return;
      }
    });

    return valid;
  };

  const renderActionButtons = (i: number) => {
    const btnProps = {
      type: "button",
      width: "18",
      height: "18",
    };
    return (
      <>
        <SquareButton
          {...btnProps}
          variant="text"
          label="Add exercise +"
          onClick={() => addExercise(i)}
        />
        {days.length > 1 && (
          <SquareButton
            {...btnProps}
            variant="icon"
            icon="copy"
            color="blue"
            onClick={() => copyDay(i)}
          />
        )}
        <SquareButton
          {...btnProps}
          variant="icon"
          icon="trash"
          color="red"
          onClick={() => removeDay(i)}
        />
      </>
    );
  };

  return (
    <div className={s.form_inner}>
      <div className={s.array_title}>
        <Text variant="h3">Program days</Text>
        <SquareButton
          type="button"
          variant="icon"
          icon="increase"
          width="18"
          height="18"
          onClick={addDay}
        />
      </div>
      <Text variant="p">
        Create program days by adding exercises. For each exercise, add number
        of reps, sets (and quantity if needed).
      </Text>

      <br />
      {days.map((d, i: number) => (
        <div
          className={s.program_day}
          key={`day-${i + 1}`}
          {...register(`days.${i}`, {
            validate: {
              hasExercises: (d) =>
                hasExercises(d) || "Day must have at least one exercise",
              exercisesValid: (d) =>
                exercisesValid(d) ||
                "All exercises must have a value and reps and sets must be greater than zero.",
            },
          })}
        >
          <div className={s.array_title}>
            <Text variant="h4">D{i + 1}</Text>
            {renderActionButtons(i)}
          </div>
          {!clearing &&
            d?.exercises?.map((e, index) => (
              <DaysExercise
                key={`d${i}-e${index}`}
                trigger={trigger}
                setValue={setValue}
                register={register}
                removeExercise={removeExercise}
                index={index}
                dayIndex={i}
                e={e}
                exercises={exercises}
              />
            ))}
        </div>
      ))}
    </div>
  );
};
