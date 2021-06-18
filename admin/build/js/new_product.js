$('#fileup').change(function () {
    //here we take the file extension and set an array of valid extensions
    var res = $('#fileup').val();
    var arr = res.split("\\");
    var filename = arr.slice(-1)[0];
    filextension = filename.split(".");
    filext = "." + filextension.slice(-1)[0];
    valid = [".jpg", ".png", ".jpeg", ".bmp"];
    //if file is not valid we show the error icon, the red alert, and hide the submit button
    if (valid.indexOf(filext.toLowerCase()) == -1) {
        $(".imgupload").hide("slow");
        $(".imgupload.ok").hide("slow");
        $(".imgupload.stop").show("slow");

        $('#namefile').css({ "color": "red", "font-weight": 700 });
        $('#namefile').html("Tệp " + filename + " không đúng định dạng");

        $("#submitbtn").hide();
        $("#fakebtn").show();
    } else {
        //if file is valid we show the green alert and show the valid submit
        $(".imgupload").hide("slow");
        $(".imgupload.stop").hide("slow");
        $(".imgupload.ok").show("slow");

        $('#namefile').css({ "color": "green", "font-weight": 700 });
        $('#namefile').html(filename);

        $("#submitbtn").show();
        $("#fakebtn").hide();
    }
});
loadImage()
const database = firebase.firestore();
const submitbtn = document.getElementById('submitbtn')
const editProduct = document.getElementById('editProduct');
const deleteProduct = document.getElementById('deleteProduct');


submitbtn.addEventListener('click', e => {
    e.preventDefault();
    var fileup = document.getElementById('fileup').files[0];
    try {
        var imageName = fileup.name;
        var uploadTask = firebase.storage().ref('/NewProduct/' + imageName).put(fileup);

        uploadTask.on('state_changed', function (snapshot) {

        }, function (error) {
            console.log(error);
        }, function () {
            // get the uploaded image url back
            uploadTask.snapshot.ref.getDownloadURL().then(
                function (downloadURL) {
                    database.collection('NewProduct').add({// id user tự động
                        imageName: imageName,
                        image_product: downloadURL,
                    }).then(() => {
                        document.getElementById('error-box').style.display = 'none'
                        document.getElementById('success-box').style.display = 'block'
                        loadingOn(); console.log('Thêm thành công')
                    })
                        .catch(() => { console.log('Thêm thất bại') })
                    console.log(downloadURL);
                });
        });
    } catch (error) {
        alert('chưa chọn ảnh')
    }

})
function success() {
    window.location.reload();
}

function loadImage() {
    document.getElementById('imageProduct').outerHTML = ` <tbody id="imageProduct">
                
              </tbody>`

    firebase.auth().onAuthStateChanged(function (user) {
        if (user != null) {
            database.collection('NewProduct').get()
                .then(snapshot => {
                    snapshot.forEach(form => {
                        //     loadingOnstorageRef.ref('Drink' + imageName).getDownloadURL().then(imgURL =>{})
                        itemsLoad = form.data()
                        var html = document.getElementById("imageProduct");
                        html.insertAdjacentHTML("beforeend", ` 
                            <img onclick="selectTypeProduct('${form.id}','${itemsLoad.imageName}')" src="${itemsLoad.image_product}" style="width:200px; height:150px">
                      `)
                    })
                })
                .catch(error => { console.log(error) })
        }
    });
}

var uid = 0;
var nameImage='';
function selectTypeProduct(id,name) {
    const image_product = document.getElementById('image_product');

    database.collection('NewProduct').doc(id).get()
        .then(user => {
            if (user.exists) {
                image_product.src = user.data().image_product
                uid = id;
                image_product.name = user.data().imageName
            }
            else
                console.log('Người dùng không tồn tại')
        })
        .catch(error => {
            console.log('error');
        })

}


editProduct.addEventListener('click', e => {

    e.preventDefault();// mặc định
    const image_product = document.getElementById('image_product');
    database.collection('NewProduct').doc(uid).get()
        .then(user => {
            if (user.exists) {
                var fileup = document.getElementById('fileup').files[0];
                try {
                    var imageName = fileup.name;
                    var uploadTask = firebase.storage().ref('/NewProduct/' + imageName).put(fileup);

                    uploadTask.on('state_changed', function (snapshot) {

                    }, function (error) {
                        console.log(error);
                    }, function () {
                        // get the uploaded image url back
                        uploadTask.snapshot.ref.getDownloadURL().then(
                            function (downloadURL) {
                                database.collection('NewProduct').doc(uid).update({// id user tự động
                                    imageName: imageName,
                                    image_product: downloadURL,
                                }).then(() => {
                                    document.getElementById('error-box').style.display = 'none'
                                    document.getElementById('success-box').style.display = 'block'
                                    loadingOn(); console.log('Thêm thành công')
                                })
                                    .catch(() => { console.log('Thêm thất bại') })
                                console.log(downloadURL);
                            });
                    });
                } catch (error) {
                    alert('chưa chọn ảnh')
                }
            }
            else {
                document.getElementById('error-box').style.display = 'block'
                document.getElementById('success-box').style.display = 'none'
            }

        })
        .catch(error => {
            console.log('error');
        })
});

deleteProduct.addEventListener('click', e => {//xoá một collection trên firebase
    e.preventDefault();// mặc định
   
    
        var fileup = document.getElementById('image_product');
        var imageName = fileup.name;
        var uploadTask = firebase.storage().ref('/NewProduct/' + imageName).delete();

    database.collection('NewProduct').doc(uid).delete() 
    .then(() => {
        document.getElementById('error-box').style.display = 'none'
        document.getElementById('success-box').style.display = 'block'
        loadingOn(); console.log('xoá thành công')
        loadProduct();
      })
      .catch(() => { console.log('xoá thất bại') })
});
function preview() {
    let image_product = document.getElementById('image_product');
    image_product.src = URL.createObjectURL(event.target.files[0]);
}