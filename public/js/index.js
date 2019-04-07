// // Ejemplo de conexión
// fetch('https://us-central1-inventario-app-aa28e.cloudfunctions.net/helloWorld')
//     .then(x => x.text())
//     .then(x => {
//         document.getElementById("testService").innerHTML = x;
//     })
//     .catch(err => alert(err));
var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        window.location.href = "./login.html";
    }
});

function cerrarSession() {
    firebase.auth().signOut().then(function () {
        window.location.href = "./index.html";
    }, function (error) {
        console.error('Sign Out Error', error);
    });
}

// VALIDACIONES DE FORMULARIOS
$('#presentacion')
    .form({
        fields: {
            codPresentacion: {
                identifier: 'codPresentacion',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor ingresa un código'
                    }
                ]
            },
            nombrePresentacion: {
                identifier: 'nombrePresentacion',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor ingresa un nombre'
                    }
                ]
            }
        },
        onSuccess: (event, inputs) => {
            event.preventDefault();
            registrarFirebase(event.target.id, inputs);
        }
    });
$('#almacen')
    .form({
        fields: {
            codPresentacion: {
                identifier: 'codigoAlmacen',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor ingresa un código'
                    }
                ]
            },
            nombrePresentacion: {
                identifier: 'nombreAlmacen',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor ingresa un nombre'
                    }
                ]
            }
        },
        onSuccess: (event, inputs) => {
            event.preventDefault();
            registrarFirebase(event.target.id, inputs);
        }
    });
$('#laboratorio')
    .form({
        fields: {
            codPresentacion: {
                identifier: 'codigoLaboratorio',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor ingresa un código'
                    }
                ]
            },
            nombrePresentacion: {
                identifier: 'nombreLaboratorio',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor ingresa un nombre'
                    }
                ]
            }
        },
        onSuccess: (event, inputs) => {
            event.preventDefault();
            registrarFirebase(event.target.id, inputs);
        }
    });
// PRINCIPIO ACTIVO 
$('#principioActivo')
    .form({
        fields: {
            codPresentacion: {
                identifier: 'codigoPrincipioActivo',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor ingresa un código'
                    }
                ]
            },
            nombrePresentacion: {
                identifier: 'nombrePrincipioActivo',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor ingresa un nombre'
                    }
                ]
            }
        },
        onSuccess: (event, inputs) => {
            event.preventDefault();
            registrarFirebase(event.target.id, inputs);
        }
    });
// REGISTRO DE PROVEEDORES
$('#proveedor')
    .form({
        fields: {
            ruc: {
                identifier: 'ruc',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor ingresa un ruc'
                    }
                ]
            },
            nombretipoDocumento: {
                identifier: 'nombretipoDocumento',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor ingresa un nombre de la razón social'
                    }
                ]
            },
            direccion: {
                identifier: 'direccion',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor ingresa una dirección'
                    }
                ]
            },
            telefono: {
                identifier: 'telefono',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor ingresa un número de teléfono'
                    }
                ]
            }
        },
        onSuccess: (event, inputs) => {
            event.preventDefault();
            registrarFirebase(event.target.id, inputs);
        }
    });
// TIPO DE DOCUMENTO
$('#tipoDocumento')
    .form({
        fields: {
            codigotipoDocumento: {
                identifier: 'codigotipoDocumento',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el codigo de documento'
                    }
                ]
            },
            nombretipoDocumento: {
                identifier: 'nombretipoDocumento',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el nombre del documento'
                    }
                ]
            }
        },
        onSuccess: (event, inputs) => {
            event.preventDefault();
            registrarFirebase(event.target.id, inputs);
        }
    });


// #############
function registrarFirebase(colecion, data) {
    db.collection(colecion).add(data)
        .then(function () {
            alert("Document successfully written!");
            $(`#${colecion}`).form('clear')
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
            $(`#${colecion}`).form('clear')
        });
}

function obtenerDatosFirebase(e) {
    e.preventDefault();
    let opt = document.getElementById("selectColeccion");
    let thead = document.getElementById("headResult");
    thead.innerHTML="";
    let tbody = document.getElementById("bodyResutl");
    tbody.innerHTML="";
    let result = [];
    db.collection(opt.value).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            result.push(doc.data());
        });
        if (result.length > 0) {
            Object.keys(result[0]).forEach(x => {
                let th = document.createElement("th");
                th.innerText = x;
                thead.appendChild(th);
            });
        }
        result.forEach(x => {
            let tr = document.createElement("tr");
            for(valor in x){
                let td = document.createElement("td");
                td.innerText = x[valor];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });
    });
}

// Object.keys(doc.data()).forEach(x => {
//     let th = document.createElement('th');
//     th.innerHTML = x;
//     thead.appendChild(th);
// });
// console.log(doc.id, " => ", doc.data());