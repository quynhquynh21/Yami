loadingOff();

//  setTimeout(()=>{loadingOn()},3000)
// loadingOff();

function loadingOn() {
    document.getElementById('loading').style.display = 'block';
}

function loadingOff() {
    document.getElementById('loading').style.display = 'none';
}
