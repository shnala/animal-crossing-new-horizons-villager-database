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
var villagerSavedGlobal = []
//These querySelector's will need to be updated if more buttons/input fields are added
//to the HTML page.
var searchBar = document.querySelector('input')
var searchButton = document.querySelector('.success')


//Loads the five most recently saved villagers to quicklist.
//TODO: In order for this to render saved villagers to quicklist on load, it needs access
//to [data]. This will require a foreach loop
function onLoad() {
    var history = JSON.parse(localStorage.getItem("quicklist"))
    // console.log(history);

    var recentHistory = history.reverse();
    // console.log(recentHistory);

    recentHistory.length = 5;
    console.log(recentHistory);

    villagerSavedGlobal.push(recentHistory);
    console.log(villagerSavedGlobal);

            // //____________paste divider______________
            // //TODO: Remove this block when static quicklist ID has been implemented on HTML.
            // var quickListContainer = document.querySelector('#qlcard')
            // var quicklistEl = document.createElement('ul')
            // quickListContainer.appendChild(quicklistEl)
            // //___________paste divider_______________

    
    for (let i = 0; i < recentHistory.length; i++) {

            var loadId = recentHistory[i].id
            var loadString = villagerApiUrl + loadId
            console.log(loadString);

            fetch(loadString)
            .then(function (response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data)
            
            //______________________paste divider_____________________

            var quickListContainer = document.querySelector('#quicklist')
            var qlItem = document.createElement('li');
            qlItem.classList.add("list-item");
            qlItem.textContent = data.name['name-USen']
            quickListContainer.appendChild(qlItem)

            var qlItemIcon = document.createElement('span')
            //TODO: Set dimensions of icon to not be oversized.
            qlItemIcon.innerHTML = "<img src='" + data.icon_uri + "' width='48' height='48' alt='Icon of villager.'>";
            qlItem.appendChild(qlItemIcon)

            //TODO: Click must call villager to be rendered on main card.
            qlItem.addEventListener('click', testClick)
            console.log(recentHistory)
            
            //_______________________paste divider____________________

            })
    }
    
}

function handleSearchSubmit(event) {
    event.preventDefault();
    var query = searchBar.value
    //queryString will not work until villagerId can be grabbed from API using input from user's search.
    
    fetch(villagerApiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)        
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
        var mainCardContainer = document.querySelector('#main-card')
        mainCardContainer.style.display = "block";        
        var mainCard = document.querySelector('#maincard')

        mainCard.innerHTML = ''
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 811fb278aa48cd004568c71e568b2b8c94e9f60a
>>>>>>> dev

=======
        amiiboImage();
        
>>>>>>> e9b38bc8b86a7269314fd4f8f44bd80371ea1549
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

        var villagerMottoEl = document.createElement('div')
        var villagerMotto = document.createElement('span')
        var villagerMottoTag = document.createElement('h5')
        villagerMotto.textContent = data.saying
        villagerMottoTag.textContent = 'Motto: '
        villagerMottoEl.appendChild(villagerMottoTag)
        villagerMottoTag.appendChild(villagerMotto)
        mainCard.appendChild(villagerMottoEl)
        
        var villagerPhraseEl = document.createElement('div')
        var villagerPhrase = document.createElement('span')
        var villagerPhraseTag = document.createElement('h5')
        villagerPhrase.textContent = data['catch-phrase'];
        villagerPhraseTag.textContent = 'Catch-Phrase: '
        villagerPhraseTag.appendChild(villagerPhrase)
        villagerPhraseEl.appendChild(villagerPhraseTag)
        mainCard.appendChild(villagerPhraseEl)
        
        var villagerHobbyEl = document.createElement('div')
        var villagerHobby = document.createElement('span')
        var villagerHobbyTag = document.createElement('h5')
        villagerHobby.textContent = data.hobby
        villagerHobbyTag.textContent = 'Hobby: '
        villagerHobbyTag.appendChild(villagerHobby)
        villagerHobbyEl.appendChild(villagerHobbyTag)
        mainCard.appendChild(villagerHobbyEl)

        var saveButton = document.createElement('button')
        saveButton.textContent = 'Save'
        mainCard.appendChild(saveButton)
        saveButton.addEventListener('click', saveToQuickList)

                
//TODO: Entries on the quicklist should be clickable. When clicked, that villager's id is 
//appended once again to the queryString variable, which gets fed back into the queryRender
//function, which will then render that villager's bio on the main card.
//TODO: Currently, saveToQuickList will overwrite items generated from local storage. This might be 
//fixed by having the function call the onLoad function again after the array has been updated.
//Have saveToQuickList update the array instead of generate new elements, and then call onLoad.

        function saveToQuickList() {

                var quickListContainer = document.querySelector('#quicklist')
                // var quicklistEl = document.createElement('ul')
                // quickListContainer.appendChild(quicklistEl)

                var qlItem = document.createElement('li')
                qlItem.classList.add("list-item");
                qlItem.textContent = data.name['name-USen']
                quickListContainer.appendChild(qlItem)

                var qlItemIcon = document.createElement('span')
                //TODO: Set dimensions of icon to not be oversized.
                qlItemIcon.innerHTML = "<img src='" + data.icon_uri + "' alt='Icon of villager.'>";
                qlItem.appendChild(qlItemIcon)
        
                var villagerKey = {
                    name: data.name['name-USen'],
                    id: data.id
                }

                villagerSaved = JSON.parse(localStorage.getItem("quicklist")) || []
                villagerSaved.push(villagerKey);
                localStorage.setItem("quicklist", JSON.stringify(villagerSaved));

                //TODO: Click must call villager to be rendered on main card.
                qlItem.addEventListener('click', testClick)
                console.log(qlItem)
<<<<<<< HEAD
=======
                console.log(villagerSaved);
                //reverse array again before feeding back into onLoad; villagerSaved.reverse()
                //TODO: YOU WERE HERE.
>>>>>>> dev
        }
        
    })
}

<<<<<<< HEAD

=======
<<<<<<< HEAD
<<<<<<< HEAD
function amiiboImage (){
=======
// function for amiibo
function amiiboImage () {
>>>>>>> e9b38bc8b86a7269314fd4f8f44bd80371ea1549
    var amiiboQuery = searchBar.value
    var amiiboApiUrl = "https://www.amiiboapi.com/api/amiibo/?name=" + amiiboQuery;
        console.log(amiiboApiUrl)
    fetch (amiiboApiUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        console.log(data)
<<<<<<< HEAD
        var inputImg = data.amiibo[0].image;
        var amiiboSection = document.querySelector('#maincard');
        console.log(data.amiibo[0].image)
        // img.src = data.amiibo[0].image;
        amiiboSection.appendChild(inputImg)
    })
}
=======
=======
        var amiiboSection = document.querySelector('#maincard');
        var amiiboImg = document.createElement('span');
        amiiboImg.innerHTML = "<img src='" + data.amiibo[0].image + "' alt='amiibo-card for searched character'>";
        // console.log(data.amiibo[0].image)
        amiiboSection.appendChild(amiiboImg)
    })
}

>>>>>>> e9b38bc8b86a7269314fd4f8f44bd80371ea1549
>>>>>>> dev
function testClick() {
    console.log('Working')
}

//TODO: saveButton is not currently defined. Once mainCard is made in HTML and a button has been
//inserted, grab it in JS and assign it the var saveButton.
// saveButton.addEventListener('click', saveToQuickList)
searchBar.addEventListener('submit', handleSearchSubmit)
searchButton.addEventListener('click', handleSearchSubmit)

<<<<<<< HEAD
console.log(villagerSaved)
=======
// console.log(villagerSavedGlobal)

>>>>>>> dev
onLoad();

//________________________Legacy Code/Notes________________________________

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

