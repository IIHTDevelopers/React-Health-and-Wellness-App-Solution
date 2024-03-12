import React from 'react';
import PatientProfiles from './components/PatientProfiles';
import MealPlans from './components/MealPlans';
import Workouts from './components/Workouts';
import Meditations from './components/Meditations';

function App() {
  return (
    <div>
      <h1>Health and Wellness Platform</h1>
      <PatientProfiles />
      <MealPlans />
      <Workouts />
      <Meditations />
    </div>
  );
}

export default App;