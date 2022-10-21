import {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const initialForm = {
    amount: 0,
    description:"",
    date: new Date(),
}

export default function TransactionForm({fetchTransactions}) {
    const [form, setForm] = useState(initialForm);
    function handleChange(e){
        console.log(e.target.value);
        setForm({
           ...form,[e.target.name]:e.target.value
        });
    }
    function handleDate(newValue){
        setForm({
            ...form,date:newValue
        });
    }
    async function handleSubmit(err){
        err.preventDefault();
        const res = await fetch("http://localhost:4000/transaction",{
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(res.ok){
            setForm(initialForm);
            fetchTransactions();
        }
    }
    return (
        <Card sx={{ minWidth: 275, marginTop:10 }}>
        <CardContent>
            <Typography variant="h6"> Add new Transaction</Typography>
            
            <form onSubmit={handleSubmit}>
                <TextField 
                    sx={{marginRight:5}} 
                    size="smaill" 
                    id="outlined-basic" 
                    label="Amount" 
                    variant="outlined" 
                    value={form.amount}
                    name="amount" 
                    onChange={handleChange} 
                />
                <TextField 
                    sx={{marginRight:5}} 
                    size="smaill" 
                    id="outlined-basic" 
                    label="Description" 
                    variant="outlined"
                    name="description" 
                    value={form.description}
                    onChange={handleChange} 
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Transaction Date"
                    inputFormat="MM/DD/YYYY"
                    onChange={handleDate}
                    value={form.date}
                    name="date" 
                    renderInput={(params) => <TextField sx={{marginRight:5}} size="smaill" {...params} />}
                />
                <Button variant="contained" type="submit">Submit</Button>
                </LocalizationProvider>
            </form>
        </CardContent>
        </Card>
    );
}
