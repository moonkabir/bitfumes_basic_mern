import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { create } from '@mui/material/styles/createTransitions';

const initialForm = {
    amount: 0,
    description:"",
    date: new Date(),
}

export default function TransactionForm({fetchTransactions, editTransaction}) {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        //console.log(editTransaction);
        if(editTransaction !== {}){
            setForm(editTransaction);
        }
    }, [editTransaction]);

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


        const res = editTransaction === {} ? create() : update();


        
        if(res.ok){
            setForm(initialForm);
            fetchTransactions();
        }

        async function create(){
            const res = await fetch("http://localhost:4000/transaction",{
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return res;
        }


        async function update(){
            const res = await fetch(`http://localhost:4000/transaction/${editTransaction._id}`,{
                method: "PATCH",
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return res;
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
                </LocalizationProvider>

                {editTransaction !== {} && (
                    <Button variant="contained" type="submit">Update</Button>
                )}

                {editTransaction === {} && (
                    <Button variant="contained" type="submit">Submit</Button>
                )}



                {/* <Button variant="contained" type="submit">Submit</Button> */}
                
            </form>
        </CardContent>
        </Card>
    );
}
