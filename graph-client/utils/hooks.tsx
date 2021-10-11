import React, { useState } from "react";
import { GraphType, IdType, UserType } from "../types/types";

export const useForm = (
  callback,
  initialState: GraphType | UserType | IdType
) => {
  const [input, setValues] = useState(initialState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...input, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callback();
  };

  const onDefaultChange = (name, value) => {
    setValues({...input, [name]: value})
  }

  return {
    onChange,
    onSubmit,
    onDefaultChange,
    input,
  };
};

export const useDataForm = (initialState = {}) => {
  const [inputData, setValues] = useState(initialState);

  const dataChange = (event) => {
    let tmp = {
      label: [],
      value: [],
    };
    for (let i = 0; i < event.length; i++) {
      for (let ii = 0; ii < event[i].length; ii++) {
        if (event[0][ii].value != null) {
          tmp.label[ii] = event[0][ii].value;
        }
        if (event[i][ii].value != null) {
          tmp.value[ii] = event[i][ii].value;
        }
      }
    }
    setValues(tmp);
  };
  return {
    inputData,
    dataChange,
  };
};
