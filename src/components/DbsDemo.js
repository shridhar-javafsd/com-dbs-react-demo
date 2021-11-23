import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const DbsDemo = () => {

    const [empList, setEmpList] = useState([]);
    const [emp, setEmp] = useState({
        eid: 0,
        firstName: '',
        salary: 0
    });
    const [oneEmp, setOneEmp] = useState({
        eid: 0,
        firstName: '',
        salary: 0
    });

    // useEffect(() => {
    //     setEmp(
    //         {
    //             eid: 0,
    //             firstName: '',
    //             salary: 0
    //         }
    //     );
    //     setOneEmp({
    //         eid: 0,
    //         firstName: '',
    //         salary: 0
    //     });
    // }, []);

    const handleEmpData = (evt) => {
        console.log("handleEmpData", evt.target.name, evt.target.value);
        setEmp({
            ...emp,
            [evt.target.name]: evt.target.value
        });
    }

    // work here 
    const handleOneEmpData = (evt) => {
        console.log("handleOneEmpData", evt.target.name, evt.target.value);
        setOneEmp({
            ...emp,
            [evt.target.name]: evt.target.value
        });
    }

    const submitAddEmp = (evt) => {
        console.log("submitEmpData");
        // transactionAmount = amount * 1.025; 
        axios.post('http://localhost:8082/emp/add-emp', emp)
            .then((response) => {
                setOneEmp(response.data);
                alert("Employee added successfully.");
            }).catch(error => {
                console.log(error.message);
            });
        evt.preventDefault();
    }

    const submitGetEmpById = (evt) => {
        console.log("submitGetEmpById");
        axios.get(`http://localhost:8082/emp/get-emp/${oneEmp.eid}`)
            .then((response) => {
                setOneEmp(response.data);
                console.log(response.data.eid);
            }).catch(error => {
                // alert(error.message);
                console.log(error);
                console.log(error.message);
            });
        evt.preventDefault();
    }
    const submitGetAllEmp = (evt) => {
        console.log("submitGetAllEmp");
        axios.get('http://localhost:8082/emp/getallemps')
            .then((response) => {
                setEmpList(response.data);
            }).catch(error => {
                console.log(error.message)
            });
        evt.preventDefault();
    }

    return (
        <div className="container" >
            <h1 className="display-4 text-primary">DBS Spring Boot Demo App</h1>
            <p></p>
            <div>
                <p>Add a new Employee</p>
                <form className="form form-group row" onSubmit={submitAddEmp} >
                    <div>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control mb-3"
                            value={emp.firstName}
                            placeholder="First Name"
                            onChange={handleEmpData}
                        />
                        <input
                            type="number"
                            id="salary"
                            name="salary"
                            className="form-control mb-3"
                            placeholder="Salary"
                            onChange={handleEmpData}
                        />
                        <input
                            type="submit"
                            id="submit"
                            name="submit"
                            className="btn btn-primary mb-3"
                            value="Add Employee"
                        />
                    </div>
                </form>
                <p> {emp.eid} {emp.firstName} {emp.salary} </p>
            </div>
            <div>
                <p>Get Employee by Eid</p>
                <form className="form form-group row border border-primary pt-3 pb-3 px-3 py-3" onSubmit={submitGetEmpById} >
                    <div>
                        <input
                            type="number"
                            id="eid"
                            name="eid"
                            className="form-control mb-3"
                            value={oneEmp.eid}
                            placeholder="Employee Id"
                            onChange={handleOneEmpData}
                        />
                        <input
                            type="submit"
                            id="submit"
                            name="submit"
                            className="btn btn-primary mb-3"
                            value="Get Employee"
                        />
                    </div>
                </form>
                <p> {oneEmp.eid} {oneEmp.firstName} {oneEmp.salary} </p>
            </div>

            <div>
                <p>Get All Employees' Data</p>
                <div>
                    <input
                        type="submit"
                        id="submit"
                        name="submit"
                        className="btn btn-primary mb-3"
                        value="Get All Emps"
                        onClick={submitGetAllEmp}
                    />
                </div>
                <div className="Container text-left">
                    <div>
                        <p>EID FIRST NAME SALARY</p>
                    </div>
                    {empList.map((e, k) => {
                        console.log(e);
                        return (
                            <div k={k}>
                                {e.eid}  {e.firstName} {e.salary}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
export default DbsDemo;


