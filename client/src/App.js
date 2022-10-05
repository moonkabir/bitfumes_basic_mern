import {useState} from "react"
function App() {    
    const [form, setForm] = useState({
        amount: 0,
        description:"",
        date: "",
    })
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
            body: form,
        });
        console.log(res);
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
        </div>
    );
}
export default App;