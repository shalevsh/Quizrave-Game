import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const AnswerMultiple = props => {
  const [value, setValue] = React.useState();

  const handleChange = event => {
    setValue(event.target.value);
    let correct_answer = props.data.correct_answer;
    if (event.target.value === correct_answer) {
      props.submit(true);
    } else {
      props.submit(false);
    }
  };



  const stripUserHandles = (string) => {
    let e = document.createElement('textarea');
    e.innerHTML = string;
    // handle case of empty input
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  const getOtherAns = () => {
    if (props.data && props.data.incorrect_answers) {
      let x = [];
      let ans = props.data.incorrect_answers;
      ans.forEach((data, index) => {
        x.push(
          <div key={`d${index}`} className="px-6 py-2 border-1 border-white rounded-lg">
            <FormControlLabel key={`i${index}`} className="flex gap-x-6 text-black" value={data} control={<Radio />} label={stripUserHandles(data)} />
          </div>
        );
      });
      return x;
    }
  };

  return (
    <FormControl>
      <RadioGroup
        key={"r1"}
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        className="flex flex-col gap-y-2"
      >

        {getOtherAns()}

      </RadioGroup>
    </FormControl>
  );
};

export default AnswerMultiple;
