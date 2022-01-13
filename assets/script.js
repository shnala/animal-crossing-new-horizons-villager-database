//PSEUDOCODE
//TODO: Can only search for villagers using a number id. Cannot use villager name 
//in search query. Need way around this.
//Maybe autofill can solve? Have autofill array made, then clicking a villager from the
//autofill dropdown will navigate to their respective id.

//Logic order for search query:
//User input parses thru all data[i].name.name-US-en values until there's a match
//The villagerId of the match is assigned to variable 'villagerId'
//That villagerId is inserted into var 'queryString' to complete URL for fetch function

var villagerId = ''
var villagerApiUrl = 'https://acnhapi.com/v1a/villagers/'
//These querySelector's will need to be updated if more buttons/input fields are added
//to the HTML page.
var searchBar = document.querySelector('input')
var searchButton = document.querySelector('button')

// if (searchInput === data[i].)

function handleSearchSubmit(event) {
    event.preventDefault();
    var query = searchBar.value
    console.log(query)
    //queryString will not work until villagerId can be grabbed from API using input from user's search.

    fetch(villagerApiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)        
        //Editing Main Card header
        // mainName.textContent = data.villagerId.name.________

        var apiVillagerInfo = data.filter(villager => villager.name['name-USen'] === query)
        var villagerId = apiVillagerInfo[0].id;
        var queryString = villagerApiUrl + villagerId
        console.log(queryString);
        console.log(villagerId);
        // console.log(apiVillagerInfo[0]);
        queryRender(queryString);
    })
   
}

function queryRender(queryString) {
    fetch(queryString)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        //Functioning. Render elements to main card here.
        console.log(data);

        //This var is a placeholder until a proper container with an id is made on the html.
        //Will need to nuke container with innerHtml once it is created so that new queries
        //do not compound in mainCard.
        var body = document.querySelector('body')

        var mainCard = document.createElement('div') 
        body.appendChild(mainCard)

        var villagerName = document.createElement('h3')
        villagerName.textContent = data.name['name-USen']
        mainCard.appendChild(villagerName)

        var villagerSpecies = document.createElement('h5')
        villagerSpecies.textContent = data.species
        mainCard.appendChild(villagerSpecies)

        var villagerGender = document.createElement('h5')
        villagerGender.textContent = data.gender
        mainCard.appendChild(villagerGender)

        var villagerBday = document.createElement('h5')
        villagerBday.textContent = 'Born on ' + data['birthday-string'];
        mainCard.appendChild(villagerBday)

        var villagerType = document.createElement('h5')
        villagerType.textContent = data.personality
        mainCard.appendChild(villagerType)

        var villagerImg = document.createElement('span')
        villagerImg.innerHTML = "<img src='" + data.image_uri + "' alt='Image of villager.'>";
        mainCard.appendChild(villagerImg)


    })
}

//If matches, should kick out that villager's object and properties
//This function should search for a name in the API that matches the user's input and then append
    
    //the matching villager's villagerId to the API url so that their information can be rendered.
//     function searchObj (obj, query) {
//         for (var key in obj) {
//             var value = obj[key];

//             if (typeof value === 'object') {
//                 searchObj(value, query);
//             }

//             if (value === query) {
//                 console.log('The property ' + key + ' matches your query of ' + value);
//                 console.log(value);
//                 console.log(typeof value);
//                 //Insert API url manipulation here


//             }
//         }
//     }
// }

searchBar.addEventListener('submit', handleSearchSubmit)
searchButton.addEventListener('click', handleSearchSubmit)

//---Core function---:
//WHEN I search for any desired villager using the search bar,
//THEN an autofill dropdown appears underneath, showing villagers that match the
//search inquiry.
//WHEN I click on a villager in the autofill,
//THEN that villager's bio renders onto the page within the main character card.
//WHEN the main character card renders to the page,
//THEN that card will display the villager's name, species, birthday, catch-phrase,
//quote, personality type, and hobby.
//WHEN I click the save button on the main character card,
//THEN that villager is added to the quicklist on the page.
//WHEN I click a villager on the quicklist,
//THEN that villager's information is rendered back onto the main character card.

//---Extra implementations for flare---:
//--Villager of the day card, featuring a random villager and their unique quote,
//refreshing at midnight each day.

//--Villager birthday card, featuring the villager whose birthday falls on the current
//calendar date. If there is no birthday for the current day, then the card will simply
//read "There are no villager birthdays today." Alternatively, we could build a list
//of projected birthdays for the week or month.

//--Villager quick-list! Create a simple To-Do-esque form that takes input from the user
//(click 'save to list' button on main character card)
//and creates a small, unobtrusive list on the site that persists on refresh and even
//loads that villager's information when it is clicked.


//---Advanced features (if we have time)---
//--Stalk market price planner; record prices from the main game and predict trends to
//maximize profit! This would require implementation of a dynamic graph feature which we 
//haven't touched on yet but, it might be easy with modern API's like Materialize.

