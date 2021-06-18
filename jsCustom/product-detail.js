const database = firebase.firestore();
const drink_collection = database.collection('Drink');
const lunch_collection = database.collection('Lunch');
const dinner_collection = database.collection('Dinner');
const count = document.getElementById('count');
const imageProductDetails = document.getElementById('imageProductDetails')
const uid = GetURLParameter('uid');
const type = GetURLParameter('type');

var title = document.getElementById('title'),
    description = document.getElementById('description'),
    price = document.getElementById('price')

showProduct()
function showProduct() {
    switch (type) {
        case 'Dr':
            database.collection('Drink').doc(uid).get()
                .then(user => {
                    if (user.exists) {
                        imageProductDetails.src = user.data().image_product
                        title.innerText = user.data().name_product
                        description.innerText = user.data().description_product
                        price.innerText = user.data().price_product
                    }

                    else {
                        console.log('khoong toon tai');
                    }

                })
                .catch(error => {
                    console.log('error');
                })

            break;
        case 'Lc':
            database.collection('Lunch').doc(uid).get()
                .then(user => {
                    if (user.exists) {
                        imageProductDetails.src = user.data().image_product
                        title.innerText = user.data().name_product
                        description.innerText = user.data().description_product
                        price.innerText = user.data().price_product
                    }

                    else {
                        console.log('khoong toon tai');
                    }

                })
                .catch(error => {
                    console.log('error');
                })

            break;
        case 'Dn':
            database.collection('Dinner').doc(uid).get()
                .then(user => {
                    if (user.exists) {
                        imageProductDetails.src = user.data().image_product
                        title.innerText = user.data().name_product
                        description.innerText = user.data().description_product
                        price.innerText = user.data().price_product
                    }

                    else {
                        console.log('khoong toon tai');
                    }
                })
                .catch(error => {
                    console.log('error');
                })
    }
}

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

const addcard = document.getElementById('addcard');

addcard.addEventListener('click', e => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
                database.collection('Cart').doc(user.uid).collection('Giohang').add({
                imageProductCart: imageProductDetails.src,
                nameCart_Product: title.innerText,
                priceCart_Product: parseInt(price.innerText),
                NameUser: user.displayName,
                count: parseInt(count.value) 
            }).then(() => {
                alert('Thêm thành công');
                window.location='menu.html'
            })
                .catch(() => { console.log('Thêm thất bại') })
        } else {
            window.location='sign_in.html'
        }
    })
})

function success() {
    window.location.reload();
}
