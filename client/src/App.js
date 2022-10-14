import {useEffect,useState} from "react"
function App() {   
    const initialForm = {
        amount: 0,
        description:"",
        date: "",
    }
    const [form, setForm] = useState(initialForm);

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetchTransactions();
    },[]);

    async function fetchTransactions(){
        const res = await fetch("http://localhost:4000/transaction");
        const {data} = await res.json();
        setTransactions(data); 
    }

    function handleInput(e){
        console.log(e.target.value);
        setForm({
           ...form,[e.target.name]:e.target.value
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
        // const data = await res.json();
        // console.log(data);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    name="amount"
                    type="number" 
                    value={form.amount}
                    onChange={handleInput} 
                    placeholder="Enter transaction amount"
                />
                <input 
                    type="text" 
                    value={form.description}
                    onChange={handleInput} 
                    name="description"
                    placeholder="Enter transaction Details"
                />
                <input 
                    type="date"
                    value={form.date}
                    onChange={handleInput}
                    name="date"/>
                <button type="submit">Submit</button>
            </form>
            <br/>
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((trx) => (
                            <tr key={trx._id}>
                                <td>{trx.amount}</td>
                                <td>{trx.description}</td>
                                <td>{trx.date}</td>
                            </tr>
                        ))}                       
                    </tbody>
                </table>
            </section>
        </div>
    );
}
export default App;