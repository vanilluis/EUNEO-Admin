import { DocumentReference } from "firebase/firestore";
import React from "react";

export type Exercise = {
  id: string;
  ref?: DocumentReference;
  name: string;
  type: string;
  steps: Array<string>;
  tips: Array<string>;
  videoLink: string;
};

export type ButtonType = {
  to?: string;
  variant?: "ghost" | "text" | "arrow" | "icon" | "arrowL";
  disabled?: boolean;
  label?: string;
  arrowDirection?: "r" | "l" | "u" | "d";
  icon?:
    | "search"
    | "calendar"
    | "arrow"
    | "arrowL"
    | "upload"
    | "mobile"
    | "location"
    | "link"
    | "email"
    | "logo"
    | "share"
    | "info"
    | "dot"
    | "dropdown";
  children?: React.ReactNode;
  invert?: boolean;
  [key: string]: unknown;
};

export type TooltipType = {
  disabled?: boolean;
  setClicked?: Function;
  clicked?: boolean;
  children?: React.ReactNode;
  text?: string;
  [key: string]: unknown;
};
