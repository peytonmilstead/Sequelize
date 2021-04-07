window.onload = function () {
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
    }
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
};

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
