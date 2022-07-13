// React&NextJS
import React, { useContext, useEffect } from "react";
// Context&Auth
import { UIContext } from "../../context/UIContext";
// 3rd party libraries
import { useAnimation, AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// Services&Helper functions
import { useKeyDown } from "../../hooks/useKeyDown";
// Styles
import s from "./Modal.module.scss";
// Components
import { Button } from "../core/button/Button";
import { Container } from "../core/container/Container";
import { Text } from "../core/text/Text";
import { WhiteBox } from "../core/whiteBox/WhiteBox";

type Props = {
  title: string;
  info?: string;
  isOpen?: boolean;
  closeEvent: Function;
  submitEvent: Function;
  secondaryBtn?: string;
  primaryBtn?: string;
};

const SuccessModal = ({
  title,
  info,
  isOpen,
  closeEvent,
  submitEvent,
  secondaryBtn,
  primaryBtn,
}: Props) => {
  const { uiState, setUIState } = useContext(UIContext);
  const [ref, inView] = useInView();
  const controls = useAnimation();

  useEffect(() => {
    if (isOpen) {
      setUIState({ ...uiState, canScroll: false });
    } else {
      setUIState({ ...uiState, canScroll: true });
    }
    return () => {
      setUIState({ ...uiState, canScroll: true });
    };
  }, [isOpen]);

  useKeyDown(["Escape"], ({ key }) => {
    if (key === "Escape" && isOpen) {
      closeEvent();
    }
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  // const checkIfClosing = (e: React.BaseSyntheticEvent) => {
  //   if (e.target?.parentNode?.id === "background") {
  //     closeEvent();
  //   }
  // };

  if (isOpen) {
    return (
      <AnimatePresence>
        <motion.div
          className={s.background}
          id="background"
          ref={ref}
          animate={isOpen ? "visible" : "hidden"}
          initial="hidden"
          exit="hidden"
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          variants={{
            visible: {
              opacity: 1,
            },
            hidden: {
              opacity: 0,
            },
          }}
        >
          <Container className={s.container}>
            <WhiteBox className={s.modal}>
              <div>
                <Text variant="h2">{title}</Text>
                {info && <Text variant="p-18">{info}</Text>}
              </div>
              <div className={s.buttons}>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    closeEvent();
                  }}
                  className={s.button}
                >
                  {secondaryBtn ?? "Cancel"}
                </Button>
                {submitEvent && (
                  <Button
                    type="button"
                    className={s.button}
                    onClick={() => submitEvent()}
                  >
                    {primaryBtn ?? "Submit"}
                  </Button>
                )}
              </div>
            </WhiteBox>
          </Container>
        </motion.div>
      </AnimatePresence>
    );
  }
  return null;
};

export default SuccessModal;
