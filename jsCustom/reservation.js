const day = document.getElementById('input_date');
const time = document.getElementById('input_time');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const person = document.getElementById('person');
const submit = document.getElementById('submit');

const database = firebase.firestore();
const UserCollection = database.collection('reservation');

submit.addEventListener('click', e => {
    e.preventDefault();// mặc định
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            UserCollection.add({// id user tự động
                day: day.value,
                time: time.value,
                email: email.value,
                phone: parseInt(phone.value),
                name: name.value,
                person: parseInt(person.value),
            }).then(() => {
                alert('Thêm thành công');
                console.log('sửa thành công')
            })
                .catch(() => { console.log('Thêm thất bại') })
        } else {
            window.location='sign_in.html'
        }
    })
});
