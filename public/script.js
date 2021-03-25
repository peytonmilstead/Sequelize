async function populateRestaurants() {
  const diningRequest = await fetch('/api/dining');
  const diningData = await diningRequest.json();

  diningData.data.forEach((restaurant) => {
    const appendItem = document.createElement('div');
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


//   const hallID = document.querySelector('.hallID');
//   const hallName = document.querySelector('.hallName');
//   const hallAddress = document.querySelector('.hallAddress');
//   const targetTable = document.querySelector('.targetTable');

//   const request = await fetch('/api/dining');
//   const data = await request.json();

//   const html = data.forEach((item) => `
//     <td><span class="hallID">${item.hall_id}</span></td>
//     <td><span class="hallName">${item.hall_name}</span></td>
//     <td><span class="hallAddress">${item.hall_address}</span></td>
//     `).join('');
//   targetTable.innerHTML = html;
}

async function windowActions() {
  await populateRestaurants();
}

window.onload = windowActions;

// code from thurs lecture
