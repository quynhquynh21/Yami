const database = firebase.firestore();

const name = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const message = document.getElementById('message')
const submit = document.getElementById('submit1')

submit.addEventListener('click',e=>{
    e.preventDefault();

    database.collection('Contact').add({
        name:name.value,
        email:email.value,
        phone:parseInt(phone.value) ,
        message:message.value
    }).then(() => {
        loadingOn(); console.log('Thêm thành công')
      })
      .catch(() => { console.log('Thêm thất bại') })
})
function success() {
    window.location.reload();
  }     