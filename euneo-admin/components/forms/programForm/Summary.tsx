// React&NextJS
import React, { useEffect, useState } from "react";
// 3rd party libraries
// import {
//   Canvas,
//   NodeProps,
//   Node,
//   NodeData,
//   EdgeData,
//   CanvasPosition,
// } from "reaflow";
// Types
// Styles
import s from "../Form.module.scss";
// Components
import { Text } from "../../core/text/Text";
import { ProgramFormData, ProgramPhase } from "../../../types/formTypes";
import { Button } from "../../core/button/Button";

type Props = {
  data: ProgramFormData;
};

export const Summary = ({ data }: Props) => {
  const [selectedPhase, setSelectedPhase] = useState<number>(0);
  // const [nodes, setNodes] = useState<Array<NodeData>>([]);
  // const [edges, setEdges] = useState<Array<EdgeData>>([]);
  // const [canvasWidth, setCanvasWidth] = useState<number>(0);
  // const [canvasHeight, setCanvasHeight] = useState<number>(0);

  // useEffect(() => {
  //   getNodes();
  //   getEdges();
  //   getRect();
  // }, []);

  // const getNodes = () => {
  //   const nodes = data.phases.map((p, i) => {
  //     return {
  //       id: `p${i + 1}`,
  //       text: `P${i + 1}`,
  //       disabled: true,
  //     };
  //   });

  //   setNodes(nodes);
  // };

  // const getEdges = () => {
  //   const reducer = (
  //     prevVal: Array<EdgeData>,
  //     currVal: ProgramPhase,
  //     index: number
  //   ) => {
  //     const pid = `p${index + 1}`;
  //     if (currVal["next-phase"]) {
  //       currVal["next-phase"].forEach((np, i) => {
  //         const edge = {
  //           id: `${pid}-${np.reference}`,
  //           text: `${np["min-pain"]} to ${np["max-pain"]}`,
  //           from: `${pid}`,
  //           to: `${np.reference}`,
  //           disabled: true,
  //         };
  //         prevVal.push(edge);
  //       });
  //     }
  //     return prevVal;
  //   };

  //   const edges = data.phases.reduce(reducer, []) || [];
  //   console.log(edges);

  //   setEdges(edges);
  // };

  // const getRect = () => {
  //   const canvas_item = document.getElementsByTagName("g")[0];
  //   const item_rect = canvas_item?.getBoundingClientRect() || null;

  //   if (item_rect && item_rect.width > 0) {
  //     setCanvasWidth(item_rect.width + 50);
  //     setCanvasHeight(item_rect.height + 50);
  //   } else {
  //     setCanvasWidth(0);
  //     setCanvasHeight(0);
  //     setTimeout(() => {
  //       getRect();
  //     }, 500);
  //   }
  // };

  return (
    <div className={s.form_inner}>
      <div className={s.array_title}>
        <Text variant="h3">Summary</Text>
      </div>
      <div className={s.summary}>
        <div className={s.array_pagination}>
          <Button
            type="button"
            variant="arrow"
            arrowDirection="l"
            style={{ gap: "0" }}
            disabled={selectedPhase === 0}
            onClick={() => setSelectedPhase((prev: number) => prev - 1)}
          />
          <Text variant="h4">Phase {selectedPhase + 1}</Text>
          <Button
            type="button"
            variant="arrow"
            style={{ gap: "0" }}
            disabled={selectedPhase === data.phases.length - 1}
            onClick={() => setSelectedPhase((prev: number) => prev + 1)}
          />
        </div>
        {data.phases[selectedPhase].days.map((day, index: number) => {
          const dayIndex = parseInt(day[1]) - 1;
          const dayData = data.days[dayIndex];
          return (
            <div key={index} className={s.day_summary}>
              <Text variant="h6">Day {index + 1}</Text>
              {dayData.exercises.map((ex, index: number) => (
                <div key={`ex-${index}`}>
                  <Text variant="p">{ex.name}</Text>
                  <div className={s.exercise_summary}>
                    <Text variant="p-small">Reps: {ex.reps}</Text>
                    <Text variant="p-small">Sets: {ex.sets}</Text>
                    {ex.quantity > 0 && (
                      <Text variant="p-small">Quantity: {ex.quantity}</Text>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
        {data.phases[selectedPhase]["next-phase"].length > 0 && (
          <div className={s.day_summary}>
            <Text variant="h6">Next Phases</Text>
            {data.phases[selectedPhase]["next-phase"].map(
              (np, index: number) => (
                <div key={index}>
                  <Text variant="p">{np.reference.toUpperCase()}</Text>
                  <div className={s.exercise_summary}>
                    <Text variant="p-small">
                      - Pain index between {np["min-pain"]} and {np["max-pain"]}
                    </Text>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
      {/* <div className={s.array_title}>
        <Text variant="h3">Program Setup</Text>
      </div> */}
      {/* <div id="my-canvas" className={s.next_phase_summary}>
        <Canvas
          maxHeight={canvasHeight}
          maxWidth={canvasWidth}
          defaultPosition={CanvasPosition.LEFT}
          direction="RIGHT"
          nodes={nodes}
          edges={edges}
          className={s.program_setup}
          onLayoutChange={(layout) => console.log("Layout", layout)}
          // node={(node: NodeProps) => (
          //   // <Node
          //   //   {...node}

          //   //   // onClick={() => {
          //   //   //   console.log("click");
          //   //   // }}
          //   // />
          // )}
        />
      </div> */}
    </div>
  );
};
