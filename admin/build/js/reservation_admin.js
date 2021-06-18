const database = firebase.firestore();
const UserCollection= database.collection('reservation');
const update = document.getElementById('update');
const remove = document.getElementById('remove');
var uid=0;
reservation() 
function reservation() {
    document.getElementById('reservation').outerHTML = ` <tbody id="reservation">
              <tr>
              
              </tr>
            </tbody>`

    firebase.auth().onAuthStateChanged(function (user) {
        if (user != null) {
            UserCollection.get()
                .then(snapshot => {
                    snapshot.forEach(form => {
                        itemsLoad = form.data()
                        var html = document.getElementById("reservation");
                        html.insertAdjacentHTML("beforeend", ` 
                        <tr onclick="selectAcc('${form.id}')">
                        <td >
                        <div id="name">
                        ${itemsLoad.name}
                        </div>
                      </td>
                      <td>
                        <div id="phone">
                        ${itemsLoad.phone}
                        </div>
                      </td>
                      <td>
                        <div id="email">
                        ${itemsLoad.email}
                        </div>
                      </td>
                      <td>
                        <div id="day">
                        ${itemsLoad.day}
                        </div>
                      </td>
                      <td>
                          <div id="time">
                          ${itemsLoad.time}
                          </div>
                        </td>
                        <td>
                          <div id="count_People">
                          ${itemsLoad.person}
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
function selectAcc(id) {
  const userName = document.getElementById('userName');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const day = document.getElementById('day');
  const time = document.getElementById('time');
  const count_People = document.getElementById('count_People');
  UserCollection.doc(id).get()
    .then(user => {
      if (user.exists) {
        userName.value = user.data().name;
        phone.value = user.data().phone;
        email.value = user.data().email;
        day.value = user.data().day;
        time.value = user.data().time;
        count_People.value = user.data().person;
        uid = id;
      }

      else
        console.log('Người dùng không tồn tại')
    })
    .catch(error => {
      console.log('error');
    })
}

update.addEventListener('click', e => {
  e.preventDefault();// mặc định
  const name = document.getElementById('userName');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const day = document.getElementById('day');
  const time = document.getElementById('time');
  const count_People = document.getElementById('count_People');
  UserCollection.doc(uid).update({
    name: name.value,
    phone: phone.value,
    email: email.value,
    day: day.value,
    time: time.value,
    person: count_People.value

  })
    .then(() => {
      loadingOn()
    
      console.log('Đổi thành công');
      
    })
    .catch(() => { console.error('Đổi thất bại') })
  console.log(uid)
});

remove.addEventListener('click', e => {//xoá một collection trên firebase
  e.preventDefault();// mặc định
  UserCollection.doc(uid).delete()
      .then(() => { console.log('xoá  thành công')
      reservation();
     })
      .catch(() => { console.log('xoá thất bại') })
});
function success(){
  window.location.reload();
}