// React&NextJS
import React, { useEffect, useState } from "react";
import router from "next/router";
// 3rd party libraries
import { useForm } from "react-hook-form";
// Services&Helper functions
import read from "../../services/read";
import write from "../../services/write";
// Types
import { ExerciseFormData, defaultFormData } from "../../types/formTypes";
// Styles
import s from "./Form.module.scss";
// Components
import { Section } from "../core/section/Section";
import { Text } from "../core/text/Text";
import { Button } from "../core/button/Button";
import { Container } from "../core/container/Container";
import { General } from "./exerciseForm/General";
import { Tips } from "./exerciseForm/Tips";
import { Steps } from "./exerciseForm/Steps";
import SubmitModal from "../modals/SubmitModal";
import SuccessModal from "../modals/SuccessModal";
import VideoUploadModal from "../modals/VideoUploadModal";

export default function ExerciseForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<number>(null);
  const [exerciseCreated, setExerciseCreated] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
    reset,
  } = useForm<ExerciseFormData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: defaultFormData,
  });

  // Executes when there are errors on submit
  const ErrorHandler = async () => {
    await trigger();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  //Function for handling submit event
  const SubmitHandler = async (data: ExerciseFormData) => {
    // Check if an exercise video was uploaded
    const videoFile = data.videoLink?.file || null;
    if (videoFile) {
      // Fetch MUX upload data
      setProgress(1);
      const uploadData: { id: string; url: string } | null =
        await read.getUploadURL();
      // If successfully fetched...
      if (uploadData && uploadData.url) {
        // Add video to MUX and then create exercise
        write.addVideo(
          videoFile,
          uploadData,
          setProgress,
          createExercise,
          errorCallback
        );
      } else {
        alert("Could not fetch upload data from server. Please try again.");
      }
    } else {
      await createExercise(null);
    }
  };

  const errorCallback = (errorMsg: string) => {
    alert(errorMsg);
    setProgress(null);
  };

  const createExercise = async (
    videoData: { displayID: string; assetID: string } | null
  ) => {
    setProgress(null);
    setIsLoading(true);
    const data = getValues();
    const successResponse = await write.addExercise(data, videoData);
    if (!successResponse.success) {
      alert(successResponse.message);
    } else {
      reset();
      setExerciseCreated(true);
    }

    setIsLoading(false);
  };

  return (
    <>
      <SubmitModal title="Just a moment..." isOpen={isLoading} />
      <VideoUploadModal progress={progress} isOpen={progress ? true : false} />
      <SuccessModal
        title="Exercise created!"
        info="Exercise was successfully created. Would you like to create another exercise?"
        isOpen={exerciseCreated}
        closeEvent={() => {
          setExerciseCreated(false);
          router.push("/");
        }}
        submitEvent={() => setExerciseCreated(false)}
        primaryBtn="Yes, create another exercise"
        secondaryBtn="No, back to home page"
      />
      <form
        className={s.form}
        onSubmit={handleSubmit(SubmitHandler, ErrorHandler)}
        id="exercise-create-form"
      >
        <Section>
          <Text variant="h1" align="center">
            Create Exercise
          </Text>
          <br />
          <Container>
            <General
              control={control}
              trigger={trigger}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
            <Steps
              getValues={getValues}
              setValue={setValue}
              trigger={trigger}
              register={register}
            />
            <Tips
              getValues={getValues}
              setValue={setValue}
              trigger={trigger}
              register={register}
            />
            <br />
          </Container>
        </Section>
        <div className={s.form_footer}>
          <Button type="submit" form="exercise-create-form">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
