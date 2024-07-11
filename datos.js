//1.Crear una función que verifique que los inputs del formulario estén llenos
function validar()
{
    //1.Traer los valores del formulario en variables
    var cedula=document.getElementById('cedula').value;
    var nombre=document.getElementById('nombre').value;
    var direccion=document.getElementById('direccion').value;
    var fecha=document.getElementById('fecha').value;
    var correo=document.getElementById('correo').value;
    //2. Verificar si hay algún valor vacío en el formulario
    if (cedula==""||nombre==""||direccion==""||fecha==""||correo=="")
    {
        alert("TODOS los datos del formulario son obligatorios");
        return false;
    }
    return true;
}
//2.Crear la función para guardar los datos del formulario
function guardar()
{
    //traer los valor del formulario
    var cedula=document.getElementById('cedula').value;
    var nombre=document.getElementById('nombre').value;
    var direccion=document.getElementById('direccion').value;
    var fecha=document.getElementById('fecha').value;
    var correo=document.getElementById('correo').value;

    //verificar el estado de la función de validar, si la función está en true, quiere decir que todos los datos del formulario están llenos

    if(validar()==true)
    {
        //1.Crear una variable que guarde todos los datos
        var listaUsuarios;
        //2. verificar que los datos que esten en el localStorage no estén vacios, si están vacios, entonces enviamos  la variable como un arreglo
        if(localStorage.getItem('listaUsuarios')===null)
        {
            listaUsuarios=[]; //volver un arreglo vacio en caso de que no exista informacion almacenada--convertir la informacion en un objeto a arreglo de JavaScript
        }
        else
        {
            listaUsuarios=JSON.parse(localStorage.getItem('listaUsuarios'));
        }
        //mas de un dato, lo almacenamos en el arrglo y para que sea individual lo enviamos en forma de objeto
        listaUsuarios.push(
            {
                "Cedula": cedula,
                "Nombre":nombre,
                "Direccion":direccion,
                "Fecha_Nacimiento":fecha,
                "Correo":correo
            }
        );
        //Guardar la información del arreglo en el localStorage
        localStorage.setItem('listaUsuarios',JSON.stringify(listaUsuarios));
        alert("usuario guardado correctamente");
        //Al enviar la información, se muestra en la tabla del html
        mostrarInformacion();
        //limpiar los campos del formulario para que queden vacios cuando se envie la información 
        document.getElementById('cedula').value="";
        document.getElementById('nombre').value="";
        document.getElementById('direccion').value="";
        document.getElementById('fecha').value="";
        document.getElementById('correo').value="";
    }

}
function mostrarInformacion()
{
    var listaUsuarios;
    if(localStorage.getItem('listaUsuarios')==null)
    {
        listaUsuarios=[];
    }
    else
    {
        listaUsuarios=JSON.parse(localStorage.getItem('listaUsuarios'));
    }
    var tabla="";
    listaUsuarios.forEach(function(indice,valores)
    {
        tabla+="<tr>";
        tabla+="<td>"+indice.Cedula+"</td>";
        tabla+="<td>"+indice.Nombre+"</td>";
        tabla+="<td>"+indice.Direccion+"</td>";
        tabla+="<td>"+indice.Fecha_Nacimiento+"</td>"
        tabla+="<td>"+indice.Correo+"</td>"
        tabla+='<td><button class="btn btn-primary m-2" onclick=actualizarRegistro('+valores+')>cambiar Datos</button><button class="btn btn-primary m-2" onclick=eliminarRegistro('+valores+')>Eliminar Datos</button></td>';
        tabla+"</tr>";
    });
    document.querySelector('#listaDatos tbody').innerHTML=tabla;
    
    
}
//Así se recarga la página, siempre vamos a mostrar la tabla con toda la información
document.onload=mostrarInformacion();
function actualizarRegistro(valores)
{
    //1. El botón de guardar debe de esconderse y el botón de guardar cambios aparece para actualizar  los datos del localStorage
    document.getElementById("botonGuardar").style.display="none";
    document.getElementById("botonActualizar").style.display="block";

    //convertir los datos del localstorage en un objeto de JavaScript
    var listaUsuarios;
    if(localStorage.getItem('listaUsuarios')==null)
    {
        listaUsuarios=[];
    }
    else
    {
        listaUsuarios=JSON.parse(localStorage.getItem('listaUsuarios'));
    }
    //2. Traer los valores del registro en los input del formulario
    document.getElementById("cedula").value=listaUsuarios[valores].Cedula;
    //document-getElementById('cedula'), es el id del pinput del formulario.
    //listaUsuarios es la variable que tiene los datos del localStorage
    //Valores es el parametro de entrada en la funcion, que tiene los datos del arreglo (previamente fue la variable del forEach)
    //.Cedula es el atributo del objeto.
    document.getElementById("nombre").value=listaUsuarios[valores].Nombre;
    document.getElementById("direccion").value=listaUsuarios[valores].Direccion;
    document.getElementById("fecha").value=listaUsuarios[valores].Fecha_Nacimiento;
    document.getElementById("correo").value=listaUsuarios[valores].Correo;

    //3. Generar un evento al boton de Guardar Cambios, para que este actualice la información del registro
    document.getElementById("botonActualizar").onclick=function()
    {
        if(validar()==true)
        {
            listaUsuarios[valores].Cedula=document.getElementById("cedula").value;
            listaUsuarios[valores].Nombre=document.getElementById("nombre").value;
            listaUsuarios[valores].Direccion=document.getElementById("direccion").value;
            listaUsuarios[valores].Fecha_Nacimiento=document.getElementById("fecha").value;
            listaUsuarios[valores].Correo=document.getElementById("correo").value;

            localStorage.setItem('listaUsuarios',JSON.stringify(listaUsuarios));
            alert("usuario actualizado correctamente");
            mostrarInformacion();

            //limpiar el formulario
            document.getElementById('cedula').value="";
            document.getElementById('nombre').value="";
            document.getElementById('direccion').value="";
            document.getElementById('fecha').value="";
            document.getElementById('correo').value="";
            


            //Regresamos el boton de guardar nuevo dato y escondemos el de actualizar
            document.getElementById("botonGuardar").style.display="block";
            document.getElementById("botonActualizar").style.display="none";
        }
    }
}
function eliminarRegistro(index)
{
    var listaUsuarios;
    if(localStorage.getItem('listaUsuarios')==null)
    {
        listaUsuarios=[];
    }
    else
    {
        listaUsuarios=JSON.parse(localStorage.getItem('listaUsuarios'));
    }

    listaUsuarios.splice(index, 1);

    localStorage.setItem('listaUsuarios',JSON.stringify(listaUsuarios));
    mostrarInformacion();

}
function buscarRegistro()
{
    var registroBusca = document.getElementById('buscar').value;
    var listaUsuarios;
    if(localStorage.getItem('listaUsuarios')==null)
    {
        listaUsuarios=[];
    }
    else
    {
        listaUsuarios=JSON.parse(localStorage.getItem('listaUsuarios'));
    }
    let table = document.querySelector(".table tbody");
   
    let fila = document.createElement('tr');
    
    let info = "";
    listaUsuarios.forEach(function(indice,valores)
    {
        if (registroBusca == indice.Cedula)
        {
          
            info+="<td>"+indice.Cedula+"</td>";
            info+="<td>"+indice.Nombre+"</td>";
            info+="<td>"+indice.Direccion+"</td>";
            info+="<td>"+indice.Fecha_Nacimiento+"</td>"
            info+="<td>"+indice.Correo+"</td>"
            info+='<td><button class="btn btn-primary m-2" onclick=actualizarRegistro('+valores+')>cambiar Datos</button><button class="btn btn-primary m-2" onclick=eliminarRegistro('+valores+')>Eliminar Datos</button></td>';

            
            
        }
    });
    if(info != "") {
    limpiarTabla();
        fila.innerHTML=info;
    table.appendChild(fila);
    document.onload= false;
    }else
    {
        alert("Registro No Existe!");
     
    }

}
function limpiarTabla(){
    let dataTable = document.querySelectorAll("#listaDatos tbody tr")

    for (let x = 0; x < dataTable.length; x++) {
        dataTable[x].remove();
    }
}