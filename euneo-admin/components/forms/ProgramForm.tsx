// React&NextJS
import React, { useEffect, useState } from "react";
import router from "next/router";
// 3rd party libraries
import { useForm } from "react-hook-form";
// Types
import { Exercise } from "../../types/types";
import {
  ProgramFormData,
  defaultProgramData,
  defaultProgramPhase,
  ProgramPhase,
  ProgramDay,
} from "../../types/formTypes";
// Styles
import s from "./Form.module.scss";
import c from "classnames";
// Components
import { Section } from "../core/section/Section";
import { Text } from "../core/text/Text";
import { Button } from "../core/button/Button";
import { Container } from "../core/container/Container";
import { General } from "./programForm/General";
import { Days } from "./programForm/Days";
import { Phases } from "./programForm/Phases";
import GenerateModal from "../modals/GenerateModal";
import write from "../../services/write";
import SubmitModal from "../modals/SubmitModal";
import SuccessModal from "../modals/SuccessModal";
import CopyModal from "../modals/CopyModal";
import { Summary } from "./programForm/Summary";

type FormProps = {
  exercises: Exercise[];
};

type CopyType = {
  item: ProgramPhase | ProgramDay;
  type: "phases" | "days";
  index: number;
  dataList: string[];
};

export default function ProgramForm({ exercises }: FormProps) {
  const [page, setPage] = useState<number>(1);
  const [generate, setGenerate] = useState<boolean>(false);
  const [copy, setCopy] = useState<CopyType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [programCreated, setProgramCreated] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    reset,
  } = useForm<ProgramFormData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: defaultProgramData,
  });

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    const [days, phases] = getValues(["days", "phases"]);
    if (page === 2 && days.length === 0) {
      setGenerate(true);
    } else if (page === 3 && phases.length === 0) {
      setGenerate(true);
    }
  }, [page]);

  // Executes when there are errors on submit
  const ErrorHandler = async () => {
    await trigger();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  //Function for handling submit event
  const SubmitHandler = async (data: ProgramFormData) => {
    if (page === 4) {
      setIsLoading(true);
      const programRes = await write.addProgram(data);
      if (!programRes.success) {
        alert(programRes.message);
      } else {
        reset();
        setProgramCreated(true);
      }

      setIsLoading(false);
    }
  };

  const alertErrors = (customError: string) => {
    let errorMsg = "";
    if (page === 2) {
      if (errors?.days) {
        Object.keys(errors?.days).forEach((day) => {
          const dayIndex = parseInt(day) + 1;
          errorMsg += `Day ${dayIndex}: ${errors.days[day].message}\n\n`;
        });
      } else {
        errorMsg = "Program must have at least one unique exercise day";
      }
    } else if (page === 3) {
      if (errors?.phases) {
        Object.keys(errors?.phases).forEach((phase) => {
          const dayIndex = parseInt(phase) + 1;
          errorMsg += `Phase ${dayIndex}: ${errors.phases[phase].message}\n\n`;
        });
      } else if (customError) {
        errorMsg = customError;
      } else {
        errorMsg = "Program must have at least one phase";
      }
    }
    errorMsg && alert(errorMsg);
  };

  // Executes when there are errors on submit
  const checkIfValid = async () => {
    const isValid = await trigger();
    const days = getValues("days");
    const phases = getValues("phases");

    const hasDays = page !== 2 || days.length > 0;
    const hasPhases = page !== 3 || phases.length > 0;
    const hasEndPhase =
      page !== 3 || phases.find((p) => p["next-phase"].length === 0);

    if (!isValid || !hasDays || !hasPhases || !hasEndPhase) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      const customError = !hasEndPhase
        ? "There must be at least one final phase (no next phase)"
        : "";
      alertErrors(customError);
    } else {
      setPage((p: number) => p + 1);
    }
  };

  const renderButtons = () => (
    <div className={c(s.form_buttons, page === 1 && s.form_first_page)}>
      {page > 1 && (
        <Button
          type="button"
          variant="ghost"
          onClick={() => setPage((p: number) => p - 1)}
        >
          Back
        </Button>
      )}
      {page < 3 && (
        <Button type="button" onClick={checkIfValid}>
          Next
        </Button>
      )}
      {page === 3 && (
        <Button type="button" onClick={checkIfValid}>
          Review
        </Button>
      )}
      {page === 4 && <Button type="submit">Submit</Button>}
    </div>
  );

  const generateData = async (
    type: string,
    value: number,
    array: Array<number> = []
  ) => {
    if (type === "days") {
      const allDays = getValues("days");
      const updatedDays = [...allDays];
      for (let i = 0; i < value; i++) {
        updatedDays.push({ exercises: [] });
      }
      setValue("days", [...updatedDays]);
      await trigger("days");
    } else if (type === "phases") {
      const allPhases = getValues("phases");
      const updatedPhases = [...allPhases];
      for (let i = 0; i < value; i++) {
        const newPhase = { ...defaultProgramPhase, length: array[i] };
        updatedPhases.push(newPhase);
      }
      setValue("phases", [...updatedPhases]);
      await trigger("phases");
    }
    setGenerate(false);
  };

  const openCopyModal = async (type: "phases" | "days", i: number) => {
    console.log(type, i);

    const item = getValues(`${type}.${i}`);
    const dataList = getValues(type).map(
      (value: any, i: number) => `${type[0]}${i + 1}`
    );

    setCopy({ item, type, index: i, dataList });
  };

  const copyItem = async (
    copiedItem: CopyType,
    itemList: Array<{ name: string; index: number }>
  ) => {
    itemList.forEach((data) => {
      setValue(`${copiedItem.type}.${data.index}`, { ...copiedItem.item });
    });

    await trigger(copiedItem.type);
    setCopy(null);
  };

  return (
    <form
      className={s.form}
      onSubmit={handleSubmit(SubmitHandler, ErrorHandler)}
      id="program-create-form"
    >
      {generate && (
        <GenerateModal
          type={page === 2 ? "days" : "phases"}
          isOpen={generate}
          submitEvent={generateData}
          closeEvent={() => setGenerate(false)}
        />
      )}
      {copy && (
        <CopyModal
          item={copy}
          isOpen={copy ? true : false}
          submitEvent={(
            item: CopyType,
            dataList: Array<{ name: string; index: number }>
          ) => copyItem(item, dataList)}
          closeEvent={() => setCopy(null)}
        />
      )}
      <SubmitModal title="Just a moment..." isOpen={isLoading} />
      <SuccessModal
        title="Program created!"
        info="Program was successfully created. Would you like to create another one?"
        isOpen={programCreated}
        closeEvent={() => {
          setProgramCreated(false);
          router.push("/");
        }}
        submitEvent={() => {
          setProgramCreated(false);
          setPage(1);
        }}
        primaryBtn="Yes, create another program"
        secondaryBtn="No, back to home page"
      />
      <Section>
        <Text variant="h1" align="center">
          Create Program
        </Text>
        <br />
        <Container>
          {/* Form */}
          {page === 1 && (
            <General control={control} trigger={trigger} errors={errors} />
          )}
          {page === 2 && (
            <Days
              trigger={trigger}
              getValues={getValues}
              setValue={setValue}
              register={register}
              addDay={() => setGenerate(true)}
              copyDay={(i) => openCopyModal("days", i)}
              exercises={exercises}
            />
          )}
          {page === 3 && (
            <Phases
              trigger={trigger}
              getValues={getValues}
              setValue={setValue}
              register={register}
              addPhase={() => setGenerate(true)}
              copyPhase={(i) => openCopyModal("phases", i)}
              copying={copy ? true : false}
            />
          )}
          {page === 4 && <Summary data={getValues()} />}
        </Container>
        <div className={s.form_footer}>{renderButtons()}</div>
      </Section>
    </form>
  );
}
