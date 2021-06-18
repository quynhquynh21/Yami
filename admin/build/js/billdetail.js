const database = firebase.firestore();
var customer = document.getElementById('customer'),
    Email_customer = document.getElementById('Email_customer')
    nameP = document.getElementById('nameP')
    imgP = document.getElementById('imgP')
    countP = document.getElementById('count')
    priceP = document.getElementById('price')
const uid = GetURLParameter('uid');
const increment = document.getElementById('increment')
showCustomer()

function showCustomer() {
    
    database.collection('user').doc(uid).get()
                .then(user => {
                    if (user.exists) {
                        customer.innerText = 'Tên khách hàng: ' + user.data().user_name
                        Email_customer.innerText = 'Email: ' + user.data().email
                    }

                    else {
                        console.log('khoong toon tai');
                    }

                })
                .catch(error => {
                    console.log('error');
                })
            
    
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

// function increment1 (){
//     database.collection('Cart').doc(uid).collection('Giohang').update({
//         increment: firebase.firestore.FieldValue.increment(1)
//     })
// }
loadcart();
sumPrice();
into_money();
function loadcart() {
    document.getElementById('bill_invoice').outerHTML = ` <tbody id="bill_invoice">
                <tr>

                </tr>
            </tbody>`

    firebase.auth().onAuthStateChanged(function (user) {
        //const user = firebase.auth().currentUser;
        if (user != null) {
            i=0;
            database.collection('Cart').doc(uid).collection('Giohang').get()
                .then(snapshot => {
                    snapshot.forEach(form => {
                        
                        itemsLoad = form.data()
                        i++;
                        var html = document.getElementById("bill_invoice");
                        html.insertAdjacentHTML("beforeend", ` 
            <tr>
            <td style="padding-left: 20px; " id="increment">${i}</td>
            <td style="text-align:center">${itemsLoad.nameCart_Product}</td>
            <td style="text-align:center"><img src="${itemsLoad.imageProductCart}" style="width:200px; height:150px"></td>
            <td style="padding-left:40px">${itemsLoad.count}</td>
            <td>${itemsLoad.priceCart_Product} VND</td>
        </tr>
        `)
                    })
                })
                .catch(error => { console.log(error) })

        }
    });
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


/*Tính tổng giá tiền */
function sumPrice() {
    var totalPrice = 0;    
            database.collection('Cart').doc(uid).collection('Giohang').get()
                .then(snapshot => {
                    snapshot.forEach(form => {

                        itemsLoad = form.data()

                        totalPrice  += (itemsLoad.priceCart_Product * itemsLoad.count)
                        
                        into_money = totalPrice + (totalPrice * 20/100)
                    })
                    
                    var html = document.getElementById("sum_price");
                    html.innerHTML = `<strong>${totalPrice}  VND </strong>`

                    var html1 = document.getElementById("into_money");
                    html1.innerHTML = `<strong>${into_money}  VND </strong>`

                
                })
                .catch(error => { console.log(error); })
            
}
