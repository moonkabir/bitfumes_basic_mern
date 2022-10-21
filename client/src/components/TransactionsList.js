import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import IconButton from '@mui/material/IconButton';
export default function TransactionsList({transactions,fetchTransactions}) {
    async function remove(_id) {
        if(! window.confirm("Are you sure you want to remove this transaction")) return;
        console.log(_id);
        const res = await fetch(`http://localhost:4000/transaction/${_id}`,{
            method: 'DELETE',
        });
        if(res.ok){
            fetchTransactions();
            window.alert("Transaction removed successfully");
        }
    }
    return (
        <>
        <Typography sx={{marginTop: 10}} variant="h6"> List of Transaction</Typography>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Amount</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.amount}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>
                                <IconButton color="primary" component="label">
                                    <EditSharpIcon/>
                                </IconButton>
                                <IconButton color="warning" component="label" onClick={()=>remove(row._id)}>
                                    <DeleteSharpIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}
