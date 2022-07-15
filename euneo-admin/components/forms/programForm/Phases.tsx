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
import { ProgramFormData } from "../../../types/formTypes";
// Styles
import s from "../Form.module.scss";
// Components
import { Text } from "../../core/text/Text";
import { Icon } from "../../core/icon/Icon";
import { Iterator } from "../../core/iterator/Iterator";
import Select from "../../core/select/Select";
import { Input } from "../../core/input/Input";
import { NextPhase } from "./NextPhase";

type Props = {
  trigger: UseFormTrigger<ProgramFormData>;
  setValue: UseFormSetValue<ProgramFormData>;
  getValues: UseFormGetValues<ProgramFormData>;
  register: UseFormRegister<ProgramFormData>;
  addPhase: () => void;
};

export const Phases = ({
  setValue,
  getValues,
  trigger,
  register,
  addPhase,
}: Props) => {
  const [clearing, setClearing] = useState<boolean>(false);

  const phases = getValues("phases");
  const days = getValues("days");

  //   const addPhase = async () => {
  //     const allPhases = getValues("phases");
  //     setValue("phases", [...allPhases, { ...defaultProgramPhase }]);
  //     await trigger("phases");
  //   };

  const addDay = async (index: number) => {
    const phase = phases[index];
    phase.days.push("");
    const allPhases = [...phases];
    allPhases[index] = phase;

    setValue("phases", allPhases);
    await trigger("phases");
  };

  const addNextPhase = async (index: number) => {
    const phase = phases[index];
    phase["next-phase"].push({ "min-pain": 0, "max-pain": 10, reference: "" });
    const allPhases = [...phases];
    allPhases[index] = phase;

    setValue("phases", allPhases);
    await trigger("phases");
  };

  const removePhase = async (index: number) => {
    const allPhases = getValues("phases");
    allPhases.splice(index, 1);

    setValue("phases", [...allPhases]);
    await trigger("phases");
  };

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
    console.log(phaseIndex, index);

    const phase = phases[phaseIndex];
    console.log(phase);

    phase["next-phase"].splice(index, 1);
    console.log(phase);

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
      console.log(options, exists);

      if (!exists) {
        const phaseToRemove = phases[phaseIndex]["next-phase"].findIndex(
          (np) => np.reference === reference
        );
        await removeNextPhase(phaseIndex, phaseToRemove);
      }
    } else {
      options = days.map((d, index) => `d${index + 1}`);
    }
    console.log(options, reference);

    return exists;
  };

  return (
    <div className={s.form_inner}>
      <div className={s.array_title}>
        <Text variant="h3">Program Phases</Text>
        <Iterator
          type="button"
          variant="icon"
          icon="increase"
          width="18"
          height="18"
          onClick={addPhase}
        />
      </div>
      <Text variant="p">
        Create program phase by adding days. Additionally, add also next phase
        (new program phase or none if final one).
      </Text>

      <br />
      {phases.map((p, i: number) => (
        <div
          className={s.program_day}
          key={`phase-${i + 1}`}
          {...register(`phases.${i}`)}
        >
          <div className={s.array_title}>
            <Text variant="h4">P{i + 1}</Text>
            <button
              className={s.trash_btn}
              type="button"
              onClick={() => removePhase(i)}
            >
              <Icon variant="trash" width="20" height="20" />
            </button>
          </div>
          <div className={s.array_title}>
            <button type="button" onClick={() => addDay(i)}>
              add day
            </button>
          </div>
          <br />
          {!clearing &&
            p.days?.map((d, index) => (
              <div className={s.program_exercise} key={`p-${i}d-${index + 1}`}>
                <Select
                  label={`Day ${index + 1}`}
                  className={s.exercise_select}
                  placeholder="Select day..."
                  filter={
                    d && refExists(i, d, "days") ? { label: d, value: d } : null
                  }
                  options={days.map((d, index) => {
                    return {
                      label: `d${index + 1}`,
                      value: `d${index + 1}`,
                    };
                  })}
                  onChange={(d: { label: string; value: string }) => {
                    setValue(`phases.${i}.days.${index}`, d.value);

                    trigger(`phases.${i}.days.${index}`);
                  }}
                />
                <button
                  className={s.trash_btn}
                  type="button"
                  onClick={() => removeDay(i, index)}
                >
                  <Icon variant="trash" width="20" height="20" />
                </button>
              </div>
            ))}
          <div className={s.array_title}>
            <button type="button" onClick={() => addNextPhase(i)}>
              add next phase
            </button>
          </div>
          <br />
          {!clearing &&
            p &&
            p["next-phase"]?.map((np, index) => (
              <NextPhase
                key={`p${i}-np${index + 1}`}
                trigger={trigger}
                setValue={setValue}
                getValues={getValues}
                register={register}
                np={np}
                index={index}
                phaseIndex={i}
                phases={phases}
              />
            ))}
        </div>
      ))}
    </div>
  );
};
