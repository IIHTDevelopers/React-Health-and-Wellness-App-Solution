import React, { useState, useEffect } from "react";

function Workouts() {
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [newWorkoutLog, setNewWorkoutLog] = useState({
    patientId: "",
    date: "",
    exercises: [],
  });
  const [newExercise, setNewExercise] = useState({
    exerciseName: "",
    duration: "",
    intensity: "",
  });

  useEffect(() => {
    fetch("http://localhost:4000/workouts")
      .then((response) => response.json())
      .then((data) => setWorkoutLogs(data))
      .catch((error) => console.error("Error fetching workout logs:", error));
  }, []);

  const handleAddWorkoutLog = (e) => {
    e.preventDefault();

    const updatedExercises = [...newWorkoutLog.exercises, newExercise];
    const updatedWorkoutLog = { ...newWorkoutLog, exercises: updatedExercises };

    fetch("http://localhost:4000/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedWorkoutLog),
    })
      .then((response) => response.json())
      .then((data) => {
        setWorkoutLogs([...workoutLogs, data]);
        setNewWorkoutLog({
          patientId: "",
          date: "",
          exercises: [],
        });
        setNewExercise({
          exerciseName: "",
          duration: "",
          intensity: "",
        });
      })
      .catch((error) => console.error("Error adding workout log:", error));
  };

  const handleExerciseChange = (e) => {
    setNewExercise({ ...newExercise, [e.target.name]: e.target.value });
  };

  const handleWorkoutLogChange = (e) => {
    setNewWorkoutLog({ ...newWorkoutLog, [e.target.name]: e.target.value });
  };

  const handleAddExerciseToLog = (e) => {
    e.preventDefault();
    const updatedExercises = [...newWorkoutLog.exercises, newExercise];
    setNewWorkoutLog({ ...newWorkoutLog, exercises: updatedExercises });
    setNewExercise({ exerciseName: "", duration: "", intensity: "" }); // Reset exercise input form
  };

  return (
    <div>
      <h2>Workout Logs</h2>
      <ul>
        {workoutLogs.map((log, index) => (
          <li key={index}>
            Patient ID: {log.patientId}, Date: {log.date}, Exercises:{" "}
            {log.exercises
              .map(
                (exercise) =>
                  `${exercise.exerciseName} (${exercise.duration}, ${exercise.intensity})`
              )
              .join(", ")}
          </li>
        ))}
      </ul>
      <h3>Add a New Workout Log</h3>
      <form onSubmit={handleAddWorkoutLog}>
        <div>
          <label>
            Patient ID:
            <input
              type="number"
              name="patientId"
              value={newWorkoutLog.patientId}
              onChange={handleWorkoutLogChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={newWorkoutLog.date}
              onChange={handleWorkoutLogChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Exercise Name:
            <input
              type="text"
              name="exerciseName"
              value={newExercise.exerciseName}
              onChange={handleExerciseChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Duration (e.g., 30 minutes):
            <input
              type="text"
              name="duration"
              value={newExercise.duration}
              onChange={handleExerciseChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Intensity (e.g., High, Medium, Low):
            <select
              name="intensity"
              value={newExercise.intensity}
              onChange={handleExerciseChange}
              required
            >
              <option value="">Select Intensity</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
        </div>
        {/* <button type="button" onClick={handleAddExerciseToLog}>Add Exercise to Log</button> */}
        <button type="submit">Submit Workout Log</button>
      </form>
    </div>
  );
}

export default Workouts;
