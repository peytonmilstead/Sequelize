window.onload = function () {
  const macroRequest = fetch('/api/macros');
  const macroData = macroRequest.json();
  macroData.data.forEach((meal) => {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      title: {
        text: 'Meal Macro Information'
      },
      axisX: {
        valueFormatString: 'DDD'
      },
      axisY: {
        prefix: '$'
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
        xValueFormatString: 'DD, MMM',
        yValueFormatString: '$#,##0',
        dataPoints: [{ x: meal.meal_id, y: meal.calories }]
      },
      {
        type: 'stackedBar',
        name: 'Carbs',
        showInLegend: 'true',
        xValueFormatString: 'DD, MMM',
        yValueFormatString: '$#,##0',
        dataPoints: [{ x: meal.meal_id, y: meal.carbs }]
      },
      {
        type: 'stackedBar',
        name: 'Protein',
        showInLegend: 'true',
        xValueFormatString: 'DD, MMM',
        yValueFormatString: '$#,##0',
        dataPoints: [{ x: meal.meal_id, y: meal.protein }]
      },
      {
        type: 'stackedBar',
        name: 'Fat',
        showInLegend: 'true',
        xValueFormatString: 'DD, MMM',
        yValueFormatString: '$#,##0',
        dataPoints: [{ x: meal.meal_id, y: meal.fat }]
      },
      {
        type: 'stackedBar',
        name: 'Sodium',
        showInLegend: 'true',
        xValueFormatString: 'DD, MMM',
        yValueFormatString: '$#,##0',
        dataPoints: [{ x: meal.meal_id, y: meal.sodium }]
      },
      {
        type: 'stackedBar',
        name: 'Cholesterol',
        showInLegend: 'true',
        xValueFormatString: 'DD, MMM',
        yValueFormatString: '$#,##0',
        dataPoints: [{ x: meal.meal_id, y: meal.cholesterol }]
      }
      ]
    });
  });
};

chart.render();
function toggleDataSeries(e) {
  if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
    e.dataSeries.visible = false;
  } else {
    e.dataSeries.visible = true;
  }
  chart.render();
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
    console.table(diningData.data);
  });
}

async function windowActions() {
  await populateRestaurants();
  console.log('loaded');
}

window.onload = windowActions;
