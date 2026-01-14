import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

   const [firstname, setFirstname] = useState('')
   const [lastname, setLastname] = useState('')
   const [email, setEmail] = useState('')

   const { id } = useParams();
   const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: ''
   })

   const navigator = useNavigate();

   useEffect(() => {
         if (id) {
            getEmployeeById(id).then((response) => {
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                setEmail(response.data.email);
            }).catch((error) => {
                console.error(error);
            })
         }
   }, [id])

   const saveOrupdateEmployee = (e) => {
       e.preventDefault();
       
        if (validateForm()) {
            const employee = { firstname, lastname, email };
            console.log(employee);

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch((error) => {
                    console.error(error);
                })
            }else {
                createEmployee(employee).then((response) => {
                console.log("Employee added successfully", response.data);
                navigator('/employees');
            }).error((error) => {
                console.error(error);
            })
        }
    }
}

    function validateForm() {
        let valid = true;
        
        const errorCopy = { ...errors };
        
        if (firstname.trim()) {
            errorCopy.firstname = '';
        } else {
            errorCopy.firstname = 'First name is required';
            valid = false;
        }

        if (lastname.trim()) {
            errorCopy.lastname = '';
        } else {
            errorCopy.lastname = 'Last name is required';
            valid = false;
        }

        if (email.trim()) {
            errorCopy.email = '';
        } else {
            errorCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorCopy);
        return valid;
    }
    
    function pageTitle() {
        if (id) {
            return <h2 className="text-center"> Update Employee </h2>
        }
        return <h2 className="text-center"> Add Employee </h2>
    }

  return (
    <div>
        <div className="container">
            <br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label"> First Name: </label>
                                <input 
                                    type="text"
                                    placeholder="Enter First Name"
                                    name="firstname"
                                    className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                ></input>
                                {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label"> Last Name: </label>
                                <input 
                                    type="text"
                                    placeholder="Enter Last Name"
                                    name="lastname"
                                    className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                ></input>
                                {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label"> Email: </label>
                                <input 
                                    type="text"
                                    placeholder="Enter Email"
                                    name="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <button className="btn btn-success" onClick={saveOrupdateEmployee} > Submit </button>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent