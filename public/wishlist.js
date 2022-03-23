const baseURL = 'http://localhost:4400'

//Check for user_id in order to stay on page
function checkForLogin() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = '/public/log-in.html'
    }
}

checkForLogin()

let tripSection = document.querySelector('.display-trips')

//display items on screen
function display(items){
    tripSection.innerHTML = ''
    for(let i = 0; i < items.length; i++){
        // let openSymbol = &vArr;
        let {city, state, country, num_of_days, activities, est_cost, trip_id} = items[i]
        let row = document.createElement('div')   
        let secondRow = document.createElement('div')  
        row.className = 'displayRows'
        secondRow.className = 'hide'
        
        row.innerHTML = `
         <button onclick="">&vArr;</button> 
        <h3 id="city-display">${city}</h3>
        <button>Delete</button>
        <button onclick="markAsComplete(event)" id="${trip_id}">Mark as complete</button>
        `
        
        secondRow.innerHTML = `
        <h5>State: ${state}</h5>
        <h5>Country: ${country}</h5>
        <h5>Trip length: ${num_of_days}</h5>
        <h5>Plan: ${activities}</h5>
        <h5>my estimated cost: ${est_cost}</h5> `

        secondRow.style.display = 'none'

        tripSection.appendChild(row)
        tripSection.appendChild(secondRow)
    } 


}

//Get trip info
function wishlist() {
    let user = localStorage.getItem('userId')
    
    axios.get(`${baseURL}/trips/${user}`)
    .then(res => {
        display(res.data)
    })
    
}

wishlist();

let completeBtns = document.getElementsByClassName('complete-btn')

function markAsComplete (event) {
    let user = localStorage.getItem('userId')
    let tripId = event.target.id

    let body = {
        user,
        tripId
    }
    

    axios.put(`${baseURL}/updateTrips`, body)
        .then(res => {
            alert(res.data)
            wishlist()
        })

}

for(let i = 0; i < completeBtns.length; i++){
    completeBtns[i].addEventListener('click', markAsComplete)
}