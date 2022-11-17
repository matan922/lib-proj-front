/////////////////// CLIENTS ///////////////////


const displayClients = async () => {
    let res = await fetch("http://127.0.0.1:5000/client/").then((response) => response.json())
    clientList.innerHTML = res.map((client, ind) =>
        `<div> <h3 style="color: red"> Client name: ${client['clientName']} </h3> 
    <img src='https://picsum.photos/20${ind}'> 
    <h3> ID: ${client['id']} <br> Age: ${client['age']} <br> City: ${client['city']} </h3>
    <button onclick="delClient(${client['id']})">Delete</button></div>`).join('')
}
displayClients()

const delClient = async (id) => {
    await fetch(`http://127.0.0.1:5000/client/client_del/${id}`, { method: 'GET' })
    displayClients()
}

const addClient = async () => {
    // if (fieldsAreInvalid()) return;
    await fetch('http://127.0.0.1:5000/client/add_client', {
        method: 'POST',
        body: JSON.stringify({
            clientname: clientName.value,
            age: age.value,
            city: city.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    displayClients()
}
