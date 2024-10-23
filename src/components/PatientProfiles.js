import React, { useState, useEffect } from 'react';

function PatientProfiles() {
    const [patients, setPatients] = useState([]);
    const [newPatientName, setNewPatientName] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/patients')
            .then(response => response.json())
            .then(data => setPatients(data));
    }, []);

    const handleAddPatient = (e) => {
        e.preventDefault();
        const newPatient = { name: newPatientName };

        fetch('http://localhost:4000/patients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPatient),
        })
            .then(response => response.json())
            .then(data => {
                setPatients(patients.concat(data));
                setNewPatientName('');
            });
    };

    return (
        <div>
            <h2>Patients</h2>
            <ul>
                {patients.map(patient => (
                    <li key={patient.id}>{patient.name}</li>
                ))}
            </ul>
            <h3>Add a New Patient</h3>
            <form onSubmit={handleAddPatient}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={newPatientName}
                            onChange={e => setNewPatientName(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Add Patient</button>
            </form>
        </div>
    );
}

export default PatientProfiles;
