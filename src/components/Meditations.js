import React, { useState, useEffect } from 'react';

function Meditations() {
    const [meditationSessions, setMeditationSessions] = useState([]);
    const [newSession, setNewSession] = useState({
        patientId: '',
        date: '',
        sessionLength: '',
        type: '',
        focus: ''
    });

    useEffect(() => {
        fetch('http://localhost:4000/meditation')
            .then(response => response.json())
            .then(data => setMeditationSessions(data))
            .catch(error => console.error('Error fetching meditation sessions:', error));
    }, []);

    const handleAddSession = (e) => {
        e.preventDefault();

        fetch('http://localhost:4000/meditation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSession),
        })
            .then(response => response.json())
            .then(data => {
                setMeditationSessions([...meditationSessions, data]);
                setNewSession({
                    patientId: '',
                    date: '',
                    sessionLength: '',
                    type: '',
                    focus: ''
                });
            })
            .catch(error => console.error('Error adding meditation session:', error));
    };

    const handleChange = (e) => {
        setNewSession({ ...newSession, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Meditation Sessions</h2>
            <ul>
                {meditationSessions.map((session, index) => (
                    <li key={index}>
                        Patient ID: {session.patientId}, Date: {session.date}, Session Length: {session.sessionLength}, Type: {session.type}, Focus: {session.focus}
                    </li>
                ))}
            </ul>
            <h3>Add a New Meditation Session</h3>
            <form onSubmit={handleAddSession}>
                <div>
                    <label>
                        Patient ID:
                        <input
                            type="number"
                            name="patientId"
                            value={newSession.patientId}
                            onChange={handleChange}
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
                            value={newSession.date}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Session Length (e.g., 20 minutes):
                        <input
                            type="text"
                            name="sessionLength"
                            value={newSession.sessionLength}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Type (e.g., Guided, Unguided):
                        <select
                            name="type"
                            value={newSession.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Guided">Guided</option>
                            <option value="Unguided">Unguided</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Focus (e.g., Mindfulness, Relaxation):
                        <input
                            type="text"
                            name="focus"
                            value={newSession.focus}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Add Meditation Session</button>
            </form>
        </div>
    );
}

export default Meditations;
