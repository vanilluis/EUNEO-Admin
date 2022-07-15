// React&NextJS
import React, { useEffect, useState } from "react";
// 3rd party libraries
import { useForm } from "react-hook-form";
// Types
import { Exercise } from "../../types/types";
import {
  ProgramFormData,
  defaultProgramData,
  defaultProgramPhase,
} from "../../types/formTypes";
// Styles
import s from "./Form.module.scss";
import c from "classnames";
// Components
import { Input } from "../core/input/Input";
import { Section } from "../core/section/Section";
import { Text } from "../core/text/Text";
import { Button } from "../core/button/Button";
import { Container } from "../core/container/Container";
import { General } from "./programForm/General";
import { Days } from "./programForm/Days";
import { Phases } from "./programForm/Phases";
import GenerateModal from "../modals/GenerateModal";
import write from "../../services/write";

type FormProps = {
  exercises: Exercise[];
};

export default function ProgramForm({ exercises }: FormProps) {
  const [page, setPage] = useState<number>(1);
  const [generate, setGenerate] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    trigger,
    getValues,
    setValue,
  } = useForm<ProgramFormData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: defaultProgramData,
  });

  useEffect(() => {
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
    const programRes = await write.addProgram(data);
  };

  // Executes when there are errors on submit
  const checkIfValid = async () => {
    console.log(errors);

    const isValid = await trigger();

    const hasDays = page !== 2 || getValues("days").length > 0;
    const hasPhases = page !== 3 || getValues("phases").length > 0;
    console.log(isValid);

    if (!isValid || !hasDays || !hasPhases) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
            />
          )}
        </Container>
        <div className={s.form_footer}>{renderButtons()}</div>
      </Section>
    </form>
  );
}
