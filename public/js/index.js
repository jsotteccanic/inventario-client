// // Ejemplo de conexión
// fetch('https://us-central1-inventario-app-aa28e.cloudfunctions.net/helloWorld')
//     .then(x => x.text())
//     .then(x => {
//         document.getElementById("testService").innerHTML = x;
//     })
//     .catch(err => alert(err));
var db = firebase.firestore();

// vista admin consulta de datos
let opt = document.getElementById("selectColeccion");
// registro de datos formulario de maestro de articulo
let _presentacion = document.getElementById("_presentacion");
let _principioActivo = document.getElementById("_principioActivo");
let _laboratorio = document.getElementById("_laboratorio");
let _subClase = document.getElementById("_subClase");
let _clase = document.getElementById("_clase");

////Reactivar - validación de autenticación
// firebase.auth().onAuthStateChanged(function (user) {
//     if (!user) {
//         window.location.href = "./index.html";
//     }
// });

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

//Agregando regla personalizada
let min = document.getElementById("_minimo");
$.fn.form.settings.rules.minMaxValidate = function (a=0, b) {
    let minimo = parseInt(min.value);
    return (minimo> a)?false:true;
};

// MAESTRO DE ARTICULO
$('#maestroDeArticulo')
    .form({
        fields: {
            _codigoArticulo: {
                identifier: '_codigoArticulo',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el codigo'
                    }
                ]
            },
            _nombreArticulo: {
                identifier: '_nombreArticulo',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el nombre'
                    }
                ]
            },
            _multiplo: {
                identifier: '_multiplo',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el multiplo'
                    }
                ]
            },
            _presentacion: {
                identifier: '_presentacion',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingrese la presentación'
                    }
                ]
            },
            _costoCompra: {
                identifier: '_costoCompra',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingrese el costo'
                    }
                ]
            },
            _principioActivo: {
                identifier: '_principioActivo',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa  el principio activo'
                    }
                ]
            },
            _laboratorio: {
                identifier: '_laboratorio',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el laboratorio'
                    }
                ]
            },
            _clase: {
                identifier: '_clase',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa la clase'
                    }
                ]
            },
            _subClase: {
                identifier: '_subClase',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa la sub clase'
                    }
                ]
            },
            _stock: {
                identifier: '_stock',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el stock'
                    }
                ]
            },
            _lote: {
                identifier: '_lote',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el lote'
                    }
                ]
            },
            _fechaVencimiento: {
                identifier: '_fechaVencimiento',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa la fecha'
                    }
                ]
            },
            _minimo: {
                identifier: '_minimo',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa un valor'
                    }
                ]
            },
            _maximo: {
                identifier: ['_maximo','_minimo'],
                rules: [
                    // {
                    //     type: 'empty',
                    //     prompt: 'Ingresa un valor'
                    // },
                    {
                        type: 'minMaxValidate',
                        prompt: 'El valor máximo no puede ser menos que el mínimo'
                    }
                ]
            },
            _codigoBarra: {
                identifier: '_codigoBarra',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa codigo de barra'
                    }
                ]
            },
            _igv: {
                identifier: '_igv',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el igv'
                    }
                ]
            },
            _vvf: {
                identifier: '_vvf',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el vvf'
                    }
                ]
            },
            _pvf: {
                identifier: '_pvf',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el pvf'
                    }
                ]
            },
            _pvp: {
                identifier: '_pvp',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el pvp'
                    }
                ]
            },
            _incremento: {
                identifier: '_incremento',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el incremento'
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
// TIPO DE DOCUMENTO
$('#tipoSalida')
    .form({
        fields: {
            nombreTipoSalida: {
                identifier: 'nombreTipoSalida',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el nombre del tipo de salida'
                    }
                ]
            },
            correlativoSalida: {
                identifier: 'correlativoSalida',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el número de correlativo'
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
$('#tipoIngreso')
    .form({
        fields: {
            nombreTipoIngreso: {
                identifier: 'nombreTipoIngreso',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el nombre del tipo de ingreso'
                    }
                ]
            },
            correlativoIngreso: {
                identifier: 'correlativoIngreso',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el número de correlativo'
                    }
                ]
            }
        },
        onSuccess: (event, inputs) => {
            event.preventDefault();
            registrarFirebase(event.target.id, inputs);
        }
    });
// REGISTRO DE ARTICULO

// Reglas personalizada
$.fn.form.settings.rules.fechaActual = function (a, b) {
    let d1 = new Date(a);
    let d2 = new Date();
    return (d1 >= d2)
};

$('#articulo')
    .form({
        fields: {
            _proveedor: {
                identifier: '_proveedor',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa un proveedor'
                    }
                ]
            },
            _tipoDocumento: {
                identifier: '_tipoDocumento',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el tipo de documento'
                    }
                ]
            },
            _fechaRegistroArticulo: {
                identifier: '_fechaRegistroArticulo',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa la fecha'
                    }
                ]
            },
            _numeroDocumento: {
                identifier: '_numeroDocumento',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el número de documento'
                    }
                ]
            },
            _almacen: {
                identifier: '_almacen',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa un almacen'
                    }
                ]
            },
            _producto: {
                identifier: '_producto',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Seleccione un producto'
                    }
                ]
            },
            _costo: {
                identifier: '_costo',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingrese el costo'
                    }
                ]
            },
            _cantidad: {
                identifier: '_cantidad',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingrese la cantidad'
                    }
                ]
            },
            _lote: {
                identifier: '_lote',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el lote'
                    }
                ]
            },
            _fechaVencimiento: {
                identifier: '_fechaVencimiento',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Selecciona la fecha de vencimiento'
                    },
                    {
                        type: 'fechaActual',
                        prompt: 'No puede ingresar una fecha menor a la actual'
                    }
                ]
            }
        },
        onSuccess: (event, inputs) => {
            event.preventDefault();
            registrarFirebase(event.target.id, inputs);
        }
    });
// Funciones
function registrarFirebase(colecion, data) {
    db.collection(colecion).add(data)
        .then(function () {
            alert("Se registor correctamente");
            $(`#${colecion}`).form('clear')
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
            $(`#${colecion}`).form('clear')
        });
}

function obtenerDatosFirebase(e) {
    e.preventDefault();

    let thead = document.getElementById("headResult");
    thead.innerHTML = "";
    let tbody = document.getElementById("bodyResutl");
    tbody.innerHTML = "";
    let result = [];
    db.collection(opt.value).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            let nDoc = doc.data();
            nDoc.id = doc.id;
            result.push(nDoc);
        });
        if (result.length > 0) {
            Object.keys(result[0]).forEach(x => {
                if (x !== "id") {
                    let th = document.createElement("th");
                    th.innerText = x;
                    thead.appendChild(th);
                }

            });
        }
        // agregando la columna de control
        let th = document.createElement("th");
        th.innerText = 'Control';
        thead.appendChild(th)

        //Agregando contenido a al tbody
        result.forEach(x => {
            let tr = document.createElement("tr");
            tr.id = x.id;
            for (valor in x) {
                let td = document.createElement("td");
                td.innerText = x[valor];
                tr.appendChild(td);
                if (valor == 'id') {
                    td.innerHTML = `<i class="trash icon" onclick="eliminarRegistro(event)"></i> <i class="edit icon" onclick="editarRegistro(event)"></i>`;
                    tbody.appendChild(tr);
                }
            }

        });
    });
}

function eliminarRegistro(e) {
    db.collection(opt.value).doc(e.target.parentElement.parentElement.id).delete().then(function () {
        alert("El documento se eliminó correctamente");
        obtenerDatosFirebase(e);
    }).catch(function (error) {
        alert("Error removing document: ", error);
    });

}

// OBTENCION DE DATOS - GET

//funcion temporal para el maestro de articulo
function cargarDatosFormularioArticulo() {
    getDataPresentacion()
    getDataPricipioActivo()
    getDataLaboratorio()
    getDataSubClase()
    //     getDataClase()
}
// _presentacion
// _principioActivo
// _laboratorio
// _subClase
// _clase

function getDataPresentacion() {
    db.collection("presentacion").get().then(function (querySnapshot) {
        _presentacion.innerHTML = "";
        let data = [{ codPresentacion: "", nombrePresentacion: "Seleccione" }];
        querySnapshot.forEach(function (doc) {
            data.push(doc.data());
        });
        data.forEach(x => {
            let opt = document.createElement("option");
            opt.value = x.codPresentacion;
            opt.innerText = x.nombrePresentacion;
            _presentacion.appendChild(opt)
        });
    });
}
function getDataPricipioActivo() {
    db.collection("principioActivo").get().then(function (querySnapshot) {
        _principioActivo.innerHTML = "";
        let data = [{ codigoPrincipioActivo: "", nombrePrincipioActivo: "Seleccione" }];
        querySnapshot.forEach(function (doc) {
            data.push(doc.data());
        });
        data.forEach(x => {
            let opt = document.createElement("option");
            opt.value = x.codigoPrincipioActivo;
            opt.innerText = x.nombrePrincipioActivo;
            _principioActivo.appendChild(opt)
        });
    });
}
function getDataLaboratorio() {
    db.collection("laboratorio").get().then(function (querySnapshot) {
        _laboratorio.innerHTML = "";
        let data = [{ codigoLaboratorio: "", nombreLaboratorio: "Seleccione" }];
        querySnapshot.forEach(function (doc) {
            data.push(doc.data());
        });
        data.forEach(x => {
            let opt = document.createElement("option");
            opt.value = x.codigoLaboratorio;
            opt.innerText = x.nombreLaboratorio;
            _laboratorio.appendChild(opt)
        });
    });
}

// variables para la funcion getDataSubClase();
let clase, subClase;
function getDataSubClase() {
    db.collection("clase").get().then(function (querySnapshot) {

        _clase.innerHTML = "";
        _subClase.innerHTML = "";
        clase = [{ id: "", nombre: "Seleccione", subClase: { id: "", nombre: "" } }];
        subClase = [{ id: "", nombre: "Seleccione" }];
        querySnapshot.forEach(function (doc) {
            clase.push(doc.data());
            subClase.push(doc.data().subClase);
        });
        clase.forEach(x => {
            let opt = document.createElement("option");
            opt.value = x.nombre;
            opt.innerText = x.nombre;
            _clase.appendChild(opt)
        });
        subClase.forEach(x => {
            let opt = document.createElement("option");
            opt.value = x.id;
            opt.innerText = x.nombre;
            _subClase.appendChild(opt)
        });
    });
}
// function getDataClase() {

// }

$('.ui.dropdown').dropdown();
