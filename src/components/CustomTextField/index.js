import React from "react";
import { TextInput } from "react-native-paper";

const CustomTextField = props => {
  return (
    <TextInput
      style={{ backgroundColor: "transparent" }}
      theme={{
        colors: {
          text: "#000",
          placeholder: "#000",
          primary: "#000",
        },
      }}
      underlineColor="#000"
      selectionColor="#3178C6"
      {...props}
    />
  );
};

export default CustomTextField;
