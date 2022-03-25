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
    count=1
    tripSection.innerHTML = ''
    for(let i = 0; i < items.length; i++){
        let {city, state, country, num_of_days, activities, est_cost, trip_id} = items[i]
        let row = document.createElement('div')   
        let secondRow = document.createElement('div')  
        row.className = 'displayRows'
        secondRow.className = 'hide'
        secondRow.id = `hide${count}`
        
        row.innerHTML = `
         <button onclick="showMore(event)" id="${count}" >&vArr;</button> 
        <h3 id="city-display">${city}</h3>
        <button onclick="deleteTrip(event)" id="${trip_id}">Delete</button>
        <button onclick="markAsComplete(event)" id="${trip_id}">Mark as complete</button>
        `
        
        secondRow.innerHTML = `
        <h5>State: ${state}</h5>
        <h5>Country: ${country}</h5>
        <h5>Trip length: ${num_of_days} days</h5>
        <h5 id="plan">Plan: ${activities}</h5>
        <h5>my estimated cost: ${est_cost}</h5> `


        tripSection.appendChild(row)
        tripSection.appendChild(secondRow)
        count++
    } 


}

//Get trip info
function wishlist() {
    let user = localStorage.getItem('userId')
    tripSection.innerHTML = ''
    
    axios.get(`${baseURL}/trips/${user}`)
    .then(res => {
        if(res.data.length >= 1){
            display(res.data)
        }else{
            let noTrip = document.createElement('h3')

            noTrip.textContent = `No trips to display, Let's get planning!`
            noTrip.className = 'no-trip'

            tripSection.appendChild(noTrip)
        }
        
    })
    
}

wishlist();

// Expand to show more information

function markAsComplete (event) {
    //Get userId and tripId
    let user = localStorage.getItem('userId')
    let tripId = event.target.id

    let body = {
        user,
        tripId
    }
    
    //send to backend to update
    axios.put(`${baseURL}/updateTrips`, body)
        .then(res => {
            alert(res.data)
            wishlist()
        })

}



function showMore(event) {
    let button = event.target.id

    let showDiv = document.getElementById(`hide${button}`)

    showDiv.classList.toggle('show')
    showDiv.classList.toggle('hide')

}

//Delete a trip from screen/database

function deleteTrip(event) {
    //get userId and tripId
    let userId = localStorage.getItem('userId')
    let tripId = event.target.id

    let body = {
        
    }

    axios.delete(`${baseURL}/deleteTrip`, {data: {userId, tripId}})
        .then(res => {
            alert(res.data)
            wishlist()
        })

}
// filter the list of trips

let option = document.getElementById('filter')
let submitOption = document.getElementById('submit-filter')

function filter() {
    let user = localStorage.getItem('userId')
    let completed = false
    

    axios.get(`${baseURL}/filteredTrips/?user=${user}&complete=${completed}&filter=${option.value}`)
    .then(res => {
        display(res.data)
        option.value= 'Select'
    })
}

submitOption.addEventListener('click',filter)