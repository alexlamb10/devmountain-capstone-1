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
    //Get username/password to send to back end
    loginUsername = loginUsername.value
    body = {
        password: loginPassword.value
    }

    axios.post(`${baseURL}/users/${loginUsername}`, body)
        .then(res => {
            //alert user log in was successful then set id for 
            alert(res.data.message)

            localStorage.setItem('userId', res.data.userId)

            window.location.href = "/public/home.html"
            
        })
        .catch(err => {
            // const message = err.message || '';
            console.log(err.error.message);
            // alert(err)
        })
        loginUsername.value = ''
        loginPassword.value = ''
}

submitNewProfile.addEventListener('click', createUser)
loginBtn.addEventListener('click', logIn)