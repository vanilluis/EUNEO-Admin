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
  variant?: "ghost" | "text" | "arrow" | "icon" | "arrowL" | "ticker";
  disabled?: boolean;
  label?: string;
  arrowDirection?: "r" | "l" | "u" | "d";
  icon?:
    | "search"
    | "arrow"
    | "arrowL"
    | "upload"
    | "location"
    | "link"
    | "email"
    | "logo"
    | "info"
    | "dropdown"
    | "increase"
    | "decrease";
  children?: React.ReactNode;
  invert?: boolean;
  [key: string]: unknown;
};

export type SquareButtonType = {
  variant?: "text" | "icon";
  disabled?: boolean;
  label?: string;
  icon?: "increase" | "decrease" | "trash" | "copy";
  children?: React.ReactNode;
  width?: string;
  height?: string;
  color?: "green" | "blue" | "red";
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
