const database = firebase.firestore();
const user_collection = database.collection('Drink');
const lunch_collection = database.collection('Lunch');
const dinner_collection = database.collection('Dinner');
var storage = firebase.storage();

allProduct();

function activeDrink() {
    // setTimeout( loadingOn(),3000)
    document.getElementById('special').outerHTML = `<div class="row" id="special" style="min-height:50vh;">
    <div class="col-lg-12">
        <div class="special-menu text-center">
            <div class="button-group filter-button-group" >
            <button id="all" data-filter="*" onclick="allProduct()">Tất cả</button>
				<button id="drinks" data-filter=".drinks" onclick="activeDrink()">Nước Uống</button>
				<button id="lunch" data-filter=".lunch" onclick="activeLunch()">Bữa trưa</button>
				<button id="dinner" data-filter=".dinner" onclick="activeDinner()">Bữa tối</button>
            </div>
        </div>
    </div>
</div>`

    document.getElementById("all").classList.remove("active");
    document.getElementById("drinks").classList.add("active");
    document.getElementById("lunch").classList.remove("active");
    document.getElementById("dinner").classList.remove("active");
    drink();
    // loadingOff();
}

function activeLunch() {
    document.getElementById('special').outerHTML = `<div class="row" id="special" style="min-height:50vh">
    <div class="col-lg-12">
        <div class="special-menu text-center">
            <div class="button-group filter-button-group">
            <button id="all" data-filter="*" onclick="allProduct()">Tất cả</button>
            <button id="drinks" data-filter=".drinks" onclick="activeDrink()">Nước Uống</button>
            <button id="lunch" data-filter=".lunch" onclick="activeLunch()">Bữa trưa</button>
            <button id="dinner" data-filter=".dinner" onclick="activeDinner()">Bữa tối</button>
            </div>
        </div>
    </div>
</div>`

    document.getElementById("all").classList.remove("active");
    document.getElementById("drinks").classList.remove("active");
    document.getElementById("lunch").classList.add("active");
    document.getElementById("dinner").classList.remove("active");
    lunch();
}
function activeDinner() {
    document.getElementById('special').outerHTML = `<div class="row" id="special" style="min-height:50vh">
    <div class="col-lg-12">
        <div class="special-menu text-center">
            <div class="button-group filter-button-group">
            <button id="all" data-filter="*" onclick="allProduct()">Tất cả</button>
				<button id="drinks" data-filter=".drinks" onclick="activeDrink()">Nước Uống</button>
				<button id="lunch" data-filter=".lunch" onclick="activeLunch()">Bữa trưa</button>
				<button id="dinner" data-filter=".dinner" onclick="activeDinner()">Bữa tối</button>
            </div>
        </div>
    </div>
</div>`

    document.getElementById("all").classList.remove("active");
    document.getElementById("drinks").classList.remove("active");
    document.getElementById("lunch").classList.remove("active");
    document.getElementById("dinner").classList.add("active");
    dinner();
}
function allProduct() {
    // loadingOn()
    document.getElementById('special').outerHTML = `<div class="row" id="special" style="min-height:50vh">
    <div class="col-lg-12">
        <div class="special-menu text-center">
            <div class="button-group filter-button-group">
            <button id="all" data-filter="*" onclick="allProduct()">Tất cả</button>
				<button id="drinks" data-filter=".drinks" onclick="activeDrink()">Nước Uống</button>
				<button id="lunch" data-filter=".lunch" onclick="activeLunch()">Bữa trưa</button>
				<button id="dinner" data-filter=".dinner" onclick="activeDinner()">Bữa tối</button>
            </div>
            
        </div>
    </div>
    
</div>
`

    document.getElementById("all").classList.add("active");
    document.getElementById("drinks").classList.remove("active");
    document.getElementById("lunch").classList.remove("active");
    document.getElementById("dinner").classList.remove("active");

     dinner();
    lunch();
     drink();
    // loadingOff() 

}


function drink() {
    
    loadingOn()

    user_collection.get()
        //user_collection.where("price_product", ">=", 0).orderBy("price_product").limitToLast(3).get()
        .then(snapshot => {
            snapshot.forEach(form => {
                itemsLoad = form.data()
                    var html = document.getElementById("special");
                    html.insertAdjacentHTML("beforeend", ` 
                        <div data-aos="flip-right"  class="col-lg-4 col-md-6 special-grid drinks">
                        <a href="product-detail.html?uid=${form.id}&type=Dr">
                            <div class="gallery-single fix">
                                <img src="${itemsLoad.image_product}" class="img-fluid" alt="Image">
                                <div class="why-text">
                                    <h4 id="menu_name">${itemsLoad.name_product}</h4>
                                    <p id="menu_description">${itemsLoad.description_product}</p>
                                    <h5 id="menu_price">Giá: ${itemsLoad.price_product} VND</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                        `
                    )
            })
            // console.log(itemsLoad);
            loadingOff()
        })
        .catch(error => { console.log(error) })

    // loadingOff()
}

function lunch() {
   
    loadingOn()
    lunch_collection.get()
        .then(snapshot => {
            snapshot.forEach(form => {
                itemsLoad = form.data()
                    var html = document.getElementById("special");
                    html.insertAdjacentHTML("beforeend", ` 
                        <div data-aos="flip-right"  class="col-lg-4 col-md-6 special-grid drinks">
                        <a href="product-detail.html?uid=${form.id}&type=Lc">
                            <div class="gallery-single fix">
                                <img src="${itemsLoad.image_product}" class="img-fluid" alt="Image">
                                <div class="why-text">
                                    <h4 id="menu_name">${itemsLoad.name_product}</h4>
                                    <p id="menu_description">${itemsLoad.description_product}</p>
                                    <h5 id="menu_price">Giá: ${itemsLoad.price_product} VND</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                        `
                    )
            })
            loadingOff()
        })
        .catch(error => { console.log(error) })
}

function dinner() {
    loadingOn()
    dinner_collection.get()
        .then(snapshot => {
            snapshot.forEach(form => {
                itemsLoad = form.data()
                    var html = document.getElementById("special");
                    html.insertAdjacentHTML("beforeend", ` 
                        <div data-aos="flip-right"  class="col-lg-4 col-md-6 special-grid drinks">
                        <a href="product-detail.html?uid=${form.id}&type=Dn">
                            <div class="gallery-single fix">
                                <img src="${itemsLoad.image_product}" class="img-fluid" alt="Image">
                                <div class="why-text">
                                    <h4 id="menu_name">${itemsLoad.name_product}</h4>
                                    <p id="menu_description">${itemsLoad.description_product}</p>
                                    <h5 id="menu_price">Giá: ${itemsLoad.price_product} VND</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                        `
                    )
            })  
            loadingOff()
        })
        .catch(error => { console.log(error) })
}
// function selectAcc(id) {
//     const userName = document.getElementById('userName');
//     const account = document.getElementById('account');
//     const password = document.getElementById('password');
//     drink_collection.doc(id).get()
//         .then(user => {
//             if (user.exists) {
//                 userName.value = user.data().user_name;
//                 account.value = user.data().email;
//                 password.value = user.data().password1;
//                 uid = id;
//             }

//             else
//                 console.log('Người dùng không tồn tại')
//         })
//         .catch(error => {
//             console.log('error');
//         })
// }

const customerReview = document.getElementById('customerReview');
loadCustomerPreview();
function loadCustomerPreview() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user != null) {
            database.collection('Contact').get()
                .then(snapshot => {
                    snapshot.forEach(form => {
                        itemsLoad = form.data()
                        var html = document.getElementById("customerReview");
                        html.insertAdjacentHTML("beforeend", ` 
                        <div class="carousel-item text-center ">
                        <div class="img-box p-1 border rounded-circle m-auto">
                            <img class="d-block w-100 rounded-circle" src="images/anh-dai-dien-FB-200.jpg" alt="">
                        </div>
                        <h5 class="mt-4 mb-0"><strong class="text-warning text-uppercase">${itemsLoad.name}</strong></h5>
                        <h6 class="text-dark m-0">Khách hàng</h6>
                        <p class="m-0 pt-3">${itemsLoad.message}</p>
                    </div>
        `)
                    })
                })
                .catch(error => { console.log(error) })

        }
    });
}