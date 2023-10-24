// Declaración de un array vacío para almacenar los empleados.
let listaEmpleados = [];

// Objeto para representar un empleado con id, nombre y puesto.
const obempleados = {
  id: "",
  nombre: "",
  puesto: ""
};

// Variable que indica si se está en modo de edición.
let editar = false;

// Selección de elementos del DOM por sus IDs.
const formulario = document.querySelector('#form');
const nombreinput = document.querySelector('#nombre');
const puesto = document.querySelector('#puesto');
const btn = document.querySelector('#guardar');

// Agregar un event listener al formulario para validar su envío.
formulario.addEventListener('submit', validarFormulario);

// Función para validar el formulario cuando se envía.
function validarFormulario(e) {
  e.preventDefault();

  // Comprueba si los campos de nombre y puesto están vacíos.
  if (nombreinput.value === "" || puesto.value === "") {
    alert("Los campos son obligatorios");
    return;
  }

  // Si no se está editando, se crea un nuevo objeto de empleado y se agrega.
  if (!editar) {
    obempleados.id = Date.now();
    obempleados.nombre = nombreinput.value;
    obempleados.puesto = puesto.value;
    agregarEmpleado();
  } else {
    editarEmpleados();
    editar = false;
    
  }
}

// Función para agregar un empleado a la lista.
function agregarEmpleado() {
  listaEmpleados.push({ ...obempleados });
  mostrarEmpleados();

  //limpia los campos del input 
  formulario.reset();

  limpiarobj();
}
function limpiarobj(){

  obempleados.id='';
  obempleados.nombre='';
  obempleados.puesto='';
}

// Función para mostrar los empleados en la interfaz.
function mostrarEmpleados() {
  limpiarhtml();

  // Obtención del elemento div donde se mostrarán los empleados.
  const divEmpleados = document.querySelector('#div_empleados');

  // Recorrido de la lista de empleados y creación de elementos para mostrarlos.
  listaEmpleados.forEach((empleados) => {
    const { id, nombre, puesto } = empleados;

    const parrafo = document.createElement('p');
    parrafo.textContent = `${id} - ${nombre} - ${puesto}`;
    parrafo.dataset.id = id;

    const editarBtn = document.createElement('button');
    editarBtn.textContent = 'Editar'  ;
    editarBtn.onclick = () => cargarEmpleado(empleados);
    parrafo.appendChild(editarBtn);

    const eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'Eiminar';
    eliminarBtn.onclick = () => eliminarEmpleado(id);
    parrafo.appendChild(eliminarBtn);

    const hr = document.createElement("hr");

    divEmpleados.appendChild(parrafo);
    divEmpleados.appendChild(hr);
  });
}

function editarEmpleados(){
  
  obempleados.nombre = nombreinput.value;
  obempleados.puesto = puesto.value;
  
  listaEmpleados.map(empleados =>{

      if(empleados.id === obempleados.id){
          empleados.id = obempleados.id;
          empleados.nombre = obempleados.nombre;
          empleados.puesto = obempleados.puesto;
      }
  });
  limpiarhtml();
  mostrarEmpleados();

  formulario.reset();
  formulario.querySelector('button[type="submit"]').textContent='Guardar'
  editar = false;

}
function cargarEmpleado(empleados){

  const { id, nombre, puesto } = empleados;
  
  nombreinput.value = empleados.nombre;
  puesto.value = empleados.puesto;
    
  obempleados.id = id;

  formulario.querySelector('button[type="submit"]').textContent='Actualizar';
  editar = true;

}
function eliminarEmpleado(id){

  listaEmpleados = listaEmpleados.filter(empleados => empleados.id != id);

  limpiarhtml();
  mostrarEmpleados();


}
// Función para limpiar el contenido de la lista de empleados en la interfaz.
function limpiarhtml() {
  const divEmpleados = document.querySelector('#div_empleados');
  while (divEmpleados.firstChild) {
    divEmpleados.removeChild(divEmpleados.firstChild);
  }
}

// Otras funciones como cargarEmpleado se mencionan pero no están definidas aquí.
