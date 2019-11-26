import React, { useState, FC } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import arAxios from 'utils/axiosHelper';
import { TextField, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  popup: {
    zIndex: 999999
  }
}));

const ActorAutocomplete: FC<any> = ({selectedActor, setSelectedActor}) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [value, setValue] = useState('')
  const actorResults = useSelector<any, any>(({ search }) => search.data);
  const loading = open && options.length === 0;
  const classes: any = useStyles()


  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const value = await arAxios.get(`/api/v1/users/search`, {
        params: { value: '', type: 'displayName' }
      })

      if (active) {
        setOptions(value.data);
      }
    })();

    return () => {
      active = false;
    };
  }, [actorResults, loading, options, value]);
  return (
    <div>
      <label>Assigned To Actor: </label>
      <Autocomplete
        classes={{
          paper: classes.popup
        }}
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionLabel={option => option.displayName}
        value={selectedActor}
        onChange={(e, newActor) => { setSelectedActor(newActor) }}
        options={options}
        loading={loading}
        renderInput={params => (
          <TextField
            {...params}
            fullWidth
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            variant="standard"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default ActorAutocomplete;