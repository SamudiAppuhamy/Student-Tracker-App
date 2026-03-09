import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [attendance, setAttendance] = useState("");
  const [marks, setMarks] = useState("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("students"));
    if (savedStudents) {
      setStudents(savedStudents);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = () => {

    if (!name || !course || !attendance || !marks) {
      alert("Please fill all fields");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      course,
      attendance: Number(attendance),
      marks: Number(marks)
    };

    setStudents([...students, newStudent]);

    setName("");
    setCourse("");
    setAttendance("");
    setMarks("");
  };

  const deleteStudent = (id) => {
    const updated = students.filter((student) => student.id !== id);
    setStudents(updated);
  };

  const calculateProgress = (attendance, marks) => {
    return ((attendance + marks) / 2).toFixed(1);
  };

  return (
    <div className="container">

      <h1>🎓 Student Tracker App</h1>

      <div className="form">

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <input
          type="number"
          placeholder="Attendance %"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
        />

        <input
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />

        <button onClick={addStudent}>Add Student</button>

      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Attendance</th>
            <th>Marks</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.course}</td>
              <td>{student.attendance}%</td>
              <td>{student.marks}</td>
              <td>
                <button
                  className="deleteBtn"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>

      <button className="finalBtn" onClick={() => setShowResult(true)}>
        Show Final Output
      </button>

      {showResult && (
        <div className="resultSection">

          <h2>📊 Student Progress</h2>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Attendance</th>
                <th>Marks</th>
                <th>Progress Score</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td>{student.attendance}%</td>
                  <td>{student.marks}</td>
                  <td>
                    {calculateProgress(student.attendance, student.marks)}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default App;