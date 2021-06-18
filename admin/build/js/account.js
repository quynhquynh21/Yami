const update = document.getElementById('update');
const remove = document.getElementById('remove');
var uid = 0;

const database = firebase.firestore();
const UserCollection = database.collection('user');
account();
function account() {
  document.getElementById('acc').outerHTML = ` <tbody id="acc">
              <tr>
              
              </tr>
            </tbody>`
  firebase.auth().onAuthStateChanged(function (user) {
      UserCollection.get()
        .then(snapshot => {
          snapshot.forEach(form => {
            itemsLoad = form.data()
            var html = document.getElementById("acc");
            html.insertAdjacentHTML("beforeend", ` 
                <tr onclick="selectAcc('${form.id}')">
                  <td>
                  <div id="name">
                  ${itemsLoad.user_name}
                  </div>
                </td>
                <td>
                  <div id="email">
                  ${itemsLoad.email}
                  </div>
                </td>
                <td class="project_progress">
                  <div id="uid">
                  ${itemsLoad.password1}
                  </div>
                </td>
                <td>
                  <div id="emailVerified">
                  ${itemsLoad.role}
                  </div>
                </td>
                  </tr>
                    `)
            console.log(itemsLoad);
          })
        })
        .catch(error => { console.log(error) })
    
  })
}
function selectAcc(id) {
  const userName = document.getElementById('userName');
  const account = document.getElementById('account');
  const password = document.getElementById('password');
  UserCollection.doc(id).get()
    .then(user => {
      if (user.exists) {
        userName.value = user.data().user_name;
        account.value = user.data().email;
        password.value = user.data().password1;
        uid = id;
      }

      else
        console.log('Người dùng không tồn tại')
    })
    .catch(error => {
      console.log('error');
    })
}
function isLoaded() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      var name = user.displayName;
      var email = user.email;

      if (email == "quynhthptlc@gmail.com") {
        //  alert('Xin chào đại ca')
      }
      else {
        alert('Bạn không đủ quyền hạn')
        document.location = '../../../index.html'
      }
    } else {
      alert('Bạn không đủ quyền hạn')
      document.location = '../../../index.html'
    }
  });
}
update.addEventListener('click', e => {
  e.preventDefault();// mặc định
 
  const userName = document.getElementById('userName');
  const account1 = document.getElementById('account');
  const password = document.getElementById('password');
  const email = document.getElementById('email');
  database.collection('user').get()
        .then(snapshot => {
          snapshot.forEach(form => {
  const email = document.getElementById('email');
            if(account1.value != email.value){
              UserCollection.doc(uid).update({
                user_name: userName.value,
                email: account1.value,
                password1: password.value,
              })
                .then(() => {
                  loadingOn()
                  console.log('Đổi thành công');
                  // account();
                  
                })
                .catch(() => { console.error('Đổi thất bại') 
                })
            }
            else{
              alert('Đã tồn tại người dùng');
            }

          })
        })
        .catch(error => { console.log(error) })
 
  console.log(uid)
});

remove.addEventListener('click', e => {//xoá một collection trên firebase
  e.preventDefault();// mặc định
  UserCollection.doc(uid).delete()
      .then(() => { console.log('xoá  thành công')
      loadingOn();
     })
      .catch(() => { console.log('xoá thất bại') })
});

function success(){
  window.location.reload();
}