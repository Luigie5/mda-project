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
mostrarUsuario();
writeUserData("usuario2","Pedro");