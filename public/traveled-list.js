const baseURL = 'http://localhost:4400'

//Check for user_id in order to stay on page
function checkForLogin() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = '/public/log-in.html'
    }
}

checkForLogin()

let completedTripSection = document.querySelector('.display-completed-trips')

//display items on screen
function display(items){
    count=1
    completedTripSection.innerHTML = ''
    for(let i = 0; i < items.length; i++){
        let {city, state, country, num_of_days, activities, trip_id} = items[i]
        let completedRow = document.createElement('div')   
        let completedSecondRow = document.createElement('div')  

        completedRow.className = 'displayRows'
        completedSecondRow.className = 'hide'
        completedSecondRow.id = `hide${count}`

        completedRow.innerHTML = `
        <button onclick="showMore(event)" id="${count}">&vArr;</button>
        <h3 id="city-display">${city}</h3>
        <button onclick="deleteTrip(event)" id="${trip_id}">Delete</button>
        `
        completedSecondRow.innerHTML = `
        <h5>State: ${state}</h5>
        <h5>Country: ${country}</h5>
        <h5>Trip length: ${num_of_days} days</h5>
        <h5 id="plan">Plan: ${activities}</h5>
        `

        completedSecondRow.style.display = 'none'

        completedTripSection.appendChild(completedRow)
        completedTripSection.appendChild(completedSecondRow)
        count++
    } 


}

//Get trip info
function traveledList() {
    let user = localStorage.getItem('userId')
    
    axios.get(`${baseURL}/completedTrips/${user}`)
    .then(res => {
        
        if(res.data.length >= 1){
            display(res.data)
        }else{
            let noTrip = document.createElement('h3')

            noTrip.textContent = `No trips to display, Let's go travel!`

            completedTripSection.appendChild(noTrip)
        }
    })
    
}

traveledList();

function showMore(event) {
    let button = event.target.id

    let showDiv = document.getElementById(`hide${button}`)

    if(showDiv.style.display === 'none'){
        showDiv.style.display = 'flex'
    }else{
        showDiv.style.display = 'none'
    }

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
            traveledList()
        })

}

// Filter trips
let option = document.getElementById('filter')
let submitOption = document.getElementById('submit-filter')

function filter() {
    let user = localStorage.getItem('userId')
    let completed = true
    

    axios.get(`${baseURL}/filteredTrips/?user=${user}&complete=${completed}&filter=${option.value}`)
    .then(res => {
        display(res.data)
        option.value = 'Select'
    })
}

submitOption.addEventListener('click',filter)