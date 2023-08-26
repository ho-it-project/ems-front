import React from "react";
import style from "./spinner.module.css";

interface ISpinnerProps {
  color?: "gray";
}

const Spinner = ({ color = "gray" }: ISpinnerProps) => {
  return (
    <div className={style.spinner}>
      <div className={`lds-spinner mx-auto lds-spinner-${color}`}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default React.memo(Spinner);
