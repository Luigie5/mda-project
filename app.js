var user="Luis";
function  mostrarUsuario(){
    var database = firebase.database();
    var leadsRef = database.ref('Usuarios');
    var parrafo= document.getElementById("texto");
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val().Nombre;
        parrafo.innerHTML=parrafo.innerHTML+", "+childData;
        console.log(childData);
        });
    });
}
function writeUserData(userId, name) {
    firebase.database().ref('/Usuarios/usuario3').set({
      Nombre: name,
    });
  }
function loadLab() {
    console.log("cargarLab");
    var labsDropDownMenu = document.getElementById("laboratorio");
    var labpuesto = document.getElementById("puesto");
    var i = 0;
    var database = firebase.database();
    var leadsRef = database.ref('laboratorios');
    //var classes= database.ref('Classrooms');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childData.nombre);
        var subjectOption = document.createElement("option");
        subjectOption.value = childData.nombre;
        subjectOption.text = childData.nombre;
        labsDropDownMenu.add(subjectOption);
    });
    
    loadPuesto();
    });
    
}
  
function loadTab() {
    var tabla = document.getElementById("tabla");
    var i = 1;
    var database = firebase.database();
    var leadsRef = database.ref('reservas');
    //var classes= database.ref('Classrooms');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childData.nombre);
        if(childData.usuario===user){
            var fila = tabla.insertRow(i);
            var td1 = fila.insertCell(0);
            var td2 = fila.insertCell(1);
            var td3 = fila.insertCell(2);
            td1.innerHTML = childData.estado;
            td2.innerHTML = childData.laboratorio;
            td3.innerHTML = childData.puesto;
            i++;
        }
        
    });
    });
    
}
function loadPuesto() {
    console.log("cargarPuesto");
    var  lab= document.getElementById("laboratorio").value;
    var labpuesto = document.getElementById("puesto");
    var dia = document.getElementById("dia").value;
    var hora = document.getElementById("hora").value;
    labpuesto.innerHTML="";
    console.log(dia+"-"+hora);
    var i = 0;
    var database = firebase.database();
    console.log('laboratorios/'+lab+'/puestos');
    var refPuesto = database.ref('laboratorios/'+lab+'/puestos');
    //var classes= database.ref('Classrooms');
    refPuesto.on('value', function(snap) {
        snap.forEach(function(childSnap) {
        var child = childSnap.val();
        console.log(child);
        if(!child.estado.includes(dia+"-"+hora)){
            var subjectOption = document.createElement("option");
            subjectOption.value = child.nombre;
            subjectOption.text = child.nombre;
            
            labpuesto.add(subjectOption);
        }
        
    });});
}
function reservar() {
    var  lab= document.getElementById("laboratorio").value;
    var puesto = document.getElementById("puesto").value;
    var dia = document.getElementById("dia").value;
    var hora = document.getElementById("hora").value;
    var database = firebase.database();
    var refPuesto = database.ref('laboratorios/'+lab+'/puestos');
    var estado;
    //var classes= database.ref('Classrooms');
    refPuesto.on('value', function(snap) {
        snap.forEach(function(childSnap) {
        var child = childSnap.val();
        console.log(child);
        if(child.nombre===puesto){
            estado=child.estado+dia+"-"+hora;
        }
        
    });});
    //var classes= database.ref('Classrooms');
    firebase.database().ref('laboratorios/'+lab+'/puestos/'+puesto).set({
        estado: estado,
        nombre: puesto,
      });
      console.log(user+" user");
    firebase.database().ref('reservas/'+user+puesto+dia+hora).set({
    estado: dia+"-"+hora,
    usuario: user,
    laboratorio: lab,
    puesto: puesto,
    });
}
