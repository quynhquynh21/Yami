/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 0;
var fadeTime = 300;
var uid = 0;

/* Assign actions */
$('.product-quantity input').change(function () {
  updateQuantity(this);
});

$('.product-removal button').click(function () {
  removeItem(this);
});


/* Recalculate cart */
function recalculateCart() {
  var subtotal = 0;

  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-price').text());
  });

  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + tax + shipping;

  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function () {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    $('#cart-tax').html(tax.toFixed(2));
    $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html(total.toFixed(2));
    if (total == 0) {
      $('.checkout').fadeOut(fadeTime);
    } else {
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
}


/* Update quantity */
function updateQuantity(quantityInput) {
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function () {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });
}
/* Remove item from cart */
function removeItem(removeButton) {
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function () {
    productRow.remove();
    recalculateCart();
  });
}
jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
jQuery('.quantity').each(function () {
  var spinner = jQuery(this),
    input = spinner.find('input[type="number"]'),
    btnUp = spinner.find('.quantity-up'),
    btnDown = spinner.find('.quantity-down'),
    min = input.attr('min'),
    max = input.attr('max');

  btnUp.click(function () {
    var oldValue = parseFloat(input.val());
    if (oldValue >= max) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue + 1;
    }
    spinner.find("input").val(newVal);
    spinner.find("input").trigger("change");
  });

  btnDown.click(function () {
    var oldValue = parseFloat(input.val());
    if (oldValue <= min) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue - 1;
    }
    spinner.find("input").val(newVal);
    spinner.find("input").trigger("change");
  });

});


const database = firebase.firestore();
loadProduct();
function loadProduct() {
  document.getElementById('cart').outerHTML = ` <div class="cart_responsive" id="cart"></div>`
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      database.collection('Cart').doc(user.uid).collection('Giohang').get()
      .then(snapshot => {
        snapshot.forEach(form => {
          itemsLoad = form.data()
          var html = document.getElementById("cart");
          html.insertAdjacentHTML("beforeend", ` 
              <div class="tr_item">
              <div class="td_item item_img">
                <img src="${itemsLoad.imageProductCart}" />
              </div>
              <div class="td_item item_name">
                <label class="main">${itemsLoad.nameCart_Product}</label>
                <label class="sub">Còn hàng</label>
              </div>
  
              <div class="td_item item_qty">
                <div class="quantity">
                <label class="main">Số lượng: ${itemsLoad.count}</label>
                </div>
              </div>
              <div class="td_item item_price">
                <label>Giá: ${itemsLoad.priceCart_Product} VND</label>
              </div>
              <div  onclick="removeCartProduct('${form.id}')" class="td_item item_remove">
              <span class="material-icons-outlined">close</span>
            </div>
            </div>
                      `)
                      console.log(form.id)
        })
      
        sumPrice();
      })
      .catch(error => { console.log(error) })
    } else {
        console.log('chưa đăng nhập')
    }
});
}

/*Xoá một sản phẩm  */
function removeCartProduct(id) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
      database.collection('Cart').doc(user.uid).collection('Giohang').doc(id).delete()

      .then(() => {
        // document.getElementById('error-box').style.display = 'none'
        // document.getElementById('success-box').style.display = 'block'
        console.log('xoá thành công')
        loadingOn();
        document.getElementById('error-box').style.display = 'none'
        document.getElementById('success-box').style.display = 'block'
      })
      .catch(() => { console.log('xoá thất bại') })
    }
  });
}


var totalPrice = 0;
/*Tính tổng giá tiền */
function sumPrice(){


  firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
      database.collection('Cart').doc(user.uid).collection('Giohang').get()
        .then(snapshot => {
          snapshot.forEach(form => {
  
            itemsLoad = form.data()
  
            totalPrice += itemsLoad.priceCart_Product
          })
          var html = document.getElementById("totalPrice");
          html.innerHTML= `Tổng Giá: <strong>${totalPrice}  VND </strong>`
        })
        .catch(error => { console.log(error); })
    }
  });
}

const payCart  = document.getElementById('payCart');
// var totalPrice = document.getElementById("totalPrice");

payCart.addEventListener('click', e => {
  e.preventDefault();
  var now = {
    day: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
}
  firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if(totalPrice ==  0){
          loadingOn();
          document.getElementById('error-box').style.display = 'block'
          document.getElementById('success-box').style.display = 'none'
        }
        else{
          database.collection('Cart').doc(user.uid).set({
            Time: now,
            TongTien: totalPrice
          }).then(() => {
            loadingOn();
            document.getElementById('error-box').style.display = 'none'
            document.getElementById('success-box').style.display = 'block'
              console.log('sửa thành công')
          })
              .catch(() => { console.log('Thêm thất bại') })
        }
      } else {
        loadingOn();
        document.getElementById('error-box').style.display = 'block'
        document.getElementById('success-box').style.display = 'none'
        
      }
  })
})
function success() {
  window.location.reload();
}
