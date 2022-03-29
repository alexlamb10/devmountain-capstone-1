const baseURL = ''
let fileInfo = {
    file: undefined,
    fileName: undefined,
    fileType: undefined,
    img: undefined,
}

//Check for user_id in order to stay on page
function checkForLogin() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = './index.html'
    }
}

checkForLogin()

let completedTripSection = document.querySelector('.display-completed-trips')

//display items on screen
function display(items){
    count=1
    completedTripSection.innerHTML = ''
    for(let i = 0; i < items.length; i++){
        let {city, state, country, num_of_days, activities, trip_id, pic_url} = items[i]
        let completedRow = document.createElement('div')   
        let completedSecondRow = document.createElement('div')  

        completedRow.className = 'displayRows'
        completedSecondRow.className = 'hide'
        completedSecondRow.id = `hide${count}`

        if(pic_url){
            completedRow.innerHTML = `
            <span id="arrow-traveled"><button onclick="showMore(event)" id="${count}">&vArr;</button></span>
            <span id="city-name-traveled"><h3 id="city-display">${city}</h3></span>
            <span id="delete-trip-traveled"><button onclick="deleteTrip(event)" id="${trip_id}">Delete</button></span>
            `
            completedSecondRow.innerHTML = `
            <h5 class="details-post-travel">State: ${state}</h5>
            <h5 class="details-post-travel">Country: ${country}</h5>
            <h5 class="details-post-travel">Trip length: ${num_of_days} days</h5>
            <h5 class="plan-post-travel">Plan: ${activities}</h5>
            <span class="display-pic"><img class="single-pic" src="${pic_url}"></span>
            `
        } else{
            completedRow.innerHTML = `
            <span id="arrow-traveled"><button onclick="showMore(event)" id="${count}">&vArr;</button></span>
            <span id="city-name-traveled"><h3 id="city-display">${city}</h3></span>
            <span id="add-pics"><label for="file-${trip_id}">Add Picture</label>
            <input onChange="handlePhoto(event)" type="file" class="inputFile" id="file-${trip_id}">
            <button onclick="addPics(${trip_id})" class="save-photo">Save</button></span>
            <span id="delete-trip-traveled"><button onclick="deleteTrip(event)" id="${trip_id}">Delete</button></span>
            `
            completedSecondRow.innerHTML = `
            <h5 class="details-post-travel">State: ${state}</h5>
            <h5 class="details-post-travel">Country: ${country}</h5>
            <h5 class="details-post-travel">Length: ${num_of_days} days</h5>
            <h5 class="plan-post-travel">Plan: ${activities}</h5>
            <h5 class="display-pic">No Picture!</h5>
            `
        }

        completedTripSection.appendChild(completedRow)
        completedTripSection.appendChild(completedSecondRow)
        count++
    } 


}

//Get trip info
function traveledList() {
    let user = localStorage.getItem('userId')
    completedTripSection.innerHTML = ''
    
    axios.get(`${baseURL}/completedTrips/${user}`)
    .then(res => {
        
        if(res.data.length >= 1){
            display(res.data)
        }else{
            let noTrip = document.createElement('h3')

            noTrip.textContent = `No trips to display, Let's go travel!`
            noTrip.className = 'no-trip'

            completedTripSection.appendChild(noTrip)
        }
    })
    
}

traveledList();

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

async function addPics(tripId) {
    console.log({tripId, fileInfo})
    const data = await axios.post(`${baseURL}/api/s3`, fileInfo)
    console.log({data})
    if(data.status !== 200){
        return 
    }else {
        axios.put(`${baseURL}/tripPic`, {tripId, pictureURL: data.data.Location})
        .then(res => {
            traveledList()
        })
    }
}


function handlePhoto(event) {
    console.log({event})

    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onload = photo => {
        fileInfo = {
            file: photo.target.result,
            fileName: file.name,
            fileType: file.type,
            img: ''
        }

    }
    reader.readAsDataURL(file)

}
