// React&NextJS
import React, { useState } from "react";
// 3rd party libraries
import { useForm } from "react-hook-form";
// Types
import { Exercise } from "../../types/types";
import { ProgramFormData, defaultProgramData } from "../../types/formTypes";
// Styles
import s from "./Form.module.scss";
import c from "classnames";
// Components
import { Input } from "../core/input/Input";
import { Section } from "../core/section/Section";
import { Text } from "../core/text/Text";
import { Button } from "../core/button/Button";
import { Container } from "../core/container/Container";

type FormProps = {
  exercises: Exercise[];
};

export default function ProgramForm({ exercises }: FormProps) {
  const [page, setPage] = useState<number>(1);
  const {
    register,
    unregister,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    trigger,
    getValues,
    setValue,
    watch,
  } = useForm<ProgramFormData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: defaultProgramData,
  });

  // Executes when there are errors on submit
  const ErrorHandler = async () => {
    await trigger();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  //Function for handling submit event
  const SubmitHandler = async (data: ProgramFormData) => {
    console.log(data);
  };

  // Executes when there are errors on submit
  const checkIfValid = async () => {
    const isValid = await trigger();
    if (!isValid) {
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

  return (
    <form
      className={s.form}
      onSubmit={handleSubmit(SubmitHandler, ErrorHandler)}
      id="program-create-form"
    >
      <Section>
        <Text variant="h1" align="center">
          Create Program
        </Text>
        <br />
        <Container>
          {/* Form */}
          {page === 1 && (
            <div className={s.form_inner}>
              <Text variant="h3">General Information</Text>
              <br />
              <Input
                type="text"
                name="name"
                label="Name*"
                placeholder="Program name..."
                errorMsg={errors?.name?.message}
                control={control}
                trigger={trigger}
                onKeyPress={(e: React.KeyboardEvent) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                rules={{
                  required: {
                    value: true,
                    message: "Program Name is required",
                  },
                }}
              />
            </div>
          )}
          {page === 2 && (
            <div className={s.form_inner}>
              <Text variant="h3">Create days</Text>
              <br />
              <Input
                type="text"
                name="name"
                label="Name*"
                placeholder="Program name..."
                errorMsg={errors?.name?.message}
                control={control}
                trigger={trigger}
                onKeyPress={(e: React.KeyboardEvent) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                rules={{
                  required: {
                    value: true,
                    message: "Program Name is required",
                  },
                }}
              />
            </div>
          )}
        </Container>
        <div className={s.form_footer}>{renderButtons()}</div>
      </Section>
    </form>
  );
}
