function openNav() {
    
    document.getElementById('sideNavDiv').style.left = '0'
}

function closeNav() {
    document.getElementById('sideNavDiv').style.left = '-100%'
}

// Log out
let logOut = document.querySelector('.log-out')

function logUserOut () {
    console.log('button works');
    localStorage.removeItem('userId')
    window.location.href = '/public/log-in.html'
}

logOut.addEventListener('click', logUserOut)