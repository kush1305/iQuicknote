import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

export default function Login(props) {

    let navigate= useNavigate();

    const [credential, setcredential] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ email: credential.email, password: credential.password }),
        });

        const json = await response.json();
        console.log(json);

        if(json.success){
            //save the auth token and redirect 
            localStorage.setItem('token' , json.authtoken);
            navigate("/home");
            props.showalert("logged in suceessfully","success")


        }else{
            props.showalert("Invalid Credentials","danger")
        }
    }
    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value });

    }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        name="email"
                        value={credential.email}
                        aria-describedby="emailHelp"
                        onChange={onChange}
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
                        value={credential.password}
                        name='password'
                        onChange={onChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

        </div>
    )
}
