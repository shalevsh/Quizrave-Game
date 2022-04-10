import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { ThemeContext, themes } from "../../theme";
import { useHistory } from "react-router-dom";


const Settings = () => {
  let history = useHistory();
  const [UIDifficulty, setUIDifficulty] = useState('')
  const [voiceMode, setVoiceMode] = useState(localStorage.getItem("voicemode") ? localStorage.getItem("voicemode") : "off")
  const [isLight, setIsLight] = useState(false)
  const selectDifficulty = difficulty => {

    setUIDifficulty(difficulty);
    localStorage.setItem("uidifficulty", difficulty);
    if (difficulty === 'default') {
      localStorage.setItem("difficulty", difficulty[Math.floor(Math.random() * difficulty.length)]);
    } else {
      localStorage.setItem("difficulty", difficulty);
    }
    history.push("/");
  };

  const selectVoiceMode = mode => {
    localStorage.setItem('blindMode', mode)
    localStorage.setItem("voicemode", mode);
    setVoiceMode(mode)
  }

  useEffect(() => {
    if (localStorage.getItem("uidifficulty")) {
      setUIDifficulty(localStorage.getItem("uidifficulty"));
    }
    if (localStorage.getItem('isDark') && localStorage.getItem('isDark') === "true") {
      setIsLight(true);
    }
    else {
      setIsLight(false);
    }
  }, [])

  const selectDark = (isDark) => {
    localStorage.setItem('isDark', isDark);
    setIsLight(isDark);
  }
  return (
    <div className="App ">
      <div className="w-full flex justify-end p-4">
        <button
          onClick={() => history.push('/')}
          className=" mr-4 bg-green-800 text-white py-2 px-2 rounded-md shadow-2xl flex items-center gap-x-3 justify-center">
          <span>Back</span>

        </button>


      </div>
      <header className="App-header flex justify-center items-center"
        style={{ minHeight: "90vh" }}>
        <div className="flex flex-col justify-center text-center shadow-2xl rounded-2xl px-52 py-20">
          <div>
            <h4 className="text-green_900">Select Theme</h4>
          </div>

          {/* In the below Code im Updating the theme of the Application via context */}
          <ThemeContext.Consumer>
            {({ changeTheme }) =>
              <div className="relative flex flex-row justify-center mt-8 gap-x-4">
             
                <FormControlLabel
                  onClick={() => { changeTheme(themes.light); selectDark(false) }}
                  checked={isLight ? false : true}
                  value={!isLight}
                  control={<Radio />}
                  label="Light"
                />
                <FormControlLabel
                  onClick={() => { changeTheme(themes.dark); selectDark(true) }}
                  checked={isLight ? true : false}
                  value={isLight}
                  control={<Radio />}
                  label="Dark"
                />
              </div>}
          </ThemeContext.Consumer>

          {
          /* In the below Code im Updating Difficulty level as you can 
                see the radio button when change it update that */}
          <div className="mt-14">
            <FormControl>
              <p>Difficulty</p>
              <RadioGroup
                className="flex items-center gap-x-14"
                row
                onChange={event => {
                  selectDifficulty(event.target.value);
                }}
                value={UIDifficulty}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="default"
                  control={<Radio />}
                  label="Random"
                />
                <FormControlLabel
                  value="easy"
                  control={<Radio />}
                  label="Easy"
                />
                <FormControlLabel
                  value="medium"
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel
                  value="hard"
                  control={<Radio />}
                  label="Hard"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="mt-14">
            <FormControl>
              <p>Voice Mode</p>
              <RadioGroup
                className="flex items-center gap-x-14"
                row
                onChange={event => {
                  let x = event.target.value
                  selectVoiceMode(x.toString())
                }}
                value={voiceMode}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="on"
                  control={<Radio />}
                  label="On"
                />
                <FormControlLabel
                  value="off"
                  control={<Radio />}
                  label="Off"
                />

              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Settings;
