import './App.css';
import {useState} from "react";
import Axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [studentList, setStudentList] = useState([]);
 
  
  const addStudent = () => {
    Axios.post('http://localhost:3001/create', {name: name,age: age,gender: gender,department: department,
    state: state,district: district}).then( () => {
      console.log('Success');
    });
  };

  const getStudent = () => {
    Axios.get('http://localhost:3001/students').then( (response) => {
      setStudentList(response.data);
    });
  };

  const updateStudentAge = (id) => {
    Axios.put('http://localhost:3001/update',{age: newAge, id : id}).then( (response) => {
      alert('Updated');
      setStudentList(studentList.map((val)=> {
        return val.id === id ? {
          id: val.id, 
          name: val.name, 
          age: val.newAge,
          gender: val.gender,
          district: val.district,
          state: val.state,
          department: val.department
        } : val
      }))
    });
  }
  const deleteStudent = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then( (response) => {
        setStudentList(
          studentList.filter((val)=>{
            return val.id === id
        })
      );
    });
  }
  return (
    <div className="App">
      <div className="Info"> 
      <label>Name:</label>
      <input type = "text" 
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <label>Age:</label>
      <input type = "number" 
        onChange={(event) => {
          setAge(event.target.value);
        }}
      />
      <label>Gender:</label>
      <input type = "text" 
        onChange={(event) => {
          setGender(event.target.value);
        }}
      />
      <label>Department:</label>
      <input type = "text" 
        onChange={(event) => {
          setDepartment(event.target.value);
        }}
      />
      <label>State:</label>
      <input type = "text" 
        onChange={(event) => {
          setState(event.target.value);
        }}
      />
      <label>District:</label>
      <input type = "text" 
        onChange={(event) => {
          setDistrict(event.target.value);
        }}
      />
      <button onClick={addStudent}>Add Student</button>
      </div>

      <div className = "students">
      <button onClick={getStudent}>Show Students</button>
        {studentList.map((val,key) => {
          return (
            <div className = "details">
              <div>
                <h3>Name: {val.Name}</h3>
                <h3>Age: {val.Age}</h3>
                <h3>Gender: {val.Gender}</h3>
                <h3>Department: {val.Department}</h3>
                <h3>State: {val.State}</h3>
                <h3>District: {val.District}</h3>
              </div>
              <div> 
                {" "}
                <input 
                  type="text" 
                  placeholder="Enter the value..."
                  onChange = {(event) => {
                      setNewAge(event.target.value);
                  }}
                />
                <button 
                  onClick={()=>{
                    updateStudentAge(val.id);
                }}
                >Update</button>
                <button 
                  onClick = {() => {
                    deleteStudent(val.id);
                  }} >
                Delete</button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default App;
