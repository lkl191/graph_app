export const dataArray = (props) => {
  let labelArray = [];
  let valueArray = [];
  for (let i = 0; i < props.length; i++) {
    //labelの配列
    labelArray[i] = props[i].label;
    //valueの配列
    valueArray[i] = props[i].value;
  }
  return {
    labelArray,
    valueArray,
  };
};

export const putValue = (props) => {
  let labelArray = [];
  let valueArray = [];
  for (let i = 0; i < props.length; i++) {
    //labelの配列に文字列"value"を追加
    labelArray[i] = { value: props[i].label };
    //valueの配列文字列"value"を追加
    valueArray[i] = { value: props[i].value };
  }
  return {
    labelArray,
    valueArray,
  };
};