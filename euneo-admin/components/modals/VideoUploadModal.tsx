// React&NextJS
import React, { useContext, useEffect } from "react";
// Context&Auth
import { UIContext } from "../../context/UIContext";
// 3rd party libraries
import { useAnimation, AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// Styles
import s from "./Modal.module.scss";
import classnames from "classnames";
// Components
import { Container } from "../core/container/Container";
import { Text } from "../core/text/Text";
import { WhiteBox } from "../core/whiteBox/WhiteBox";

const c = classnames.bind(s);

type Props = {
  progress: number;
  isOpen?: boolean;
};

const VideoUploadModal = ({ progress, isOpen }: Props) => {
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

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

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
            delayChildren: 0.2,
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
            <WhiteBox className={c(s.modal, s.submitModal)}>
              {progress === 100 ? (
                <>
                  <div>
                    <Text variant="h2" align="center">
                      Uploading ...
                    </Text>
                    <Text variant="p-18">
                      Finishing setting up your video, it can take some time.
                      Please do not leave this page.
                    </Text>
                  </div>
                  <div className={s.loader}>
                    <div className={s.loaderInside}></div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Text variant="h2" align="center">
                      Uploading ...
                    </Text>
                    <Text variant="p-18">
                      We are uploading your video, please wait a moment.
                    </Text>
                  </div>
                  {/* <div className={s.loader}>
                                <div className={s.loaderInside}></div>
                            </div> */}
                  <Text className={c(s.progressText)} variant="h6">
                    {progress}%
                  </Text>
                  {progress && (
                    <div
                      className={c(s.progress)}
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </>
              )}
            </WhiteBox>
          </Container>
        </motion.div>
      </AnimatePresence>
    );
  }
  return null;
};

export default VideoUploadModal;
