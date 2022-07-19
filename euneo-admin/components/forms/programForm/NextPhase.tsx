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
import { ProgramFormData, ProgramPhase } from "../../../types/formTypes";
// Styles
import s from "../Form.module.scss";
// Components
import Select from "../../core/select/Select";
import { Input } from "../../core/input/Input";
import { SquareButton } from "../../core/squarebtn/SquareButton";
import { Text } from "../../core/text/Text";

type Props = {
  trigger: UseFormTrigger<ProgramFormData>;
  setValue: UseFormSetValue<ProgramFormData>;
  getValues: UseFormGetValues<ProgramFormData>;
  register: UseFormRegister<ProgramFormData>;
  setClearing: React.Dispatch<React.SetStateAction<boolean>>;
  np: {
    "max-pain": number;
    "min-pain": number;
    reference: string;
  };
  index: number;
  phaseIndex: number;
  phases: ProgramPhase[];
};

export const NextPhase = ({
  setValue,
  getValues,
  trigger,
  register,
  setClearing,
  np,
  index,
  phaseIndex,
  phases,
}: Props) => {
  const removeNextPhase = async (phaseIndex: number, index: number) => {
    setClearing(true);

    const phase = phases[phaseIndex];
    phase["next-phase"].splice(index, 1);

    setValue(`phases.${phaseIndex}`, { ...phase });
    await trigger(`phases.${phaseIndex}`);

    setClearing(false);
  };

  return (
    <div className={s.program_exercise}>
      <Text variant="h6">{index + 1}:</Text>
      <Select
        className={s.exercise_select}
        placeholder="Select phase"
        filter={
          np.reference ? { label: np.reference, value: np.reference } : null
        }
        options={phases.map((p, index) => {
          return {
            label: `p${index + 1}`,
            value: `p${index + 1}`,
          };
        })}
        onChange={(p: { label: string; value: string }) => {
          setValue(
            `phases.${phaseIndex}.next-phase.${index}.reference`,
            p.value
          );
          trigger(`phases.${phaseIndex}.next-phase.${index}.reference`);
        }}
      />
      <div className={s.exercise_info}>
        <Input
          name="min-pain"
          type="number"
          label="Min Pain*"
          {...register(`phases.${phaseIndex}.next-phase.${index}.min-pain`, {
            valueAsNumber: true,
          })}
          min="0"
          max={
            getValues(`phases.${phaseIndex}.next-phase.${index}.max-pain`) || 10
          }
          placeholder="..."
          setValue={setValue}
          onKeyPress={(e: React.KeyboardEvent) => {
            e.key === "Enter" && e.preventDefault();
          }}
          noError
        />
        <Input
          name="max-pain"
          type="number"
          label="Max Pain*"
          {...register(`phases.${phaseIndex}.next-phase.${index}.max-pain`, {
            valueAsNumber: true,
          })}
          min={
            getValues(`phases.${phaseIndex}.next-phase.${index}.min-pain`) || 0
          }
          max="10"
          placeholder="..."
          setValue={setValue}
          onKeyPress={(e: React.KeyboardEvent) => {
            e.key === "Enter" && e.preventDefault();
          }}
          noError
        />
      </div>
      <SquareButton
        type="button"
        variant="icon"
        icon="trash"
        width="18"
        height="18"
        color="red"
        onClick={() => removeNextPhase(phaseIndex, index)}
      />
    </div>
  );
};
