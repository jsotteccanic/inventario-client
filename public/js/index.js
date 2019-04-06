fetch('https://us-central1-inventario-app-aa28e.cloudfunctions.net/helloWorld')
    .then(x => x.text())
    .then(x => {
        document.getElementById("testService").innerHTML = x;
    })
    .catch(err => console.log(err));

data = {
    msj: "Esto es post"
}
fetch('https://us-central1-inventario-app-aa28e.cloudfunctions.net/helloWorld', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(x => x.text())
    .then(x => {
        document.getElementById("testService").innerHTML = x;
    })
    .catch(err => console.log(err));