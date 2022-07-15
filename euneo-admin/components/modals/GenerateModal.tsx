// React&NextJS
import React, { useContext, useEffect, useState } from "react";
// Context&Auth
import { UIContext } from "../../context/UIContext";
// 3rd party libraries
import { useAnimation, AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// Services&Helper functions
// Styles
import s from "./Modal.module.scss";
import c from "classnames";
// Components
import { Button } from "../core/button/Button";
import { Container } from "../core/container/Container";
import { Text } from "../core/text/Text";
import { WhiteBox } from "../core/whiteBox/WhiteBox";
import { useKeyDown } from "../../hooks/useKeyDown";

type Props = {
  type: "days" | "phases";
  isOpen?: boolean;
  closeEvent?: Function;
  submitEvent: Function;
};

const GenerateModal = ({ type, isOpen, submitEvent, closeEvent }: Props) => {
  const { uiState, setUIState } = useContext(UIContext);
  const [generateValue, setGenerateValue] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [mapArray, setMapArray] = useState<Array<any>>([]);
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

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  useKeyDown(["Escape"], ({ key }) => {
    if (key === "Escape" && isOpen) {
      closeEvent();
    }
  });

  const getInfoText = () => {
    if (page === 1) {
      return `How many ${type} do you want to create?`;
    } else if (page === 2) {
      return "Specify length of each phase:";
    }
  };

  const updateArray = (value: string, index: number) => {
    const length = parseInt(value) || 0;
    const mappedArr = [...mapArray];
    mappedArr[index] = length;
    setMapArray(mappedArr);
  };

  const isZeroLengthPhase = () => {
    let zeroVal = false;
    if (mapArray.length > 0) {
      mapArray.forEach((phaseLength) => {
        if (phaseLength === 0) {
          zeroVal = true;
        }
      });
    }

    return zeroVal;
  };

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
                <Text variant="h2">Generate {type}</Text>
                <Text variant="p-18">{getInfoText()}</Text>
              </div>
              {page === 1 && (
                <input
                  type="number"
                  placeholder={`No. ${type}...`}
                  min="1"
                  onChange={(e: React.BaseSyntheticEvent) =>
                    setGenerateValue(parseInt(e.target.value) || 0)
                  }
                />
              )}

              {page === 2 &&
                mapArray.map((p, index) => [
                  <div key={index}>
                    <Text variant="p">Phase {index + 1}</Text>
                    <input
                      type="number"
                      placeholder="Length of phase in days..."
                      min="1"
                      onChange={(e: React.BaseSyntheticEvent) => {
                        updateArray(e.target.value, index);
                      }}
                    />
                  </div>,
                ])}
              <br />
              <div className={s.buttons}>
                <Button
                  type="button"
                  variant="ghost"
                  className={s.button}
                  onClick={closeEvent}
                >
                  Close
                </Button>
                {(type === "days" || page === 2) && (
                  <Button
                    type="button"
                    disabled={generateValue < 1 || isZeroLengthPhase()}
                    className={s.button}
                    onClick={() => submitEvent(type, generateValue, mapArray)}
                  >
                    Generate
                  </Button>
                )}
                {type === "phases" && page === 1 && (
                  <Button
                    type="button"
                    disabled={generateValue < 1}
                    className={s.button}
                    onClick={() => {
                      setMapArray(new Array(generateValue).fill(0));
                      setPage((p: number) => p + 1);
                    }}
                  >
                    Next
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

export default GenerateModal;
