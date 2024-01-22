import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
    let navigate= useNavigate();
    const [credential, setcredential] = useState({name:"",email:"",password:"",cpassword:""})

    const onsubmit= async(e)=>{
        e.preventDefault();
        if(credential.password!==credential.cpassword){
        const json= JSON.stringify({ name:credential.name,email: credential.email, password: credential.password,cpassword:credential.cpassword })
        console.log(json);
        props.showalert("password did not match","danger")

        // alert("password did not match")
        }else{
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
    
                },
                body: JSON.stringify({ name:credential.name,email: credential.email, password: credential.password,cpassword:credential.cpassword }),
            });
        const json= await response.json();
        console.log(json);

        if(json.success){
            //save the auth token and redirect 
            localStorage.setItem('token' , json.authtoken);
            navigate("/home");
            props.showalert("Account created suceessfully","success")


        }else{
            props.showalert("invalid Credentials","danger")
        }

        }
        

    }
    const onchange=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value})
    }
  return (
    <div>
    <form onSubmit={onsubmit} onChange={onchange}>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Name
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      name='name'
      value={credential.name}
    />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Email address
    </label>
    <input
      type="email"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      name='email'
      value={credential.email}
    />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
      name='password'
      value={credential.password}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Confirm Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
      name='cpassword'
      value={credential.cpassword}

    />
  </div>
  
  <button  type="submit" className="btn btn-primary">
    Submit
  </button>
</form>

    </div>
  )
}
