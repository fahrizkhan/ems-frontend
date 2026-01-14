import React, { useState } from 'react'
import { createEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const EmployeeComponent = () => {

   const [firstname, setFirstname] = useState('')
   const [lastname, setLastname] = useState('')
   const [email, setEmail] = useState('')

   const navigator = useNavigate();

   const saveEmployee = (e) => {
       e.preventDefault();
        const employee = { firstname, lastname, email };
        console.log(employee);

        createEmployee(employee).then((response) => {
            console.log("Employee added successfully", response.data);
            navigator('/employees');
        }).catch((error) => {
            console.error("Something went wrong", error);
        });
    }
  return (
    <div>
        <div className="container">
            <br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center"> Add Employee </h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label"> First Name: </label>
                                <input 
                                    type="text"
                                    placeholder="Enter First Name"
                                    name="firstname"
                                    className="form-control"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                ></input>
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label"> Last Name: </label>
                                <input 
                                    type="text"
                                    placeholder="Enter Last Name"
                                    name="lastname"
                                    className="form-control"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                ></input>
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label"> Email: </label>
                                <input 
                                    type="text"
                                    placeholder="Enter Email"
                                    name="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                            </div>

                            <button className="btn btn-success" onClick={saveEmployee} > Submit </button>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent