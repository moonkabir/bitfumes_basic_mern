import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function TransactionForm() {
    function handleChange(){}
  return (
    <Card sx={{ minWidth: 275, marginTop:10 }}>
      <CardContent>
        <Typography variant="h6"> Add new Transaction</Typography>
        
        <form>
            <TextField sx={{marginRight:5}} size="smaill" id="outlined-basic" label="Amount" variant="outlined" />
            <TextField sx={{marginRight:5}} size="smaill" id="outlined-basic" label="Description" variant="outlined" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="Transaction Date"
                inputFormat="MM/DD/YYYY"
                onChange={handleChange}
                renderInput={(params) => <TextField sx={{marginRight:5}} size="smaill" {...params} />}
            />
            <Button variant="contained">Submit</Button>
            </LocalizationProvider>
        </form>
      </CardContent>
    </Card>
  );
}
