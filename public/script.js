async function populateRestaurants() {
  const diningRequest = await fetch('/api/dining');
  const diningData = await diningRequest.json();

  const hallID = document.querySelector('.hallID');
  const hallName = document.querySelector('.hallName');
  const hallAddress = document.querySelector('.hallAddress');

  const targetArea = document.querySelector('.table');

  diningData.data.forEach((restaurant) => {
    const appendItem = document.createElement('tr');
    // const appendID = document.createElement('td')
    // const appendName = document.createElement('td');
    // const appendAddress = document.createElement('td');


    appendItem.innerHTML = `
    <td>${restaurant.hall_id}</td>
    <td>${restaurant.hall_name}</td>
    <td>${restaurant.hall_address.split(',')[0]}<br/>${restaurant.hall_address.split(',')[1]}</td>
    `;

    targetArea.append(appendItem);
  });
}

async function windowActions() {
  await populateRestaurants();
  console.log('loaded');
}

window.onload = windowActions;
