
const database = firebase.firestore();
const db = database.collection('user');


function signin() {
    loadingOn();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password1").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user);
            document.location = 'index.html'
            loadingOff();
            // ...
        })
        .catch(function (error) {
            // Handle Errors here.
            loadingOff();
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Sai mật khẩu');
            } else {
                if (errorCode === 'auth/invalid-email') {
                    alert('Email không hợp lệ');
                }
                else {
                    if (errorCode === 'auth/user-not-found') {
                        alert('Không tìm thấy người dùng');
                    }
                    else {
                        alert('Email đã được sử dụng');
                    }
                }
            }
        });
}
function signup() {

    var email = document.getElementById("email").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
    var user_name = document.getElementById("firstname").value;
    if (password1 != password2) {
        alert('Mật khẩu không khớp');
    }
    if (password1 == null) {
        alert('Vui lòng điền mật khẩu')
    }
    firebase.auth().createUserWithEmailAndPassword(email, password1)
        .then((userCredential) => {
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: user_name,
            }).then(function () {
                // Update successful.
            }).catch(function (error) {
                // An error happened.
                console.log(error);
            });
            console.log(user.uid);
            db.doc(user.uid).set({
                email: email,
                password1: password1,
                user_name: user_name,
                role:'khách hàng'
            })
                .then(() => { console.log('Thêm thành công')
                document.location = 'index.html'
            })
                .catch(() => { console.log('Thêm thất bại') })
            
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('Mật khẩu không đủ mạnh');
            } else {
                if (errorCode == 'auth/email-already-in-use') {
                    alert('Email đã được sử dụng')
                }
                if (errorCode == 'auth/invalid-email') {
                    alert('Địa chỉ Email không hợp lệ')
                }
                else {
                    alert(errorMessage);
                }
            }

        });

}
function google() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.addScope('https://www.googleapis.com/auth/admin.directory.customer')
    firebase.auth().languageCode = 'it';
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            document.location = 'index.html'
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    firebase.auth()
        .getRedirectResult()
        .then((result) => {
            if (result.credential) {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // ...
            }
            // The signed-in user info.
            var user = result.user;
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}
function facebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday,email');
    firebase.auth().languageCode = 'it';
    provider.setCustomParameters({
        'display': 'popup' //Login dưới dạng popup
    });
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken; //Token facebook của user
        aler(user)
        var user = result.user; //Thông tin của user
        aler(user.email);
        var userimage = document.querySelector()

    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
    window.fbAsyncInit = function () {
        FB.init({
            appId: '{your-app-id}',
            cookie: true,
            xfbml: true,
            version: '{api-version}'
        });

        FB.AppEvents.logPageView();

    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}


function account(){
    db.get()
    .then(snapshot => {
        snapshot.forEach(form => {
            itemsLoad = form.data()
            var html = document.getElementById("special");
            html.insertAdjacentHTML("beforeend", ` 
            <div class="col-lg-4 col-md-6 special-grid drinks">
            <a href="product-detail.html">
                <div class="gallery-single fix">
                    <img src="images/bia.jpg" class="img-fluid" alt="Image">
                    <div class="why-text">
                        <h4>${itemsLoad.name_product}</h4>
                        <p>${itemsLoad.description_product}</p>
                        <h5>${itemsLoad.price_product} VND</h5>
                    </div>
                </div>
            </a>
        </div>
            `)
        console.log(itemsLoad);
        })
    })
    .catch(error => { console.log(error) })
}