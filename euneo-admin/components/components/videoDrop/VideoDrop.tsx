// React&NextJS
import React from "react";
// 3rd party libraries
import { Control, Controller, UseFormWatch } from "react-hook-form";
import Dropzone from "react-dropzone";
// Services&Helper functions
// Types
// Styles
import s from "./VideoDrop.module.scss";
import classnames from "classnames";
// Components
import { ImageButton } from "../../core/imageButton/ImageButton";
import { Text } from "../../core/text/Text";
import { DropzoneButton } from "../../core/dropzoneButton/DropzoneButton";
import { ExerciseFormData } from "../../../types/formTypes";

type Props = {
  name: "videoLink";
  control: Control<ExerciseFormData>;
  watch: UseFormWatch<ExerciseFormData>;
};

export const VideoDrop = ({ control, watch, name }: Props) => {
  const videoLink = watch("videoLink");

  const videoDrop = (files: any) => {
    if (files.length !== 0) {
      const video = files[0];
      return { id: "videoLink", type: "file", file: video };
    }
    return null;
  };

  const emptyDrop = () => {
    return { id: "videoLink", type: "file", file: null };
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => {
        return (
          <>
            {videoLink?.file && (
              <div className={s.selected_video}>
                <Text variant="p">{videoLink.file.name}</Text>
                <ImageButton
                  type="button"
                  variant="icon"
                  icon="trash"
                  height="16"
                  width="16"
                  onClick={() => {
                    const emptyFile = emptyDrop();
                    onChange(emptyFile);
                  }}
                />
              </div>
            )}
            <div className={s.videoContainer}>
              <Dropzone
                multiple={false}
                onDrop={(files) => {
                  const newVideo = videoDrop(files);

                  newVideo && onChange(newVideo);
                }}
              >
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />

                    <DropzoneButton
                      icon="cloud"
                      isDragActive={isDragActive}
                      mainImg
                    >
                      Drag video here or click to view filesystem.
                    </DropzoneButton>
                  </div>
                )}
              </Dropzone>
            </div>
          </>
        );
      }}
    />
  );
};
