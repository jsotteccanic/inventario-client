fetch('https://us-central1-inventario-app-aa28e.cloudfunctions.net/helloWorld')
.then(x=>x.json())
.then(x=>{
    document.getElementById("resultado").innerHTML = x;
})
.catch(err=> console.log(err));