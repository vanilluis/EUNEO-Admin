import { ProgramPhase } from "../types/formTypes";

const programHelperFunctions = () => {
  return {
    validatePhase: (p: ProgramPhase) => {
      if (p) {
        if (p?.days?.length === 0) {
          return "Phases must have at least one exercise day";
        }
        const noValueDayIndex = p.days?.findIndex((d) => !d);

        if (noValueDayIndex >= 0) {
          return "All days must have a value selected";
        }

        if (p["next-phase"].length > 0) {
          let painValuesSelected = [];
          let fieldsValid = { valid: true, msg: "" };
          p["next-phase"].forEach((np) => {
            if (
              isNaN(np["max-pain"]) ||
              isNaN(np["min-pain"]) ||
              !np.reference
            ) {
              fieldsValid = {
                valid: false,
                msg: "All fields in a next phase object must have a value selected",
              };
            } else if (np["max-pain"] <= np["min-pain"]) {
              fieldsValid = {
                valid: false,
                msg: "Max pain must be higher than min pain value",
              };
            }
            for (let i = np["min-pain"]; i <= np["max-pain"]; i++) {
              if (painValuesSelected.includes(i)) {
                fieldsValid = {
                  valid: false,
                  msg: "Min and max pain values cannot overlap values from other phase",
                };

                return;
              }
              painValuesSelected.push(i);
            }
          });

          return fieldsValid.valid || fieldsValid.msg;
        }
      }

      return true;
    },
    updateNextPhases: (phases: ProgramPhase[], phaseIndex: number) => {
      const phaseIndexList = phases.map((p, i) => `p${i + 1}`);
      const phaseID = `p${phaseIndex + 1}`;

      return phases.map((p, i) => {
        const pid = `p${i + 1}`;
        const nextPhases = p["next-phase"].map((np) => {
          if (!phaseIndexList.includes(np.reference)) {
            return { ...np, reference: "" };
          } else if (phaseIndexList.includes(np.reference) && pid === phaseID) {
            return { ...np, reference: "" };
          }
          return { ...np };
        });

        return { ...p, "next-phase": nextPhases };
      });
    },
  };
};
export default programHelperFunctions();
