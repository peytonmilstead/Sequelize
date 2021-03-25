async function populateRestaurants() {
  const diningRequest = await fetch('/api/dining');
  const diningData = await diningRequest.json();

  const targetBox = document.querySelector('.targetBox');


  diningData.data.forEach((restaurant) => {
    const appendItem = document.createElement("div");
    appendItem.classList.add('tile', 'has-text-centered', 'is-parent', 'is-3');
    appendItem.innerHTML = `
        <article class="tile is-child box has-background-link-dark">
        <span class="subtitle has-text-light has-text-weight-bold">${restaurant.hall_name}</span><br/>
        <span class="has-text-light">${restaurant.hall_address.split(',')[0]}</span><br/>
        <span class="has-text-light">${restaurant.hall_address.split(',')[1]}</span>
        </article>
        `;
    targetBox.append(appendItem);
  });
};

async function windowActions() {
  await populateRestaurants();
  console.log("loaded");
}

window.onload = windowActions;