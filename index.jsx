import React from "react"
import ReactDOM from "react-dom/client"
import {useState} from "react"
import axios from "axios"
const App=()=>{
const[form,setForm]=useState({});
const[info,setInfo]=useState({});
const[users,setUsers]=useState({});

const handleSubmit=(e)=>{
e.preventDefault();    
console.log(form);
axios.post("http://localhost:8080/demo",form)
.then(  (res) => { 
    console.log(JSON.stringify(res.data))
setInfo(res.data);  
})

}

const getUser=()=>{
    axios.get("http://localhost:8080/user")
.then(  (res) => { 
    console.log(JSON.stringify(res.data))
setUsers(res.data);  
})
}




const handleForm=(e)=>{
console.log(e.target.name,e.target.value);
setForm({ 
 ...form,   
  [e.target.name]:e.target.value 
} 
)
}



    return(
        <>
        <h1>Hi</h1>
        <div   onClick={getUser}>Show Data</div>
<form onSubmit={handleSubmit}>
    {JSON.stringify(form)}
{JSON.stringify(users)}

 <span>username</span>   
<input type="text" name="username" onChange={handleForm}></input>
<span>age</span>   

<input type="text"  name="password" onChange={handleForm}></input>
<input type="submit"></input>
</form>


        </>
    )

}




ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
    <App/>
</React.StrictMode>

)