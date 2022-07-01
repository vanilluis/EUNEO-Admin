// React&NextJS
import React, { useEffect } from "react";
// 3rd party libraries
import { useForm } from "react-hook-form";
// Types
import { ExerciseFormData, defaultFormData } from "../../types/formTypes";
// Styles
import s from "./Form.module.scss";
// Components
import { Input } from "../core/input/Input";
import { Section } from "../core/section/Section";
import { Text } from "../core/text/Text";
import { Button } from "../core/button/Button";
import { Icon } from "../core/icon/Icon";
import { Container } from "../core/container/Container";
import write from "../../services/write";

export default function ExerciseForm() {
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
  } = useForm<ExerciseFormData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: defaultFormData,
  });

  const steps = getValues("steps");
  const tips = getValues("tips");

  // Executes when there are errors on submit
  const ErrorHandler = async () => {
    await trigger();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  //Function for handling submit event
  const SubmitHandler = async (data: ExerciseFormData) => {
    const response = await write.addExercise(data);
  };

  const addStep = async () => {
    const steps = getValues("steps");
    setValue("steps", [...steps, ""]);
    await trigger("steps");
  };

  const removeStep = async (index: number) => {
    const tips = getValues("steps");
    steps.splice(index, 1);
    setValue("steps", [...steps]);
    await trigger("steps");
  };

  const addTip = async () => {
    const steps = getValues("tips");
    setValue("tips", [...tips, ""]);
    await trigger("tips");
  };

  const removeTip = async (index: number) => {
    const tips = getValues("tips");
    tips.splice(index, 1);
    setValue("tips", [...tips]);
    await trigger("tips");
  };

  return (
    <Section>
      <Text variant="h1" align="center">
        Create Exercise
      </Text>
      <Container>
        {/* Form */}
        <form
          className={s.form}
          onSubmit={handleSubmit(SubmitHandler, ErrorHandler)}
          id="exercise-create-form"
        >
          <div className={s.form_inner}>
            <Text variant="h3">General Information</Text>
            <br />
            <Input
              type="text"
              name="name"
              label="Name*"
              placeholder="Exercise name..."
              errorMsg={errors?.name?.message}
              control={control}
              trigger={trigger}
              onKeyPress={(e: React.KeyboardEvent) => {
                e.key === "Enter" && e.preventDefault();
              }}
              rules={{
                required: {
                  value: true,
                  message: "Exercise Name is required",
                },
              }}
            />
            <Input
              type="text"
              name="type"
              label="Type*"
              placeholder="Type of exercise..."
              errorMsg={errors?.type?.message}
              control={control}
              trigger={trigger}
              onKeyPress={(e: React.KeyboardEvent) => {
                e.key === "Enter" && e.preventDefault();
              }}
              rules={{
                required: {
                  value: true,
                  message: "Type is required",
                },
              }}
            />
            <Input
              type="text"
              name="videoLink"
              label="Exercise video"
              placeholder="Video ID..."
              control={control}
              trigger={trigger}
              onKeyPress={(e: React.KeyboardEvent) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
          </div>
          <div className={s.form_inner}>
            <div className={s.array_title}>
              <Text variant="h3">Steps</Text>
              <Button variant="ghost" type="button" onClick={addStep}>
                Add Step +
              </Button>
            </div>
            <br />
            {steps.map((step, index) => (
              <div className={s.array_title} key={`step-${index + 1}`}>
                <Input
                  key={`step-${index + 1}`}
                  name={`step-${index + 1}`}
                  label={`Step ${index + 1}`}
                  {...register(`steps.${index}`)}
                  placeholder="..."
                  setValue={setValue}
                  onKeyPress={(e: React.KeyboardEvent) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                />
                <button
                  className={s.trash_btn}
                  type="button"
                  onClick={() => removeStep(index)}
                >
                  <Icon variant="trash" width="20" height="20" />
                </button>
              </div>
            ))}
          </div>
          <div className={s.form_inner}>
            <div className={s.array_title}>
              <Text variant="h3">Tips</Text>
              <Button variant="ghost" type="button" onClick={addTip}>
                Add Tip +
              </Button>
            </div>
            <br />
            {tips.map((tip, index) => (
              <div key={`tip-${index + 1}`} className={s.array_title}>
                <Input
                  name={`tip-${index + 1}`}
                  label={`Tip ${index + 1}`}
                  {...register(`tips.${index}`)}
                  placeholder="..."
                  setValue={setValue}
                  onKeyPress={(e: React.KeyboardEvent) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                />
                <button
                  className={s.trash_btn}
                  type="button"
                  onClick={() => removeTip(index)}
                >
                  <Icon variant="trash" width="20" height="20" />
                </button>
              </div>
            ))}
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Container>
    </Section>
  );
}
