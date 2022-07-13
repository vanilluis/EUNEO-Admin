// React&NextJS
import { GetServerSideProps, NextPage } from "next";
// Services&Helper functions
import read from "../../services/read";
// Types
import { Exercise } from "../../types/types";
// Styles
// Components
import Meta from "../../components/meta/Meta";
import ProgramForm from "../../components/forms/ProgramForm";

type Props = {
  exercises: Exercise[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const exercises = await read.getExercises();

  return {
    props: {
      exercises: exercises,
    },
  };
};

const ProgramFormPage: NextPage<Props> = ({ exercises }) => {
  return (
    <>
      <Meta
        title="Create Program"
        seoTitle="Create Program"
        type="website"
        description="Create new program and add it to program collection."
        url="localhost:3000/program/form"
        image=""
      />
      <ProgramForm exercises={exercises} />
    </>
  );
};

export default ProgramFormPage;
