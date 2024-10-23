import React, { useState, useEffect } from "react";

function MealPlans() {
  const [mealPlans, setMealPlans] = useState([]);
  const [newMealPlan, setNewMealPlan] = useState({
    patientId: "",
    date: "",
    meals: [],
  });
  const [mealToAdd, setMealToAdd] = useState({
    mealType: "",
    description: "",
  });

  useEffect(() => {
    fetch("http://localhost:4000/mealPlans")
      .then((response) => response.json())
      .then((data) => setMealPlans(data))
      .catch((error) => console.error("Error fetching meal plans:", error));
  }, []);

  const handleAddMealPlan = (e) => {
    e.preventDefault();

    // Add the current meal to the meal plan before submitting
    const updatedMeals = [...newMealPlan.meals, mealToAdd];
    const updatedMealPlan = { ...newMealPlan, meals: updatedMeals };

    fetch("http://localhost:4000/mealPlans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMealPlan),
    })
      .then((response) => response.json())
      .then((data) => {
        setMealPlans([...mealPlans, data]);
        setNewMealPlan({
          patientId: "",
          date: "",
          meals: [],
        });
        setMealToAdd({
          mealType: "",
          description: "",
        });
      })
      .catch((error) => console.error("Error adding meal plan:", error));
  };

  const handleMealChange = (e) => {
    setMealToAdd({ ...mealToAdd, [e.target.name]: e.target.value });
  };

  const handleMealPlanChange = (e) => {
    setNewMealPlan({ ...newMealPlan, [e.target.name]: e.target.value });
  };

  const handleAddMealToPlan = (e) => {
    e.preventDefault();
    const updatedMeals = [...newMealPlan.meals, mealToAdd];
    setNewMealPlan({ ...newMealPlan, meals: updatedMeals });
    setMealToAdd({ mealType: "", description: "" }); // Reset meal input form
  };

  return (
    <div>
      <h2>Meal Plans</h2>
      <ul>
        {mealPlans.map((plan, index) => (
          <li key={index}>
            Patient ID: {plan.patientId}, Date: {plan.date}, Meals:{" "}
            {plan.meals
              .map((meal) => `${meal.mealType}: ${meal.description}`)
              .join(", ")}
          </li>
        ))}
      </ul>
      <h3>Add a New Meal Plan</h3>
      <form onSubmit={handleAddMealPlan}>
        <div>
          <label>
            Patient ID:
            <input
              type="number"
              name="patientId"
              value={newMealPlan.patientId}
              onChange={handleMealPlanChange}
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
              value={newMealPlan.date}
              onChange={handleMealPlanChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Meal Type:
            <input
              type="text"
              name="mealType"
              value={mealToAdd.mealType}
              onChange={handleMealChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={mealToAdd.description}
              onChange={handleMealChange}
              required
            />
          </label>
        </div>
        {/* <button type="button" onClick={handleAddMealToPlan}>Add Meal to Plan</button> */}
        <button type="submit">Submit Meal Plan</button>
      </form>
    </div>
  );
}

export default MealPlans;
