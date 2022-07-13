// React&NextJS
import { NextPage } from "next";
// Styles
// Components
import ExerciseForm from "../../components/forms/ExerciseForm";
import Meta from "../../components/meta/Meta";

const ExerciseFormPage: NextPage = () => {
  return (
    <>
      <Meta
        title="Create Exercise"
        seoTitle="Create Exercise"
        type="website"
        description="Create new exercise and add it to exercises collection."
        url="localhost:3000/exercises/form"
        image=""
      />
      <ExerciseForm />
    </>
  );
};

export default ExerciseFormPage;
