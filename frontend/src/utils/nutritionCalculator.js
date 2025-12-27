export const calculateNutritionGoals = (
  currentWeight,
  targetWeight
) => {
  const difference = targetWeight - currentWeight;

  let goalType = "maintain";
  if (difference > 0) goalType = "gain";
  if (difference < 0) goalType = "lose";

  let calories = 0;
  let protein = 0;

  if (goalType === "lose") {
    calories = Math.round(currentWeight * 22);
    protein = Math.round(currentWeight * 2.0);
  } else if (goalType === "gain") {
    calories = Math.round(currentWeight * 35);
    protein = Math.round(currentWeight * 2.2);
  } else {
    calories = Math.round(currentWeight * 30);
    protein = Math.round(currentWeight * 1.6);
  }

  const water = Number((currentWeight * 0.035).toFixed(1));

  return {
    goalType,
    calories,
    protein,
    water,
  };
};
