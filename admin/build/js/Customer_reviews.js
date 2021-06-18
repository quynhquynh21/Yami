const database = firebase.firestore();
const contact = document.getElementById('contact');

loadCustomerPreview();
function loadCustomerPreview() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user != null) {
            i = 0;
            database.collection('Contact').get()
                .then(snapshot => {
                    snapshot.forEach(form => {
                        itemsLoad = form.data()
                        i++;
                        var html = document.getElementById("contact");
                        html.insertAdjacentHTML("beforeend", ` 
        <tr onclick="selectAcc('${form.id}')">
        <td>
        <div id="name">
        ${i}
        </div>
        </td>
        <td>
        <div id="email">
        ${itemsLoad.name}
        </div>
        </td>
        <td class="project_progress">
        <div id="uid">
        ${itemsLoad.phone}
        </div>
        </td>
        <td>
        <div id="emailVerified">
        ${itemsLoad.email}
        </div>
        </td>
        <td>
        <div id="messagel" style="height: 70px;  overflow:auto;">
        ${itemsLoad.message}
        </div>
    </td>
    <td style="padding-left:35px"> <i onclick="remove_CustomerReview('${form.id}')" style="cursor:pointer" class="material-icons">close</i></td>
            </span></td>
        </tr>
        `)
                    })
                })
                .catch(error => { console.log(error) })

        }
    });
}

function remove_CustomerReview(id) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user != null) {
            database.collection('Contact').doc(id).delete()

                .then(() => {
                    // document.getElementById('error-box').style.display = 'none'
                    // document.getElementById('success-box').style.display = 'block'
                    console.log('xoá thành công')
                    loadingOn();
                })
                .catch(() => { console.log('xoá thất bại') })
        }
    });
}
function success() {
    window.location.reload();
}
