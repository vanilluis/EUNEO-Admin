// React&NextJS
import React, { useContext, useEffect, useState } from "react";
// Context&Auth
import { UIContext } from "../../context/UIContext";
// 3rd party libraries
import { useAnimation, AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// Services&Helper functions
// Hooks
import { useKeyDown } from "../../hooks/useKeyDown";
// Types
import { ProgramDay, ProgramPhase } from "../../types/formTypes";
// Styles
import s from "./Modal.module.scss";
// Components
import { Button } from "../core/button/Button";
import { Container } from "../core/container/Container";
import { Text } from "../core/text/Text";
import { WhiteBox } from "../core/whiteBox/WhiteBox";
import { Input } from "../core/input/Input";

type CopyType = {
  item: ProgramPhase | ProgramDay;
  type: "phases" | "days";
  index: number;
  dataList: Array<string>;
};

type Props = {
  item: CopyType;
  isOpen?: boolean;
  closeEvent?: Function;
  submitEvent: Function;
};

const CopyModal = ({ item, isOpen, submitEvent, closeEvent }: Props) => {
  const itemID = `${item.type[0]}${item.index + 1}`;
  const { uiState, setUIState } = useContext(UIContext);
  const [ref, inView] = useInView();
  const controls = useAnimation();

  const [copyData, setCopyData] = useState<
    Array<{ name: string; index: number }>
  >([]);

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

  useKeyDown(["Escape", "Enter"], ({ key }) => {
    if (key === "Escape" && isOpen) {
      closeEvent();
    } else if (key === "Enter" && isOpen) {
      const submitBtn = document.getElementById(
        "submit-btn"
      ) as HTMLButtonElement;
      if (submitBtn && !submitBtn.disabled) submitBtn.click();
    }
  });

  const addItem = (name: string, index: number) => {
    const updatedData = [...copyData];
    updatedData.push({ name, index });
    setCopyData([...updatedData]);
  };

  const removeItem = (name: string) => {
    const updatedData = copyData.filter((d) => d.name !== name);
    setCopyData([...updatedData]);
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
                <Text variant="h2">
                  Duplicate {item.type.slice(0, -1)} {item.index + 1}
                </Text>
                <Text variant="p-18">
                  What {item.type} would you like to paste data from{" "}
                  {`${itemID.toUpperCase()}`}?
                </Text>
                {item.dataList.map((name, index) => {
                  if (name !== itemID) {
                    return (
                      <Input
                        key={name}
                        type="checkbox"
                        label={name}
                        name={name}
                        onChange={(e: React.BaseSyntheticEvent) => {
                          if (e.target.checked) addItem(name, index);
                          else removeItem(name);
                        }}
                      />
                    );
                  }
                })}
              </div>
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
                <Button
                  id="submit-btn"
                  type="button"
                  disabled={copyData.length === 0}
                  className={s.button}
                  onClick={() => submitEvent(item, copyData)}
                >
                  Duplicate
                </Button>
              </div>
            </WhiteBox>
          </Container>
        </motion.div>
      </AnimatePresence>
    );
  }
  return null;
};

export default CopyModal;
