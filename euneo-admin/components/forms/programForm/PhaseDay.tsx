// React&NextJS
import React from "react";
// 3rd party libraries
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
// Types
import {
  ProgramDay,
  ProgramFormData,
  ProgramPhase,
} from "../../../types/formTypes";
// Styles
import s from "../Form.module.scss";
// Components
import { Text } from "../../core/text/Text";
import { SquareButton } from "../../core/squarebtn/SquareButton";
import Select from "../../core/select/Select";

type Props = {
  trigger: UseFormTrigger<ProgramFormData>;
  setValue: UseFormSetValue<ProgramFormData>;
  setClearing: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  d: string;
  phaseIndex: number;
  phases: ProgramPhase[];
  days: ProgramDay[];
};

export const PhaseDay = ({
  setValue,
  trigger,
  setClearing,
  index,
  d,
  phaseIndex,
  phases,
  days,
}: Props) => {
  const removeDay = async (phaseIndex: number, index: number) => {
    setClearing(true);

    const phase = phases[phaseIndex];
    phase.days.splice(index, 1);

    setValue(`phases.${phaseIndex}`, { ...phase });
    await trigger(`phases.${phaseIndex}`);

    setClearing(false);
  };

  const removeNextPhase = async (phaseIndex: number, index: number) => {
    setClearing(true);

    const phase = phases[phaseIndex];
    phase["next-phase"].splice(index, 1);

    setValue(`phases.${phaseIndex}`, { ...phase });
    await trigger(`phases.${phaseIndex}`);

    setClearing(false);
  };

  const refExists = async (
    phaseIndex: number,
    reference: string,
    field: string
  ) => {
    let options = [];
    let exists = true;
    if (field === "next-phase") {
      options = phases.map((p, index) => `p${index + 1}`);
      exists = options.includes(reference);

      if (!exists) {
        const phaseToRemove = phases[phaseIndex]["next-phase"].findIndex(
          (np) => np.reference === reference
        );
        await removeNextPhase(phaseIndex, phaseToRemove);
      }
    } else {
      options = days.map((d, index) => `d${index + 1}`);
    }

    return exists;
  };

  return (
    <div className={s.program_exercise}>
      <Text variant="h6">{index + 1}:</Text>
      <Select
        className={s.exercise_select}
        placeholder="Select day..."
        filter={
          d && refExists(phaseIndex, d, "days") ? { label: d, value: d } : null
        }
        options={days.map((d, index) => {
          return {
            label: `d${index + 1}`,
            value: `d${index + 1}`,
          };
        })}
        onChange={(d: { label: string; value: string }) => {
          setValue(`phases.${phaseIndex}.days.${index}`, d.value);

          trigger(`phases.${phaseIndex}.days.${index}`);
        }}
      />
      <SquareButton
        type="button"
        variant="icon"
        icon="trash"
        color="red"
        width="18"
        height="18"
        onClick={() => removeDay(phaseIndex, index)}
      />
    </div>
  );
};
