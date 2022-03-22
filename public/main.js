function openNav() {
    document.getElementById('sideNavDiv').style.width = '20%'
}

function closeNav() {
    document.getElementById('sideNavDiv').style.width = '0'
}

//Get elements

let nameInput = document.getElementById('name')
let usernameInput = document.getElementById('username')
let newPassword = document.getElementById('password')
let confirmPassword = document.getElementById('confirm-password')
let submitNewProfile = document.getElementById('submit-profile')

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



submitNewProfile.addEventListener('click', createUser)