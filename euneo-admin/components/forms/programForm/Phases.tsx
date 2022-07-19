// React&NextJS
import React, { useEffect, useState } from "react";
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
import { Text } from "../../core/text/Text";
import { SquareButton } from "../../core/squarebtn/SquareButton";
import { NextPhase } from "./NextPhase";
import { PhaseDay } from "./PhaseDay";
import programHelperFunctions from "../../../utils/programHelperFunctions";
import { Ticker } from "../../core/ticker/Ticker";

type Props = {
  trigger: UseFormTrigger<ProgramFormData>;
  setValue: UseFormSetValue<ProgramFormData>;
  getValues: UseFormGetValues<ProgramFormData>;
  register: UseFormRegister<ProgramFormData>;
  addPhase: () => void;
  copyPhase: (i: number) => void;
  copying: boolean;
};

export const Phases = ({
  setValue,
  getValues,
  trigger,
  register,
  addPhase,
  copyPhase,
  copying,
}: Props) => {
  const [clearing, setClearing] = useState<boolean>(false);

  const phases = getValues("phases");
  const days = getValues("days");

  useEffect(() => {
    const dayIndexList = days.map((d, i) => `d${i + 1}`);

    phases.forEach((p, i) => {
      const updatedDays = p.days.map((d) => {
        if (!dayIndexList.includes(d)) {
          return "";
        }
        return d;
      });
      setValue(`phases.${i}.days`, updatedDays);
    });

    trigger("phases");
  }, [days]);

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
    setClearing(true);

    const allPhases = getValues("phases");
    allPhases.splice(index, 1);
    const updatedPhases = programHelperFunctions.updateNextPhases(
      allPhases,
      index
    );

    setValue("phases", [...updatedPhases]);
    await trigger("phases");

    setClearing(false);
  };

  const validatePhase = (p: ProgramPhase) => {
    return programHelperFunctions.validatePhase(p);
  };

  const renderActionButtons = (p: ProgramPhase, i: number) => {
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
          label="Add day +"
          disabled={p.days.length === p.length}
          onClick={() => addDay(i)}
        />
        <SquareButton
          {...btnProps}
          variant="text"
          label="Add next phase +"
          onClick={() => addNextPhase(i)}
        />
        {phases.length > 1 && (
          <SquareButton
            {...btnProps}
            variant="icon"
            icon="copy"
            color="blue"
            onClick={() => copyPhase(i)}
          />
        )}
        <SquareButton
          {...btnProps}
          variant="icon"
          icon="trash"
          color="red"
          onClick={() => removePhase(i)}
        />
      </>
    );
  };

  return (
    <div className={s.form_inner}>
      <div className={s.array_title}>
        <Text variant="h3">Program Phases</Text>
        <SquareButton
          type="button"
          variant="icon"
          icon="increase"
          width="16"
          height="16"
          onClick={addPhase}
        />
      </div>
      <Text variant="p">
        Create program phase by adding days. Additionally, add also next phase
        (new program phase or none if final one).
      </Text>

      <br />
      {!clearing &&
        phases.map((p, i: number) => (
          <div
            className={s.program_day}
            key={`phase-${i + 1}`}
            {...register(`phases.${i}`, {
              validate: {
                validPhase: (p) => validatePhase(p),
              },
            })}
          >
            <div className={s.array_title}>
              <Text variant="h4">P{i + 1}</Text>
              {!copying && (
                <Ticker
                  label=""
                  name={`phases.${i}.length`}
                  minVal={p.days?.length || 1}
                  maxVal={9999999}
                  setValue={setValue}
                  increaseFunc={() => trigger(`phases.${i}.length`)}
                  decreaseFunc={() => trigger(`phases.${i}.length`)}
                  initVal={p.length}
                  valueText="days"
                />
              )}
            </div>
            <div className={s.array_title}>{renderActionButtons(p, i)}</div>

            {p.days.length > 0 && (
              <Text variant="h5">Days (max {p.length})</Text>
            )}
            {!clearing &&
              p.days?.map((d, index) => (
                <PhaseDay
                  key={`p${i}-d${index + 1}`}
                  setValue={setValue}
                  trigger={trigger}
                  setClearing={setClearing}
                  index={index}
                  d={d}
                  phaseIndex={i}
                  phases={phases}
                  days={days}
                />
              ))}
            <br />
            {p["next-phase"].length > 0 && (
              <Text variant="h5">Next phases</Text>
            )}
            {!clearing &&
              p &&
              p["next-phase"]?.map((np, index) => (
                <NextPhase
                  key={`p${i}-np${index + 1}`}
                  trigger={trigger}
                  setValue={setValue}
                  getValues={getValues}
                  register={register}
                  setClearing={setClearing}
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
