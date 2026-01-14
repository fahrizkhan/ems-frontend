import React, { useEffect, useState } from 'react'
import { listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import { deleteEmployee } from '../services/EmployeeService'

function ListEmployeeComponent() {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, [])

    function fetchEmployees() {
        listEmployees().then((response) => {
        setEmployees(response.data)
        
        }).catch((error) => {
            console.error(error)
        })
    }
    function addNewEmployee() {
        navigator('/add-employee');
    }

    function editEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        console.log("Delete employee with id: " + id);

        deleteEmployee(id).then((response) => {
            console.log("Employee deleted successfully", response.data);
            fetchEmployees();
        }).catch((error) => {
            console.error(error);
        })
    }

  return (
    <div className="container">

        <h2 className="text-center">Employees List</h2>
        <button className="btn btn-primary mb-2" onClick={addNewEmployee}> Add Employee </button>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstname}</td>
                            <td>{employee.lastname}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => editEmployee(employee.id)} > Update </button>
                                <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={() => removeEmployee(employee.id)}> Delete </button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent