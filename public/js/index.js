// // Ejemplo de 
let vistaActual;
let formContainer = document.getElementById("formulario");

function cargarVista(e) {
    headResult.innerHTML = "";
    bodyResutl.innerHTML = "";
    if (!vistaActual) {
        document.getElementById(e.target.dataset.ruta).hidden = false;
        vistaActual = e.target.dataset.ruta;
    } else {
        document.getElementById(e.target.dataset.ruta).hidden = false;
        document.getElementById(vistaActual).hidden = true;
        vistaActual = e.target.dataset.ruta;
    }
}

var db = firebase.firestore();

// vista admin consulta de datos
let opt = document.getElementById("selectColeccion");
// registro de datos formulario de maestro de articulo
let _presentacion = document.getElementById("_presentacion");
let _principioActivo = document.getElementById("_principioActivo");
let _proveedor = document.getElementById("_proveedor");
let _laboratorio = document.getElementById("_laboratorio");
let _subClase = document.getElementById("_subClase");
let _clase = document.getElementById("_clase");
let _tipoDocumento = document.getElementById("_tipoDocumento");
let _almacen = document.getElementById("_almacen");
let _producto = document.getElementById("_producto");
let modalAlmacen = document.getElementById("modalAlmacen");

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
            obtenerDatosFirebase(event.target.id);
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
            obtenerDatosFirebase(event.target.id);
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
            obtenerDatosFirebase(event.target.id);
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
            obtenerDatosFirebase(event.target.id);
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
            obtenerDatosFirebase(event.target.id);
        }
    });

//Agregando regla personalizada
let min = document.getElementById("_minimo");
$.fn.form.settings.rules.minMaxValidate = function (a = 0, b) {
    let minimo = parseInt(min.value);
    return (minimo > a) ? false : true;
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
                identifier: ['_maximo', '_minimo'],
                rules: [
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
            obtenerDatosFirebase(event.target.id);
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
            obtenerDatosFirebase(event.target.id);
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
            obtenerDatosFirebase(event.target.id);
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
            obtenerDatosFirebase(event.target.id);
        }
    });

$('#conteoManual')
    .form({
        fields: {
            contManuProd: {
                identifier: 'contManuProd',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor selecciona un producto'
                    }
                ]
            },
            contManuCantidad: {
                identifier: 'contManuCantidad',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor ingresa un cantidad'
                    }
                ]
            }
        },
        onSuccess: (event, inputs) => {
            event.preventDefault();
            debugger;
            // registrarFirebase(event.target.id, inputs);
            // obtenerDatosFirebase(event.target.id);
            actualizarConteoReal(inputs);
            $("#conteoManual").form('clear');
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
            registrarFirebaseArticulo(event.target.id, inputs);
            obtenerDatosFirebase(event.target.id);
            actualizarCantidadMaestroArticulos(event.target.id, inputs);
        }
    });
// AJUSTE DE MERCANCIA
$('#ajusteIngreso')
    .form({
        fields: {
            _tipoDeIngreso: {
                identifier: '_tipoDeIngreso',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el nombre del tipo de ingreso'
                    }
                ]
            },
            _proveedorMercancia: {
                identifier: '_proveedorMercancia',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Selecciona una proveedor'
                    }
                ]
            },
            _tipoDocumentoMercancia: {
                identifier: '_tipoDocumentoMercancia',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Selecciona un tipo de documento'
                    }
                ]
            },
            _numeroDocumentoMercancia: {
                identifier: '_numeroDocumentoMercancia',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el número de documento'
                    }
                ]
            },
            _almacenDocumentoMercancia: {
                identifier: '_almacenDocumentoMercancia',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa un almacen'
                    }
                ]
            },
            _articuloDocumentoMercancia: {
                identifier: '_articuloDocumentoMercancia',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa un cod articulo'
                    }
                ]
            },
            _loteDocumentoMercancia: {
                identifier: '_loteDocumentoMercancia',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Selecciona un lote'
                    }
                ]
            },
            _cantidadDocumentoMercancia: {
                identifier: '_cantidadDocumentoMercancia',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Cantidad de documento'
                    }
                ]
            },
            _correlativoDocumentoMercancia: {
                identifier: '_correlativoDocumentoMercancia',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa un correlativo'
                    }
                ]
            }
        },
        onSuccess: (event, inputs) => {
            event.preventDefault();
            registrarFirebase(event.target.id, inputs);
            obtenerDatosFirebase(event.target.id);
        }
    });

//SALIDA DE MERCANCÍA
$('#salidaArticulo')
    .form({
        fields: {
            salidaArticulo: {
                identifier: 'salidaArticulo',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el nombre del tipo de ingreso'
                    }
                ]
            },
            _salidaTipoSalida: {
                identifier: '_salidaTipoSalida',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Selecciona una proveedor'
                    }
                ]
            },
            _salidaProveedor: {
                identifier: '_salidaProveedor',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Selecciona un tipo de documento'
                    }
                ]
            },
            _salidaTipoDocumento: {
                identifier: '_salidaTipoDocumento',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa el número de documento'
                    }
                ]
            },
            _salidaNumeroDocumento: {
                identifier: '_salidaNumeroDocumento',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa un almacen'
                    }
                ]
            },
            _salidaFechaRegistroArticulo: {
                identifier: '_salidaFechaRegistroArticulo',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa un cod articulo'
                    }
                ]
            },
            _salidaFechaSalida: {
                identifier: '_salidaFechaSalida',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Selecciona un lote'
                    }
                ]
            },
            _salidaAlmacen: {
                identifier: '_salidaAlmacen',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Cantidad de documento'
                    }
                ]
            },
            _salidaArticulo: {
                identifier: '_salidaArticulo',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa un correlativo'
                    }
                ]
            },
            _salidaLote: {
                identifier: '_salidaLote',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa un correlativo'
                    }
                ]
            },
            _salidaCantidad: {
                identifier: '_salidaCantidad',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa un correlativo'
                    }
                ]
            }
        },
        onSuccess: (event, inputs) => {
            event.preventDefault();
            registrarFirebase(event.target.id, inputs);
            obtenerDatosFirebase(event.target.id);
            restarStock(event.target.id, inputs);
        }
    });

$('#formRegistroUsuario')
    .form({
        fields: {
            nivel: {
                identifier: 'nivel',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Seleccione un nivel'
                    }
                ]
            },
            correoUser: {
                identifier: 'correoUser',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Por favor ingresa un correo electronico'
                    }
                ]
            },
            pw1: {
                identifier: 'pw1',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa una contraseña'
                    },
                    {
                        type: 'match[pw2]',
                        prompt: 'Las contraseñas no coinciden'
                    }
                ]
            },
            pw2: {
                identifier: 'pw2',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Ingresa una contraseña'
                    },
                    {
                        type: 'match[pw1]',
                        prompt: 'Las contraseñas no coinciden'
                    }
                ]
            }
        },
        onSuccess: (event, inputs) => {
            event.preventDefault();
            crearUsuario(inputs);
            $("#conteoManual").form('clear');
        }
    });

// Funciones
function restarStock(collection, data) {
    let art = document.getElementById("_salidaArticulo");
    db.collection("maestroDeArticulo").doc(art.options[art.selectedIndex].dataset.id)
        .update(
            {
                "_stock": firebase.firestore.FieldValue.increment(-data._salidaCantidad)
            }).then(function () {
                console.log("Se desconto correctamente");
            }).catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    db.collection("articulo").doc(document.getElementById("_salidaCantidad").dataset.idItem)
        .update(
            {
                "_cantidad": firebase.firestore.FieldValue.increment(-data._salidaCantidad)
            }).then(function () {
                console.log("Se desconto correctamente");
            }).catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    document.getElementById("_salidaCantidad").dataset.cantidadActual = "";

}
function registrarFirebase(colecion, data) {
    if (colecion == "maestroDeArticulo") {
        data._maximo = parseInt(data._maximo);
        data._minimo = parseInt(data._minimo);
        data._stock = parseInt(data._stock);
    }
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


function registrarFirebaseArticulo(colecion, data) {
    let registro = [];
    let contenido = document.getElementById("detalleMercancia");
    let cant = contenido.children.length;
    for (let i = 0; i < cant; i++) {
        let reg = null;
        let code = contenido.children[i].dataset.id;;
        reg = data;
        reg._producto = document.getElementById("_producto-" + code).value;
        reg._costo = document.getElementById("_costo-" + code).value;
        reg._cantidad = parseInt(document.getElementById("_cantidad-" + code).value);
        reg._lote = document.getElementById("_lote-" + code).value;
        reg._fechaVencimiento = document.getElementById("_fechaVencimiento-" + code).value;
        reg._registroId = document.getElementById("_registroId-" + code).value;
        registro.push(reg);
    }
    registro.forEach(x => {
        db.collection(colecion).add(x)
            .then(function () {
                console.log("Se registor correctamente");
                // $(`#${colecion}`).form('clear')
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
                // $(`#${colecion}`).form('clear')
            });
    });
    alert("Se registro correctamente");
    $(`#${colecion}`).form('clear');
    document.getElementById("detalleMercancia").remove()
}

function obtenerDatosFirebase(coll) {
    let thead = document.getElementById("headResult");
    thead.innerHTML = "";
    let tbody = document.getElementById("bodyResutl");
    tbody.innerHTML = "";
    let result = [];
    db.collection(coll).get().then(function (querySnapshot) {
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
        thead.appendChild(th);
        //Agregando contenido a al tbody
        result.forEach(x => {
            let tr = document.createElement("tr");
            tr.id = x.id;
            for (valor in x) {
                let td = document.createElement("td");
                td.innerText = x[valor];
                tr.appendChild(td);
                if (valor == 'id') {
                    td.innerHTML = `<i class="trash icon" onclick="eliminarRegistro(event,'${coll}')"></i> <i class="edit icon" onclick="editarRegistro(event,'${coll}')"></i>`;
                    tbody.appendChild(tr);
                }
            }
        });
    });
}

function eliminarRegistro(e, coll) {
    db.collection(coll).doc(e.target.parentElement.parentElement.id).delete().then(function () {
        alert("El documento se eliminó correctamente");
        obtenerDatosFirebase(coll);
    }).catch(function (error) {
        alert("Error removing document: ", error);
    });
}
function editarRegistro(e, coll) {
    db.collection(coll).doc(e.target.parentElement.parentElement.id).get().then(function (doc) {
        if (doc.exists) {
            Object.keys(doc.data()).forEach(x => {
                document.getElementById(x).value = doc.data()[x]
            })
        } else {
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
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

// grupo de datos para el formulario maestro articulo
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

$('.ui.dropdown').dropdown();

function cargarDatosFormularioRegistroMercancia() {
    getDataProveedor();
    getDataTipoDocumento();
    getDataAlmacen();
    // getProdutos();
}
// _salidaArticulo
function cargarDatosFormularioSalidaMercancia() {
    getTipoSalida();
    getDataProveedorSalida();
    getDataTipoDocumentoSalida();
    getDataAlmacenSalida();
    // getDataArticulo();
    getProductosSalida();

    function getProductosSalida() {
        db.collection("maestroDeArticulo").get().then(function (querySnapshot) {
            let data = [{ _codigoArticulo: "", _nombreArticulo: "Seleccione", _id: "" }];
            querySnapshot.forEach(function (doc) {
                let temp = doc.data();
                temp.id = doc.id;
                data.push(temp);
            });
            data.forEach(x => {
                let opt = document.createElement("option");
                opt.value = x._codigoArticulo;
                opt.innerText = x._nombreArticulo;
                opt.dataset.precio = x._costoCompra;
                opt.dataset.id = x.id;
                _salidaArticulo.appendChild(opt)
            });
        });
    }

}
function getArticulos(e) {
    let listaArticulos = [];
    db.collection("articulo")
        .where("_registroId", "==", e.target.options[e.target.selectedIndex].dataset.id)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let temp = doc.data();
                temp._idItem = doc.id;
                listaArticulos.push(temp);
            });
            console.log(listaArticulos);
            modalSalida(listaArticulos);
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}
function modalSalida(list) {
    modalAlmacen.innerHTML = "";
    modalAlmacen.innerHTML = `<div class="header">Lista de Articulos</div>
                                <div class="content">
                                    <table class="ui table">
                                    <thead><th>Almacen</th><th>Lote</th><th>Cantidad</th><th>Fecha v.</th><th></th></thead>
                                    ${list.map(x => `<tr id="${x._producto}"><td>${x._almacen}</td><td>${x._lote}</td><td>${x._cantidad}</td><td>${x._fechaVencimiento}</td><td><button data-idItem="${x._idItem}" class="ui button success" onclick="selectArticuloSalida(event)">Seleccionar</button></td></tr>`).join("")}
                                    </table>
                                </div>`;
    $("#modalAlmacen").modal("show");

}
function selectArticuloSalida(e) {
    let td = e.target.parentElement.parentElement.children;
    $("#modalAlmacen").modal("hide");
    document.getElementById("_salidaAlmacen").value = td[0].innerHTML;
    document.getElementById("_salidaLote").value = td[1].innerHTML;
    document.getElementById("_salidaCantidad").value = td[2].innerHTML;
    document.getElementById("_salidaCantidad").dataset.cantidadActual = td[2].innerHTML;
    document.getElementById("_salidaCantidad").dataset.idItem = e.target.dataset.iditem;

    $('#_salidaCantidad')
        .popup({
            title: ' Tener en cuenta',
            content: "La cantidad ingresada no puede ser mayor a:" + td[2].innerHTML
        })

}
function validarSalidaCantidad(e) {
    let actual = parseInt(e.target.dataset.cantidadActual);
    let input = parseInt(e.target.value);

    if (input > actual) {
        alert("El valor ingresado no puede ser mayor a" + actual)
        e.target.value = "";
        e.target.focus();;
    }

}

let _salidaArticulo = document.getElementById("_salidaArticulo");
function getDataArticulo() {
    db.collection("articulo").get().then(function (querySnapshot) {
        _salidaArticulo.innerHTML = "";
        let data = [{ correlativoSalida: "", nombreTipoSalida: "Seleccione" }];
        querySnapshot.forEach(function (doc) {
            data.push(doc.data());
        });
        data.forEach(x => {
            let opt = document.createElement("option");
            opt.value = x.id;
            opt.innerText = x._nombreArticulo;
            _salidaArticulo.appendChild(opt)
        });
    });
}

let _salidaTipoSalida = document.getElementById("_salidaTipoSalida");
function getTipoSalida() {
    db.collection("tipoSalida").get().then(function (querySnapshot) {
        _salidaTipoSalida.innerHTML = "";
        let data = [{ correlativoSalida: "", nombreTipoSalida: "Seleccione" }];
        querySnapshot.forEach(function (doc) {
            data.push(doc.data());
        });
        data.forEach(x => {
            let opt = document.createElement("option");
            opt.value = x.correlativoSalida;
            opt.innerText = x.nombreTipoSalida;
            _salidaTipoSalida.appendChild(opt)
        });
    });
}
function getDataProveedor() {
    db.collection("proveedor").get().then(function (querySnapshot) {
        _proveedor.innerHTML = "";
        let data = [{ direccion: "", razonSocial: "Seleccione", ruc: "", telefono: "" }];
        querySnapshot.forEach(function (doc) {
            data.push(doc.data());
        });
        data.forEach(x => {
            let opt = document.createElement("option");
            opt.value = x.ruc;
            opt.innerText = x.razonSocial;
            _proveedor.appendChild(opt)
        });
    });
}
let _salidaProveedor = document.getElementById("_salidaProveedor");
function getDataProveedorSalida() {
    db.collection("proveedor").get().then(function (querySnapshot) {
        _salidaProveedor.innerHTML = "";
        let data = [{ direccion: "", razonSocial: "Seleccione", ruc: "", telefono: "" }];
        querySnapshot.forEach(function (doc) {
            data.push(doc.data());
        });
        data.forEach(x => {
            let opt = document.createElement("option");
            opt.value = x.ruc;
            opt.innerText = x.razonSocial;
            _salidaProveedor.appendChild(opt)
        });
    });
}
function getDataTipoDocumento() {
    db.collection("tipoDocumento").get().then(function (querySnapshot) {
        _tipoDocumento.innerHTML = "";
        let data = [{ codigotipoDocumento: "", nombretipoDocumento: "Seleccione" }];
        querySnapshot.forEach(function (doc) {
            data.push(doc.data());
        });
        data.forEach(x => {
            let opt = document.createElement("option");
            opt.value = x.codigotipoDocumento;
            opt.innerText = x.nombretipoDocumento;
            _tipoDocumento.appendChild(opt)
        });
    });
}
let _salidaTipoDocumento = document.getElementById("_salidaTipoDocumento");
function getDataTipoDocumentoSalida() {
    db.collection("tipoDocumento").get().then(function (querySnapshot) {
        _salidaTipoDocumento.innerHTML = "";
        let data = [{ codigotipoDocumento: "", nombretipoDocumento: "Seleccione" }];
        querySnapshot.forEach(function (doc) {
            data.push(doc.data());
        });
        data.forEach(x => {
            let opt = document.createElement("option");
            opt.value = x.codigotipoDocumento;
            opt.innerText = x.nombretipoDocumento;
            _salidaTipoDocumento.appendChild(opt)
        });
    });
}
function getDataAlmacen() {
    db.collection("almacen").get().then(function (querySnapshot) {
        _almacen.innerHTML = "";
        let data = [{ codigoAlmacen: "", nombreAlmacen: "Seleccione" }];
        querySnapshot.forEach(function (doc) {
            data.push(doc.data());
        });
        data.forEach(x => {
            let opt = document.createElement("option");
            opt.value = x.codigoAlmacen;
            opt.innerText = x.nombreAlmacen;
            _almacen.appendChild(opt)
        });
    });
}
let _salidaAlmacen = document.getElementById("_salidaAlmacen");
function getDataAlmacenSalida() {
    db.collection("almacen").get().then(function (querySnapshot) {
        _salidaAlmacen.innerHTML = "";
        let data = [{ codigoAlmacen: "", nombreAlmacen: "Seleccione" }];
        querySnapshot.forEach(function (doc) {
            data.push(doc.data());
        });
        data.forEach(x => {
            let opt = document.createElement("option");
            opt.value = x.codigoAlmacen;
            opt.innerText = x.nombreAlmacen;
            _salidaAlmacen.appendChild(opt)
        });
    });
}
function getProdutos(select) {
    if (typeof (select) !== 'undefined' && typeof (select) !== null) {
        select.innerHTML = "";
        db.collection("maestroDeArticulo").get().then(function (querySnapshot) {

            let data = [{ _codigoArticulo: "", _nombreArticulo: "Seleccione", _id: "" }];
            querySnapshot.forEach(function (doc) {
                let temp = doc.data();
                temp.id = doc.id;
                data.push(temp);
            });
            data.forEach(x => {
                let opt = document.createElement("option");
                opt.value = x._codigoArticulo;
                opt.innerText = x._nombreArticulo;
                opt.dataset.precio = x._costoCompra;
                opt.dataset.id = x.id;
                select.appendChild(opt)
            });
        });
    }
}
function precioActualProducto(e) {
    document.getElementById("_costo-" + e.target.id.split('-')[1]).value = e.target.options[e.target.selectedIndex].dataset.precio;
    document.getElementById("_registroId-" + e.target.id.split('-')[1]).value = e.target.options[e.target.selectedIndex].dataset.id;
}
function actualizarCantidadMaestroArticulos(coleccion, data) {
    db.collection("maestroDeArticulo").where("_codigoArticulo", "==", data._producto).get().then(function (querySnapshot) {

        let doc = [];
        let updateObj = {};
        let id = null;
        querySnapshot.forEach(function (item) {
            id = item.id;
            doc.push(item.data());
        });
        //  updateObj._producto =  (doc[0]._producto == data._producto)? data._producto:doc[0]._cantidad;
        updateObj._stock = parseFloat(doc[0]._stock) + parseFloat(data._cantidad);
        updateObj._costoCompra = (doc[0]._costoCompra !== data._costo) ? data._costo : doc[0]._costoCompra;

        // Actualizando manestro
        db.collection("maestroDeArticulo").doc(id).update(updateObj)
            .then(function () {
                console.log("Document successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    });
}
function formatoNumDoc(event) {
    let value = event.target.value;
    let formato = "00000000000000";
    let cantidad = value.length;
    let completar = formato.substring(0, (14 - cantidad));
    let result = completar + value;
    event.target.value = result;
}


//Agregar detalle de mercancia a ingresar
let detalleMercancia = document.getElementById("detalleMercancia");
let cantDetalle = 0;
function addDetalleMercancia() {
    let div = document.createElement('div');
    div.className = "fields";
    div.dataset.id = cantDetalle;
    div.innerHTML = `<div class="field">
                        <label>Seleccione producto</label>
                        <select class="productos" name="_producto" id="_producto-${cantDetalle}" onchange="precioActualProducto(event)">

                        </select>
                    </div>
                    <div class="field">
                        <label>Costo</label>
                        <input type="text" name="_costo" id="_costo-${cantDetalle}">
                    </div>
                    <div class="field">
                        <label>Cantidad</label>
                        <input type="number" name="_cantidad" id="_cantidad-${cantDetalle}" min="0">
                    </div>
                    <div class="field">
                        <label>Lote</label>
                        <input type="text" name="_lote" id="_lote-${cantDetalle}">
                    </div>
                    <div class="field">
                        <label>Fecha de vencimiento</label>
                        <input type="date" name="_fechaVencimiento" id="_fechaVencimiento-${cantDetalle}">
                    </div>
                    <div class="field" hidden>
                        <label>registro id cod prodFecha de vencimiento</label>
                        <input type="text" name="_registroId" id="_registroId-${cantDetalle}">
                    </div>
                    <div class="field" >
                    <span class="ui compact icon button" onclick="eliminarRow(event)">
                        <i class="minus circle icon"></i>
                    </span>
                    </div>`;
    detalleMercancia.append(div);
    getProdutos(document.getElementById(`_producto-${cantDetalle}`));
    cantDetalle++;

}

function eliminarRow(e) {
    e.target.parentElement.parentElement.parentElement.remove()
}
//REPORTE VENCIDOS
let tbReporteArticulosVencidos = document.getElementById("tbReporteArticulosVencidos");
function cargarReporteVencidos() {

    let _articuloReporte = [];
    let _maestroReporte = [];
    db.collection("articulo")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                _articuloReporte.push(doc.data());
            });
            db.collection("maestroDeArticulo")
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        let documento = doc.data();
                        documento.idMaestro = doc.id;
                        _maestroReporte.push(documento);
                    });

                    // ARMAR REPORTE
                    let vencidos = _articuloReporte.filter(x => new Date(x._fechaVencimiento) <= new Date());
                    let vencidosMaestro = vencidos.map(art =>
                        `<tr>
                            <td>Nombre articulo</td>
                            <td>${art._lote}</td>
                            <td>${art._almacen}</td>
                            <td>${art._fechaVencimiento}</td>
                            </tr>`
                    ).join("")
                    tbReporteArticulosVencidos.innerHTML = vencidosMaestro;

                });

        });


}

//REPORTE PROXIMOS A VENCER
// let tbReporteArticulosVencidos = document.getElementById("tbReporteArticulosVencidos");
let inProximosVencer = document.getElementById("inProximosVencer");
function cargarReporteProximosVencidos() {

    let _articuloReporte = [];
    let _maestroReporte = [];
    db.collection("articulo")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                _articuloReporte.push(doc.data());
            });
            db.collection("maestroDeArticulo")
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        let documento = doc.data();
                        documento.idMaestro = doc.id;
                        _maestroReporte.push(documento);
                    });

                    // ARMAR REPORTE
                    let vencidos = _articuloReporte.filter(x => (new Date(x._fechaVencimiento) <= new Date(inProximosVencer.value) && (new Date(inProximosVencer.value) >= new Date())));
                    let vencidosMaestro = vencidos.map(art =>
                        `<tr>
                            <td>Nombre articulo</td>
                            <td>${art._lote}</td>
                            <td>${art._almacen}</td>
                            <td>${art._fechaVencimiento}</td>
                            </tr>`
                    ).join("")
                    tbReporteArticulosVencidos.innerHTML = vencidosMaestro;

                });

        });


}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

//Conteo real

function actualizarConteoReal(inputs) {
    let contManuProd = document.getElementById("contManuProd")
    db.collection("maestroDeArticulo").doc(contManuProd.options[contManuProd.selectedIndex].dataset.id).update({
        _conteo: parseInt(inputs.contManuCantidad)
    }).then(function () {
        console.log("Se actualizó correctamente");
    }).catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });

}
function cargarDatosFormularioConteo() {
    let _conteoSelect = document.getElementById("contManuProd");
    db.collection("maestroDeArticulo").get().then(function (querySnapshot) {
        let data = [{ _codigoArticulo: "", _nombreArticulo: "Seleccione", _id: "" }];
        querySnapshot.forEach(function (doc) {
            let temp = doc.data();
            temp.id = doc.id;
            data.push(temp);
        });
        data.forEach(x => {
            let opt = document.createElement("option");
            opt.value = x._codigoArticulo;
            opt.innerText = x._nombreArticulo;
            opt.dataset.precio = x._costoCompra;
            opt.dataset.id = x.id;
            _conteoSelect.appendChild(opt)
        });
    });
}

//REPORTE DE EXACTITUD DE INVENTARIO

function exactitudInventario() {

    let head = document.getElementById("headExactitudInv");
    head.innerHTML = "";
    head.innerHTML = `<tr><th>Nombre</th><th>Stock</th><th>Conteo</th><th>Exac Inv (dif)</th>`;
    let cuerpo = document.getElementById("bodyExactitudInv");
    cuerpo.innerHTML = "";
    db.collection("maestroDeArticulo").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            cuerpo.innerHTML += `<tr scope="row" class="${(parseInt(doc.data()._stock)) !== (parseInt(doc.data()._conteo)) ? "negative" : ""}">
                                    <td>${doc.data()._nombreArticulo}</td>
                                    <td>${doc.data()._stock}</td>
                                    <td>${doc.data()._conteo}</td>
                                    <td>${((parseInt(doc.data()._stock) - parseInt(doc.data()._conteo)) / parseInt(doc.data()._stock)) * 100} %</td>
                                </tr>`;
        });
    });
}

function productosVencidos() {

    let head = document.getElementById("headProdVenc");
    head.innerHTML = "";
    head.innerHTML = `<tr><th>Nombre</th><th>Stock</th><th>Can Venc</th><th>Exac Inv (dif)</th>`;
    let cuerpo = document.getElementById("bodyProdVenc");
    cuerpo.innerHTML = "";
    let maestroArticuloVencidos = [];
    let listaArticuloVencidos = [];
    db.collection("maestroDeArticulo").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            let temp = doc.data();
            temp.id = doc.id;
            maestroArticuloVencidos.push(temp);
        });
        db.collection("articulo").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let temp = doc.data();
                temp.id = doc.id;
                listaArticuloVencidos.push(temp);
            });
            let vencidos = listaArticuloVencidos.filter(x => {
                return new Date(x._fechaVencimiento) <= new Date()
            })

            let result = maestroArticuloVencidos.map(x => {
                let venc = vencidos.find(y => x.id == y._registroId);
                if (venc != undefined) {
                    return { nombre: x._nombreArticulo, stock: x._stock, cantVenc: (venc.length > 0) ? venc.reduce((a, b) => { return a + b._cantidad }, 0) : venc._cantidad }
                } else {
                    return null
                }

            })
            let nresult = result.filter(x => x != null)
            console.log(nresult);
            cuerpo.innerHTML += nresult.map(x => {
                return `<tr scope="row" >
                <td>${x.nombre}</td>
                <td>${x.stock}</td>
                <td>${x.cantVenc}</td>
                <td>${(parseInt(x.cantVenc) / parseInt(x.stock)) * 100} %</td>
            </tr>`;
            })
        });

    });
}

function productosConStock() {
    let head = document.getElementById("headProdStoc");
    head.innerHTML = "";
    head.innerHTML = `<tr><th>Nombre</th><th>Stock</th>`;
    let cuerpo = document.getElementById("bodyProdStoc");
    cuerpo.innerHTML = "";
    db.collection("maestroDeArticulo").where("_stock", ">", 0).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            cuerpo.innerHTML += `<tr scope="row" >
                <td>${doc.data()._nombreArticulo}</td>
                <td>${doc.data()._stock}</td>
            </tr>`;
        });
    });
}

function productosConStockMinimo() {
    let head = document.getElementById("headProdStocMin");
    head.innerHTML = "";
    head.innerHTML = `<tr><th>Nombre</th><th>Stock min.</th><th>Stock</th><th>maximo</th><th>Comprar</th>`;
    let cuerpo = document.getElementById("bodyProdStocMin");
    cuerpo.innerHTML = "";
    db.collection("maestroDeArticulo").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data()._stock <= doc.data()._minimo) {
                cuerpo.innerHTML += `<tr scope="row" >
                <td>${doc.data()._nombreArticulo}</td>
                <td>${doc.data()._minimo}</td>
                <td>${doc.data()._stock}</td>
                <td>${doc.data()._maximo}</td>
                <td>${(doc.data()._maximo - doc.data()._stock)}</td>
            </tr>`;
            }

        });
    });
}

function productosConteo() {
    let head = document.getElementById("headProdConteo");
    head.innerHTML = "";
    head.innerHTML = `<tr><th>Nombre</th><th>Stock.</th><th>Conteo</th><th>Dif.</th><th>%</th>`;
    let cuerpo = document.getElementById("bodyProdConteo");
    cuerpo.innerHTML = "";
    db.collection("maestroDeArticulo").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data()._stock != doc.data()._conteo) {
                cuerpo.innerHTML += `<tr scope="row" >
                <td>${doc.data()._nombreArticulo}</td>
                <td>${doc.data()._stock}</td>
                <td>${doc.data()._conteo}</td>
                <td>${(doc.data()._stock - doc.data()._conteo)}</td>
                <td>${(((doc.data()._stock - doc.data()._conteo) / doc.data()._stock) * 100).toFixed(2)} %</td>
            </tr>`;
            }

        });
    });
}

function crearUsuario(data) {
    firebase.auth().createUserWithEmailAndPassword(data.correoUser, data.pw1)
        .then(x => {
            console.log(x)
            let user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: data.nivel
            }).then(function () {
                alert("La cuenta fué creada");
            }).catch(function (error) {
                alert("¡Algo salió mal! Por favor intentar nuevamente");
                console.log(error);
            });
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });

}