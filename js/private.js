function isLoaded() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            
                var name = user.displayName;
                var email = user.email;
                var uid = user.uid;
                document.getElementById('name_user').innerText = 'Xin chào: ' + name;
                document.getElementById('sign_in_user').style.display='none';
                if(email == "quynhthptlc@gmail.com"){
                    document.getElementById("adminPage").style.display = "block";

                }
                else{
                    
                    document.getElementById("adminPage").style.display = "none";
                }
        } else {
            // No user is signed in.
            document.getElementById("adminPage").style.display = "none";     
            document.getElementById('sign_out_user').style.display='none';
        }
    });
}
function sign_out(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        document.location='index.html';
        document.getElementById('user_name').display='none';
      }).catch((error) => {
        // An error happened.
      });
}
