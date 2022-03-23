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
        let {city, state, country, num_of_days, activities, est_cost} = items[i]
        let row = document.createElement('tr')     

        
        row.innerHTML = `
        <td> <button class="showMore">&vArr;</button> </td> 
        <td>${city}</td>
        <td><button>Delete</button></td>
        <td><button id="completeBtn">Mark as complete</button></td>`
        
        tripSection.appendChild(row)
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

wishlist()

