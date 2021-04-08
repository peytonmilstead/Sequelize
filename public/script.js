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

  selectedMeals.forEach((meal) => {
    const mealCal = [meal.meal_name, meal.calories];
    console.log(mealCal);
  });

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
      // dataPoints: mealCal
      dataPoints: [
        { y: selectedMeals[0].calories },
        { y: selectedMeals[1].calories },
        { y: selectedMeals[2].calories },
        { y: selectedMeals[3].calories },
        { y: selectedMeals[4].calories },
        { y: selectedMeals[5].calories },
        { y: selectedMeals[6].calories },
        { y: selectedMeals[7].calories },
        { y: selectedMeals[8].calories },
        { y: selectedMeals[9].calories }
      ]
    },
    {
      type: 'stackedBar',
      name: 'Carbs',
      showInLegend: 'true',
      dataPoints: [
        { y: selectedMeals[0].carbs },
        { y: selectedMeals[1].carbs },
        { y: selectedMeals[2].carbs },
        { y: selectedMeals[3].carbs },
        { y: selectedMeals[4].carbs },
        { y: selectedMeals[5].carbs },
        { y: selectedMeals[6].carbs },
        { y: selectedMeals[7].carbs },
        { y: selectedMeals[8].carbs },
        { y: selectedMeals[9].carbs }
      ]
    },
    {
      type: 'stackedBar',
      name: 'Protein',
      showInLegend: 'true',
      dataPoints: [
        { y: selectedMeals[0].protein },
        { y: selectedMeals[1].protein },
        { y: selectedMeals[2].protein },
        { y: selectedMeals[3].protein },
        { y: selectedMeals[4].protein },
        { y: selectedMeals[5].protein },
        { y: selectedMeals[6].protein },
        { y: selectedMeals[7].protein },
        { y: selectedMeals[8].protein },
        { y: selectedMeals[9].protein }
      ]
    },
    {
      type: 'stackedBar',
      name: 'Fat',
      showInLegend: 'true',
      dataPoints: [
        { y: selectedMeals[0].fat },
        { y: selectedMeals[1].fat },
        { y: selectedMeals[2].fat },
        { y: selectedMeals[3].fat },
        { y: selectedMeals[4].fat },
        { y: selectedMeals[5].fat },
        { y: selectedMeals[6].fat },
        { y: selectedMeals[7].fat },
        { y: selectedMeals[8].fat },
        { y: selectedMeals[9].fat }
      ]
    },
    {
      type: 'stackedBar',
      name: 'Sodium',
      showInLegend: 'true',
      dataPoints: [
        { y: selectedMeals[0].sodium },
        { y: selectedMeals[1].sodium },
        { y: selectedMeals[2].sodium },
        { y: selectedMeals[3].sodium },
        { y: selectedMeals[4].sodium },
        { y: selectedMeals[5].sodium },
        { y: selectedMeals[6].sodium },
        { y: selectedMeals[7].sodium },
        { y: selectedMeals[8].sodium },
        { y: selectedMeals[9].sodium }
      ]
    },
    {
      type: 'stackedBar',
      name: 'Cholesterol',
      showInLegend: 'true',
      dataPoints: [
        { y: selectedMeals[0].cholersterol },
        { y: selectedMeals[1].cholersterol },
        { y: selectedMeals[2].cholersterol },
        { y: selectedMeals[3].cholersterol },
        { y: selectedMeals[4].cholersterol },
        { y: selectedMeals[5].cholersterol },
        { y: selectedMeals[6].cholersterol },
        { y: selectedMeals[7].cholersterol },
        { y: selectedMeals[8].cholersterol },
        { y: selectedMeals[9].cholersterol }
      ]
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
