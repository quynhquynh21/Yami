const database = firebase.firestore();
const user_collection = database.collection('Drink');
const lunch_collection = database.collection('Lunch');
const dinner_collection = database.collection('Dinner');
const newproduct = database.collection('NewProduct');
drink()
lunch()
dinner()

function drink() {
    user_collection.get()
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

function lunch() {
    lunch_collection.get()
        .then(snapshot => {
            snapshot.forEach(form => {
                itemsLoad = form.data()
                var html = document.getElementById("special");
                html.insertAdjacentHTML("beforeend", ` 
            <div class="col-lg-4 col-md-6 special-grid lunch">
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

function dinner() {
    dinner_collection.get()
        .then(snapshot => {
            snapshot.forEach(form => {
                itemsLoad = form.data()
                var html = document.getElementById("special");
                html.insertAdjacentHTML("beforeend", ` 
            <div class="col-lg-4 col-md-6 special-grid dinner">
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

NewProduct();
function NewProduct() {
    newproduct.get()
        .then(snapshot => {
            snapshot.forEach(form => {
                itemsLoad = form.data()
                var html = document.getElementById("new_product");
                html.insertAdjacentHTML("beforeend", ` 
                <div class="col-xs-12 col-md-3">
                <a class="lightbox" href="${itemsLoad.image_product}">
                    <img style="width:480px; height:320px; margin-bottom:30px;" class="img-fluid" src="${itemsLoad.image_product}" alt="Gallery Images">
                </a>
            </div>
            `)
                console.log(itemsLoad);
            })
        })
        .catch(error => { console.log(error) })
}