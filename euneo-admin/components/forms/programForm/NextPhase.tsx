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
import { ProgramFormData, ProgramPhase } from "../../../types/formTypes";
// Styles
import s from "../Form.module.scss";
// Components
import { Icon } from "../../core/icon/Icon";
import Select from "../../core/select/Select";
import { Input } from "../../core/input/Input";

type Props = {
  trigger: UseFormTrigger<ProgramFormData>;
  setValue: UseFormSetValue<ProgramFormData>;
  getValues: UseFormGetValues<ProgramFormData>;
  register: UseFormRegister<ProgramFormData>;
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
  np,
  index,
  phaseIndex,
  phases,
}: Props) => {
  const [clearing, setClearing] = useState<boolean>(false);

  const removeNextPhase = async (phaseIndex: number, index: number) => {
    setClearing(true);
    console.log(phaseIndex, index);

    const phase = phases[phaseIndex];
    console.log(phase);

    phase["next-phase"].splice(index, 1);
    console.log(phase);

    setValue(`phases.${phaseIndex}`, { ...phase });
    await trigger(`phases.${phaseIndex}`);

    setClearing(false);
  };

  return (
    <div className={s.program_exercise}>
      <Select
        label={`Next Phase ${index + 1}`}
        className={s.exercise_select}
        placeholder="Select phase"
        filter={
          np.reference ? { label: np.reference, value: np.reference } : null
        }
        options={phases.map((phase, index) => {
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
      <Input
        name="min-pain"
        type="number"
        label="Min Pain*"
        {...register(`phases.${phaseIndex}.next-phase.${index}.min-pain`, {
          valueAsNumber: true,
        })}
        min="0"
        max={getValues(`phases.${phaseIndex}.next-phase.${index}.max-pain`)}
        placeholder="..."
        setValue={setValue}
        onKeyPress={(e: React.KeyboardEvent) => {
          e.key === "Enter" && e.preventDefault();
        }}
      />
      <Input
        name="max-pain"
        type="number"
        label="Max Pain*"
        {...register(`phases.${phaseIndex}.next-phase.${index}.max-pain`, {
          valueAsNumber: true,
        })}
        min={getValues(`phases.${phaseIndex}.next-phase.${index}.min-pain`)}
        max="10"
        placeholder="..."
        setValue={setValue}
        onKeyPress={(e: React.KeyboardEvent) => {
          e.key === "Enter" && e.preventDefault();
        }}
      />
      <button
        className={s.trash_btn}
        type="button"
        onClick={() => removeNextPhase(phaseIndex, index)}
      >
        <Icon variant="trash" width="20" height="20" />
      </button>
    </div>
  );
};
