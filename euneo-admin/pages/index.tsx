// React&NextJS
import { NextPage } from "next";
// Styles
import styles from "../styles/Home.module.scss";
import c from "classnames";
// Components
import { Button } from "../components/core/button/Button";
import { Container } from "../components/core/container/Container";
import { Section } from "../components/core/section/Section";
import { Text } from "../components/core/text/Text";

const Home: NextPage = () => {
  return (
    <>
      <Section>
        <Text variant="h1" align="center">
          Euneo - Admin page
        </Text>
      </Section>
      <Section>
        <Container>
          <div className={c(styles.container_item, styles.action_buttons)}>
            <Button to="/exercises/form">Create Exercise</Button>
            <Button to="/programs/form">Create Program</Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Home;
