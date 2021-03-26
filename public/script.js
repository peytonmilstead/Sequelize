async function populateRestaurants() {
  const diningRequest = await fetch('/api/dining');
  const diningData = await diningRequest.json();

  const hallID = document.querySelector('.hallID');
  const hallName = document.querySelector('.hallName');
  const hallAddress = document.querySelector('.hallAddress');

  diningData.data.forEach((restaurant) => {
    const appendID = document.createElement('td');
    const appendName = document.createElement('td');
    const appendAddress = document.createElement('td');

    appendID.innerHTML = `
    <span>${restaurant.hall_id}</span>
    `;
    appendName.innerHTML = `
    <span>${restaurant.hall_name}</span>
    `;
    appendAddress.innerHTML = `
    <span>${restaurant.hall_address.split(',')[0]}</span>
    <span>${restaurant.hall_address.split(',')[1]}</span>
    `;
    
    hallID.append(appendID);
    hallName.append(appendName);
    hallAddress.append(appendAddress);
  });
}

async function windowActions() {
  await populateRestaurants();
  console.log('loaded');
}

window.onload = windowActions;
