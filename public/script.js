function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getMeals() {
  console.log('data request');
  const mealRequest = await fetch('/api/wholeMeal');
  const mealData = await mealRequest.json();
  return mealData;
}

async function macroChart() {
  const results = await getMeals();
  const meals = results.data;

  // get randomly selected meals
  const mealArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const selectedMeals = mealArray.map((element) => {
    const random = getRandomIntInclusive(0, meals.length - 1);
    return meals[random];
  });
  console.table(selectedMeals);

  // create chart containing macro data for random meals

  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: 'Macro Data for UMD Dining Hall Meals'
    },
    axisX: {
      title: 'Meal Name'
    },
    axisY: {
      title: 'Macro Info'
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer',
      itemclick: toggleDataSeries
    },
    data: [{
      type: 'stackedBar',
      name: 'Calories',
      showInLegend: 'true',
      // xValueFormatString: '##########',
      // yValueFormatString: '####',
      dataPoints: [{ x: selectedMeals.calories, y: selectedMeals.meal_name }]
    },
    {
      type: 'stackedBar',
      name: 'Carbs',
      showInLegend: 'true',
      dataPoints: [{ x: selectedMeals.carbs, y: selectedMeals.meal_name }]
    },
    {
      type: 'stackedBar',
      name: 'Protein',
      showInLegend: 'true',
      dataPoints: [{ x: selectedMeals.protein, y: selectedMeals.meal_name }]
    },
    {
      type: 'stackedBar',
      name: 'Fat',
      showInLegend: 'true',
      dataPoints: [{ x: selectedMeals.fat, y: selectedMeals.meal_name }]
    },
    {
      type: 'stackedBar',
      name: 'Sodium',
      showInLegend: 'true',
      dataPoints: [{ x: selectedMeals.sodium, y: selectedMeals.meal_name }]
    },
    {
      type: 'stackedBar',
      name: 'Cholesterol',
      showInLegend: 'true',
      dataPoints: [{ x: selectedMeals.cholesterol, y: selectedMeals.meal_name }]
    }]
  });
  chart.render();
  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
}

async function populateRestaurants() {
  const diningRequest = await fetch('/api/dining');
  const diningData = await diningRequest.json();

  const targetArea = document.querySelector('.table');

  diningData.data.forEach((restaurant) => {
    const appendItem = document.createElement('tr');

    appendItem.innerHTML = `
    <td>${restaurant.hall_id}</td>
    <td>${restaurant.hall_name}</td>
    <td>${restaurant.hall_address.split(',')[0]}<br/>${restaurant.hall_address.split(',')[1]}</td>
    `;

    targetArea.append(appendItem);
  });
}

async function windowActions() {
  // meal macro chart
  console.log('loaded window');
  await macroChart();

  // dining hall table
  await populateRestaurants();
  console.log('loaded');
}

window.onload = windowActions;
