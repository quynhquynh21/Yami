const database = firebase.firestore();
var uid = 0;
loadProduct();

function loadProduct() {
    i=0;
    database.collection('Cart').get()
        .then(snapshot => {
            snapshot.forEach(form => {
                //     loadingOnstorageRef.ref('Drink' + imageName).getDownloadURL().then(imgURL =>{})
                itemsLoad = form.data()
                i++
                var html = document.getElementById("bill");
                html.insertAdjacentHTML("beforeend", ` 
                <tr>
                <td>${i}</td>
                <td> ${form.id}</td>
                <input name="ordercode" type="hidden" value=" ">
                <td >Giờ: ${itemsLoad.Time.time} , Ngày: ${itemsLoad.Time.day}</td>
                <td style="padding-left:35px"> <a href="billdetail.html?uid=${form.id}"><i class="material-icons">remove_red_eye</i></a></td>
                <input name="email" type="hidden" value="" />
                
                <td>
                    <a onclick="removebill('${form.id}')" style="width: 100px; color: white" class="btn btn-danger" >
                        Xoá đơn</a>
                </td>
            </tr>

                        `)


            })
        })
        .catch(error => { console.log(error) })
}
function removebill(id) {

    database.collection('Cart').doc(id).delete()
        .then(() => {
            // document.getElementById('error-box').style.display = 'none'
            // document.getElementById('success-box').style.display = 'block'
            console.log('xoá thành công')
            loadingOn();
            loadProduct();
            
        })
        .catch(() => { console.log('xoá thất bại') })
}


function success() {
    window.location.reload();
}