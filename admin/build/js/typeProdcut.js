
const name_product = document.getElementById('name_product');
const description_product = document.getElementById('description_product');
const price_product = document.getElementById('price_product');
const addProduct = document.getElementById('addProduct');
const editProduct = document.getElementById('editProduct');
const deleteProduct = document.getElementById('deleteProduct');
const selectMenu = document.getElementById('selectMenu');
const fileButton = document.getElementById('fileButton');
const database = firebase.firestore();


var uid = 0;

addProduct.addEventListener('click', e => {
  e.preventDefault();// mặc định

  console.log(selectMenu.value);

  menu();
});

loadProduct()
function menu() {
  switch (selectMenu.value) {
    case 'Dr':

      var fileButton = document.getElementById('fileButton').files[0];


      try {
        var imageName = fileButton.name;
        var uploadTask = firebase.storage().ref('/Drink/' + imageName).put(fileButton);

        uploadTask.on('state_changed', function (snapshot) {

        }, function (error) {
          console.log(error);
        }, function () {
          // get the uploaded image url back
          uploadTask.snapshot.ref.getDownloadURL().then(
            function (downloadURL) {
              database.collection('Drink').add({// id user tự động
                image_product: downloadURL,
                name_product: name_product.value,
                description_product: description_product.value,
                price_product: parseInt(price_product.value),
                type_product: 'Đồ uống'
              })
                .then(() => {
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



      break;
    case 'Lc':
      var fileButton = document.getElementById('fileButton').files[0];


      try {
        var imageName = fileButton.name;
        var uploadTask = firebase.storage().ref('/Lunch/' + imageName).put(fileButton);

        uploadTask.on('state_changed', function (snapshot) {

        }, function (error) {
          console.log(error);
        }, function () {
          // get the uploaded image url back
          uploadTask.snapshot.ref.getDownloadURL().then(
            function (downloadURL) {
              database.collection('Lunch').add({// id user tự động
                image_product: downloadURL,
                name_product: name_product.value,
                description_product: description_product.value,
                price_product: parseInt(price_product.value),
                type_product: 'Bữa trưa'
              })
                .then(() => {
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

      break;
    case 'Dn':
      var fileButton = document.getElementById('fileButton').files[0];


      try {
        var imageName = fileButton.name;
        var uploadTask = firebase.storage().ref('/Dinner/' + imageName).put(fileButton);

        uploadTask.on('state_changed', function (snapshot) {

        }, function (error) {
          console.log(error);
        }, function () {
          // get the uploaded image url back
          uploadTask.snapshot.ref.getDownloadURL().then(
            function (downloadURL) {
              database.collection('Dinner').add({// id user tự động
                image_product: downloadURL,
                name_product: name_product.value,
                description_product: description_product.value,
                price_product: parseInt(price_product.value),
                type_product: 'Bữa tối'
              })
                .then(() => {
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

      break;
    default:

  }
}

function loadProduct() {
  document.getElementById('typeProdcut').outerHTML = ` <tbody id="typeProdcut">
              <tr>
               
              </tr>
            </tbody>`

  firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
      database.collection('Drink').get()
        .then(snapshot => {
          snapshot.forEach(form => {
            //     loadingOnstorageRef.ref('Drink' + imageName).getDownloadURL().then(imgURL =>{})
            itemsLoad = form.data()
            var html = document.getElementById("typeProdcut");
            html.insertAdjacentHTML("beforeend", ` 
                        <tr onclick="selectTypeProduct('${form.id}','${itemsLoad.type_product}')">
                        <td>
                        <div class="td_item item_img">
                        <img src="${itemsLoad.image_product}" style="width:200px; height:150px">
                          
                        </div>
                        <td>
                        <div class="td_item item_name" style="text-align: center;">
                          ${itemsLoad.name_product}
                        </div>
                      </td>
                      <td>
                        <div class="td_item" id= "item_description" style="height: 150px;  overflow:auto;">
                        ${itemsLoad.description_product}
                        </div>
                      </td>
                      <td class="project_progress" style="text-align: center;">
                        <div class="td_item item_price">
                        ${itemsLoad.price_product}
                        </div>
                      </td>
                      <td>
                        <div class="td_item item_qty" style="text-align: center;">
                        ${itemsLoad.type_product}
                        </div>
                      </td>
                        </tr>
                       
                    `)
            var styledess = document.getElementById(item_description)

          })
        })
        .catch(error => { console.log(error) })
      database.collection('Lunch').get()
        .then(snapshot => {
          snapshot.forEach(form => {
            itemsLoad = form.data()
            var html = document.getElementById("typeProdcut");
            html.insertAdjacentHTML("beforeend", ` 
                        <tr onclick="selectTypeProduct('${form.id}','${itemsLoad.type_product}')">
                        <td>
                        <div class="td_item item_img">
                        <img src="${itemsLoad.image_product}" style="width:200px; height:150px">
                        </div>
                        <td>
                        <div class="td_item item_name" style="text-align: center;">
                          ${itemsLoad.name_product}
                        </div>
                      </td>
                      <td>
                        <div class="td_item" id= "item_description" style="height: 150px;  overflow:auto;">
                        ${itemsLoad.description_product}
                        </div>
                      </td>
                      <td class="project_progress">
                        <div class="td_item item_price" style="text-align: center;">
                        ${itemsLoad.price_product}
                        </div>
                      </td>
                      <td>
                        <div class="td_item item_qty" style="text-align: center;">
                        ${itemsLoad.type_product}
                        </div>
                      </td>
                        </tr>
                        
                    `)

          })
        })
        .catch(error => { console.log(error) })
      database.collection('Dinner').get()
        .then(snapshot => {
          snapshot.forEach(form => {
            itemsLoad = form.data()
            var html = document.getElementById("typeProdcut");
            html.insertAdjacentHTML("beforeend", ` 
                        <tr onclick="selectTypeProduct('${form.id}','${itemsLoad.type_product}')">
                        <td>
                        <div class="td_item item_img">
                        <img src="${itemsLoad.image_product}" style="width:200px; height:150px">
                        </div>
                        <td>
                        <div class="td_item item_name" style="text-align: center;">
                          ${itemsLoad.name_product}
                        </div>
                      </td>
                      <td>
                        <div class="td_item" id= "item_description" style="height: 150px;  overflow:auto;">
                        ${itemsLoad.description_product}
                        </div>
                      </td>
                      <td class="project_progress" >
                        <div class="td_item item_price" style="text-align: center;" >
                        ${itemsLoad.price_product}
                        </div>
                      </td>
                      <td>
                        <div class="td_item item_qty" style="text-align: center;">
                        ${itemsLoad.type_product}
                        </div>
                      </td>
                        </tr>
                        
                    `)

          })
        })
        .catch(error => { console.log(error) })
    }
  });
}

function selectTypeProduct(id, type_product) {
  const image_product = document.getElementById('image_product');
  const name_product = document.getElementById('name_product');
  const description_product = document.getElementById('description_product');
  const price_product = document.getElementById('price_product');
  var selecdr = document.getElementById('dr');
  var seleclc = document.getElementById('lc');
  var selecdn = document.getElementById('dn');

  switch (type_product) {
    case 'Đồ uống':

      database.collection('Drink').doc(id).get()
        .then(user => {

          if (user.exists) {
            image_product.src = user.data().image_product;
            name_product.value = user.data().name_product;
            description_product.value = user.data().description_product;
            price_product.value = user.data().price_product;
            selectMenu.value = user.data().type_product;
            uid = id;

            selecdr.removeAttribute('selected', 'selected');
            seleclc.removeAttribute('selected', 'selected');
            selecdn.removeAttribute('selected', 'selected');
            selecdr.setAttribute('selected', 'selected');
          }

          else
            console.log('Người dùng không tồn tại')
        })
        .catch(error => {
          console.log('error');
        })
      break;

    case 'Bữa trưa':
      database.collection('Lunch').doc(id).get()
        .then(user => {
          if (user.exists) {
            image_product.src = user.data().image_product
            name_product.value = user.data().name_product;
            description_product.value = user.data().description_product;
            price_product.value = user.data().price_product;
            selectMenu.value = user.data().type_product;
            uid = id;

            seleclc.removeAttribute('selected', 'selected');
            selecdr.removeAttribute('selected', 'selected');
            selecdn.removeAttribute('selected', 'selected');
            seleclc.setAttribute('selected', 'selected');
          }

          else
            console.log('Người dùng không tồn tại')
        })
        .catch(error => {
          console.log('error');
        })
      break;

    case 'Bữa tối':
      database.collection('Dinner').doc(id).get()
        .then(user => {

          if (user.exists) {
            image_product.src = user.data().image_product
            name_product.value = user.data().name_product;
            description_product.value = user.data().description_product;
            price_product.value = user.data().price_product;
            selectMenu.value = user.data().type_product;
            uid = id;

            selecdn.removeAttribute('selected', 'selected');
            seleclc.removeAttribute('selected', 'selected');
            selecdr.removeAttribute('selected', 'selected');
            selecdn.setAttribute('selected', 'selected');
          }

          else
            console.log('Người dùng không tồn tại')
        })
        .catch(error => {
          console.log('error');
        })
    default:

  }

}
editProduct.addEventListener('click', e => {

  e.preventDefault();// mặc định
  const filebutton = document.getElementById('fileButton');
  const image_product = document.getElementById('image_product');
  const name_product = document.getElementById('name_product');
  const description_product = document.getElementById('description_product');
  const price_product = document.getElementById('price_product');
  const type_product = document.getElementById('selectMenu');
  var allTypeproduct;
  if (selectMenu.value == 'Dr') {
    allTypeproduct = 'Đồ uống'
  }
  else if (selectMenu.value == 'Lc') {
    allTypeproduct = 'Bữa trưa'

  }
  else {
    allTypeproduct = 'Bữa tối'
  }

  switch (selectMenu.value) {
    case 'Dr':

      database.collection('Drink').doc(uid).get()
        .then(user => {
          if (user.exists) {
            if(filebutton.files.length > 0) {
              try {
                var fileButton = filebutton.files[0];
              var imageName = fileButton.name;
              } catch (error) {
                var uploadTask = firebase.storage().ref('/Drink/' + imageName).put(fileButton);
              uploadTask.on('state_changed', function (snapshot) {
  
              }, function (error) {
                console.log(error);
              }, function () {
                // get the uploaded image url back
                uploadTask.snapshot.ref.getDownloadURL().then(
                  function (downloadURL) {
                    database.collection('Drink').doc(uid).update({// id user tự động
                      name_product: name_product.value,
                      description_product: description_product.value,
                      price_product: price_product.value,
                      type_product: allTypeproduct,
                      image_product: downloadURL
                    })
                      .then(() => {
                        document.getElementById('error-box').style.display = 'none'
                        document.getElementById('success-box').style.display = 'block'
                        loadingOn();
                        console.log('sửa thành công')
                      })
                      .catch(() => { console.log('Thêm thất bại') })
                    console.log(downloadURL);
                  });
              });
              }
            }
            else{
              database.collection('Drink').doc(uid).update({// id user tự động
                name_product: name_product.value,
                description_product: description_product.value,
                price_product: price_product.value,
                type_product: allTypeproduct,
              })
                .then(() => {
                  document.getElementById('error-box').style.display = 'none'
                  document.getElementById('success-box').style.display = 'block'
                  loadingOn();
                  console.log('sửa thành công')
                })
                .catch(() => { console.log('Thêm thất bại') })
            }
          }

          else {
            document.getElementById('error-box').style.display = 'block'
            document.getElementById('success-box').style.display = 'none'
            // console.log('Người dùng không tồn tại')
            // database.collection('Drink').add({// id user tự động
            //   name_product: name_product.value,
            //   description_product: description_product.value,
            //   price_product: price_product.value,
            //   type_product: allTypeproduct
            // })
            //   .then(() => {
            //     loadingOn();
            //     console.log('Thêm thành công')
            //   })
            //   .catch(() => { console.log('Thêm thất bại') })
          }

        })
        .catch(error => {
          console.log(error);
        })

      break;
    case 'Lc':
      database.collection('Lunch').doc(uid).get()
      .then(user => {
        if (user.exists) {
          if(filebutton.files.length > 0) {
            try {
              var fileButton = filebutton.files[0];
            var imageName = fileButton.name;
            } catch (error) {
              var uploadTask = firebase.storage().ref('/Lunch/' + imageName).put(fileButton);
            uploadTask.on('state_changed', function (snapshot) {

            }, function (error) {
              console.log(error);
            }, function () {
              // get the uploaded image url back
              uploadTask.snapshot.ref.getDownloadURL().then(
                function (downloadURL) {
                  database.collection('Drink').doc(uid).update({// id user tự động
                    name_product: name_product.value,
                    description_product: description_product.value,
                    price_product: price_product.value,
                    type_product: allTypeproduct,
                    image_product: downloadURL
                  })
                    .then(() => {
                      document.getElementById('error-box').style.display = 'none'
                      document.getElementById('success-box').style.display = 'block'
                      loadingOn();
                      console.log('sửa thành công')
                    })
                    .catch(() => { console.log('Thêm thất bại')})
                  console.log(downloadURL);
                });
            });
            }
          }
          else{
            database.collection('Lunch').doc(uid).update({// id user tự động
              name_product: name_product.value,
              description_product: description_product.value,
              price_product: price_product.value,
              type_product: allTypeproduct,
            })
              .then(() => {
                document.getElementById('error-box').style.display = 'none'
                document.getElementById('success-box').style.display = 'block'
                loadingOn();
                console.log('sửa thành công')
              })
              .catch(() => { console.log('Thêm thất bại') })
          }
        }

        else {
          document.getElementById('error-box').style.display = 'block'
          document.getElementById('success-box').style.display = 'none'
          // console.log('Người dùng không tồn tại')
          // database.collection('Drink').add({// id user tự động
          //   name_product: name_product.value,
          //   description_product: description_product.value,
          //   price_product: price_product.value,
          //   type_product: allTypeproduct
          // })
          //   .then(() => {
          //     loadingOn();
          //     console.log('Thêm thành công')
          //   })
          //   .catch(() => { console.log('Thêm thất bại') })
        }

      })
      .catch(error => {
        console.log(error);
      })

      break;
    case 'Dn':
      database.collection('Dinner').doc(uid).get()
        .then(user => {
          if (user.exists) {
            if(filebutton.files.length > 0) {
              try {
                var fileButton = filebutton.files[0];
              var imageName = fileButton.name;
              } catch (error) {
                var uploadTask = firebase.storage().ref('/Dinner/' + imageName).put(fileButton);
              uploadTask.on('state_changed', function (snapshot) {
  
              }, function (error) {
                console.log(error);
              }, function () {
                // get the uploaded image url back
                uploadTask.snapshot.ref.getDownloadURL().then(
                  function (downloadURL) {
                    database.collection('Drink').doc(uid).update({// id user tự động
                      name_product: name_product.value,
                      description_product: description_product.value,
                      price_product: price_product.value,
                      type_product: allTypeproduct,
                      image_product: downloadURL
                    })
                      .then(() => {
                        document.getElementById('error-box').style.display = 'none'
                        document.getElementById('success-box').style.display = 'block'
                        loadingOn();
                        console.log('sửa thành công')
                      })
                      .catch(() => { console.log('Thêm thất bại') })
                    console.log(downloadURL);
                  });
              });
              }
            }
            else{
              database.collection('Dinner').doc(uid).update({// id user tự động
                name_product: name_product.value,
                description_product: description_product.value,
                price_product: price_product.value,
                type_product: allTypeproduct,
              })
                .then(() => {
                  document.getElementById('error-box').style.display = 'none'
                  document.getElementById('success-box').style.display = 'block'
                  loadingOn();
                  console.log('sửa thành công')
                })
                .catch(() => { console.log('Thêm thất bại') })
            }
          }

          else {
            document.getElementById('error-box').style.display = 'block'
            document.getElementById('success-box').style.display = 'none'
            // console.log('Người dùng không tồn tại')
            // database.collection('Drink').add({// id user tự động
            //   name_product: name_product.value,
            //   description_product: description_product.value,
            //   price_product: price_product.value,
            //   type_product: allTypeproduct
            // })
            //   .then(() => {
            //     loadingOn();
            //     console.log('Thêm thành công')
            //   })
            //   .catch(() => { console.log('Thêm thất bại') })
          }
        })
        .catch(error => {
          console.log(error);
        })
      break;
    default:
  }
});

deleteProduct.addEventListener('click', e => {//xoá một collection trên firebase
  e.preventDefault();// mặc định
  switch (selectMenu.value) {
    case 'Dr':
      database.collection('Drink').doc(uid).delete()
        .then(() => {
          document.getElementById('error-box').style.display = 'none'
          document.getElementById('success-box').style.display = 'block'
          loadingOn();
          console.log('xoá thành công')
          loadProduct();
        })
        .catch(() => { console.log('xoá thất bại') })
      break;
    case 'Lc':
      database.collection('Lunch').doc(uid).delete()

        .then(() => {
          document.getElementById('error-box').style.display = 'none'
          document.getElementById('success-box').style.display = 'block'
          loadingOn(); console.log('xoá thành công')
          loadProduct();
        })
        .catch(() => { console.log('xoá thất bại') })

      break;
    case 'Dn':
      database.collection('Dinner').doc(uid).delete()

        .then(() => {
          document.getElementById('error-box').style.display = 'none'
          document.getElementById('success-box').style.display = 'block'
          loadingOn(); console.log('xoá thành công')
          loadProduct();
        })
        .catch(() => { console.log('xoá thất bại') })
      break;
    default:
  }

});
function success() {
  window.location.reload();
}



function preview() {
  let image_product = document.getElementById('image_product');
  image_product.src = URL.createObjectURL(event.target.files[0]);
}