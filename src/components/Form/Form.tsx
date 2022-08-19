import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { SubmitButton, SubmitButtonIcon } from './Form.styles';
import { TForm } from './Form.types';


const Form = ({handleSubmitCallback}: TForm) => {

  const [sizeX, setSizeX] = useState(8);
  const [sizeXError, setSizeXError] = useState('');

  const [sizeY, setSizeY] = useState(8);
  const [sizeYError, setSizeYError] = useState('');

  const [holes, setHoles] = useState(8);
  const [holesError, setHolesError] = useState('');

  useEffect(() => {
    handleHoles(holes);
  }, [sizeX, sizeY])

  const handleSize = (setSize, setSizeError) => (ev) => {
    const value = parseInt(ev.target.value);
    setSize(value)
    if (value < 4) {
      setSizeError('Field size should be at least 4x4');
      return;
    }
    if (value > 100) {
      setSizeError('Field size limited to 100x100');
      return;
    }
    setSizeError('');
  }

  const handleHoles = (value: number) => {
    setHoles(value)
    if (value < 4) {
      setHolesError('At least 4 holes');
      return;
    }
    if (value > (sizeX * sizeY - 9)) {
      setHolesError('Too much holes for selected board size');
      return;
    }
    setHolesError('');
  }

  const handleSubmit = (ev) => {
    handleSubmitCallback({ sizeX, sizeY, holes });
    ev.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField id="sizeX" label="Width" variant="outlined" required type={"number"}
                 inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                 value={sizeX}
                 error={!!sizeXError}
                 helperText={sizeXError}
                 onChange={handleSize(setSizeX, setSizeXError)}
      />
      <TextField id="sizeY" label="Height" variant="outlined" required type={"number"}
                 inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                 value={sizeY}
                 error={!!sizeYError}
                 helperText={sizeYError}
                 onChange={handleSize(setSizeY, setSizeYError)}
      />
      <TextField id="holes" label="Holes" variant="outlined" required type={"number"}
                 inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                 value={holes}
                 error={!!holesError}
                 helperText={holesError}
                 onChange={(ev) => handleHoles(parseInt(ev.target.value))}
      />

      <SubmitButton
        type="submit"
        variant="contained"
        color="primary"
      >
        Start game <SubmitButtonIcon/>
      </SubmitButton>
    </form>
  );
}

export default Form;
