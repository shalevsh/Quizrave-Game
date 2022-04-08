import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
// import AssignmentIcon from '@mui/icons-material/DoneAllOutlined';
// import CancelOutlined from '@mui/icons-material/CancelOutlined';
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { red, green } from "@mui/material/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AnswerBoolean = props => {
  // Showing the boolean type answer here here
  const [value, setValue] = React.useState();
  
  // When use select an Answer it checks either its wrong or correct
  // if its correct it return true to parent component where  the next question present

  useEffect(() => {
    setValue(props.data.correct_answer)
    console.log(value)
  }, [])
  const handleChange = event => {
    if (event === value) {
      props.submit(true);
    } else {
      props.submit(false);
    }
  };

  return (
    <div className="flex flex-row justify-center mt-4">
      <div onClick={() => handleChange("True")} className="ml-2">
        <Avatar
          sx={{
            bgcolor: green[500],
            width: 100,
            height: 100,
            borderRadius: 50
          }}
          variant="rounded"
        >
          <FontAwesomeIcon icon={faCheck} style={{ fontSize: "60px" }} />
        </Avatar>
      </div>

      <div onClick={() => handleChange("False")} className="ml-4">
        <Avatar
          sx={{ bgcolor: red[500], width: 100, height: 100, borderRadius: 50 }}
          variant="rounded"
        >
          <FontAwesomeIcon icon={faXmark} style={{ fontSize: "60px" }} />
        </Avatar>
      </div>
    </div>
  );
};

export default AnswerBoolean;
