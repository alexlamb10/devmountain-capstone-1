function openNav() {
    document.getElementById('sideNavDiv').style.width = '20%'
}

function closeNav() {
    document.getElementById('sideNavDiv').style.width = '0'
}

//Get elements for log in page

let nameInput = document.getElementById('name')
let usernameInput = document.getElementById('username')
let newPassword = document.getElementById('password')
let confirmPassword = document.getElementById('confirm-password')
let submitNewProfile = document.getElementById('submit-profile')
let loginUsername = document.getElementById('log-in-username')
let loginPassword = document.getElementById('log-in-password')
let loginBtn = document.getElementById('log-in-btn')

const baseURL = 'http://localhost:4400'
// create user log in

function createUser (){
    

    let body = {
        newUser: nameInput.value,
        username: usernameInput.value,
        password: newPassword.value
    }
    //Check password to see if they match before sending user info to back end
    if(newPassword.value === confirmPassword.value){
        axios.post(`${baseURL}/users`, body)
            .then(res => {
                alert(res.data)
            })
    } else {
        alert('Passwords must match')
    }

    nameInput.value = ''
    usernameInput.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
}

function logIn () {
    console.log('button works')
    loginUsername = loginUsername.value
    body = {
        password: loginPassword.value
    }

    axios.post(`${baseURL}/users/${loginUsername}`, body)
        .then(res => {
            alert(res.data)
        })
        .catch(err => {
            alert('Incorrect password, please try again.')
        })
    loginUsername.value = ''
    loginPassword.value = ''
}

submitNewProfile.addEventListener('click', createUser)
loginBtn.addEventListener('click', logIn)