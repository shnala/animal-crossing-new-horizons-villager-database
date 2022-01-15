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
//TODO: When villagers from quicklist are loaded, their amiibo cards aren't loaded
//because the amiibo function relies on the query provided by the user.
function onLoad() {
    var history = JSON.parse(localStorage.getItem("quicklist"))
    // console.log(history);

    var recentHistory = history.reverse();
    // console.log(recentHistory);

    recentHistory.length = 5;
    console.log(recentHistory);

    villagerSavedGlobal.push(recentHistory);
    console.log(villagerSavedGlobal);
    
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

            var quickListContainer = document.querySelector('#quicklist')
            var qlItem = document.createElement('li');
            var qlButton = document.createElement('button');
            // qlButton.setAttribute('value', data.name['name-USen'])

            qlItem.classList.add("list-item");
            // qlItem.textContent = data.name['name-USen']
            //This was my attempt to call the function within HTML and apply the loadstring variable so that
            //each list item was rendered with an appropriate API call that would render their info. 
            //However, it doesn't work because when you call a function in HTML, you cannot 
            //have an argument in the parentheses. Putting this note here for later reference.
            //TODO: Onclick, call the handleSearchSubmit function and feed the villager name
            //as an argument.
            qlItem.innerHTML = '<button class = "ql-button" value = "' + data.name['name-USen'] + '">' + data.name['name-USen'] + '</button>'
            quickListContainer.appendChild(qlItem)
            // qlButton.appendChild(qlItem)

            var qlItemIcon = document.createElement('span')
            qlItemIcon.innerHTML = "<img src='" + data.icon_uri + "' width='48' height='48' alt='Icon of villager.'>";
            qlItem.appendChild(qlItemIcon)
            

            //TODO: Everything commented out below is from my attempts to get the quicklist to work
            //the way it should. Remove or fix later.
            // var quickButton = document.querySelector('.ql-button')
            // var getName = quickButton.getAttribute('value')
            // console.log(getName)

            // quickButton.addEventListener('click', testClick)
            //     var quickButton = document.querySelector('.ql-button')
            //     var getName = quickButton.getAttribute('value')
            //     console.log(getName)
            // })
            
            // qlItem.addEventListener('click', queryRender(loadString))

            })
    }
    
}

//TODO: More quicklist stuff to remove.
// quickButton.addEventListener('click', function() {
//     var quickButton = document.querySelector('.ql-button')
//     var getName = quickButton.getAttribute('value')
//     console.log(getName)
// })



function handleSearchSubmit(event) {
    event.preventDefault();
    var query = searchBar.value
    
    fetch(villagerApiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        // console.log(data)        
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
        var mainCardTop = document.querySelector('#main-top')
        var mainCardRight = document.querySelector('#main-right')
        var mainCardLeft = document.querySelector('#main-left')

        mainCardTop.innerHTML = ''
        mainCardRight.innerHTML = ''
        mainCardLeft.innerHTML = ''


        amiiboImage();
        

        var villagerName = document.createElement('h3')
        villagerName.textContent = data.name['name-USen']
        mainCardTop.appendChild(villagerName)

        var villagerSpecies = document.createElement('h5')
        villagerSpecies.textContent = data.species
        mainCardRight.appendChild(villagerSpecies)

        var villagerGender = document.createElement('h5')
        villagerGender.textContent = data.gender
        mainCardRight.appendChild(villagerGender)

        var villagerBday = document.createElement('h5')
        villagerBday.textContent = 'Born on ' + data['birthday-string'];
        mainCardRight.appendChild(villagerBday)

        var villagerType = document.createElement('h5')
        villagerType.textContent = data.personality
        mainCardRight.appendChild(villagerType)

        var villagerImg = document.createElement('span')
        villagerImg.innerHTML = "<img src='" + data.image_uri + "' alt='Image of villager.'>";
        mainCardLeft.appendChild(villagerImg)

        var villagerMottoEl = document.createElement('div')
        var villagerMotto = document.createElement('span')
        var villagerMottoTag = document.createElement('h5')
        villagerMotto.textContent = data.saying
        villagerMottoTag.textContent = 'Motto: '
        villagerMottoEl.appendChild(villagerMottoTag)
        villagerMottoTag.appendChild(villagerMotto)
        mainCardTop.appendChild(villagerMottoEl)
        
        var villagerPhraseEl = document.createElement('div')
        var villagerPhrase = document.createElement('span')
        var villagerPhraseTag = document.createElement('h5')
        villagerPhrase.textContent = data['catch-phrase'];
        villagerPhraseTag.textContent = 'Catch-Phrase: '
        villagerPhraseTag.appendChild(villagerPhrase)
        villagerPhraseEl.appendChild(villagerPhraseTag)
        mainCardRight.appendChild(villagerPhraseEl)
        
        var villagerHobbyEl = document.createElement('div')
        var villagerHobby = document.createElement('span')
        var villagerHobbyTag = document.createElement('h5')
        villagerHobby.textContent = data.hobby
        villagerHobbyTag.textContent = 'Hobby: '
        villagerHobbyTag.appendChild(villagerHobby)
        villagerHobbyEl.appendChild(villagerHobbyTag)
        mainCardRight.appendChild(villagerHobbyEl)

        var saveButton = document.createElement('button')
        saveButton.textContent = 'Save'
        mainCardTop.appendChild(saveButton)
        saveButton.addEventListener('click', saveToQuickList)

                
//TODO: Entries on the quicklist should be clickable. When clicked, that villager's id is 
//appended once again to the queryString variable, which gets fed back into the queryRender
//function, which will then render that villager's bio on the main card.
//TODO: 
//Idea: Have saveToQuickList update the array instead of generate new elements, and then call onLoad.

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
                qlItemIcon.innerHTML = "<img src='" + data.icon_uri + "' width='48' height='48' alt='Icon of villager.'>";
                qlItem.appendChild(qlItemIcon)
        
                var villagerKey = {
                    name: data.name['name-USen'],
                    id: data.id
                }

                villagerSaved = JSON.parse(localStorage.getItem("quicklist")) || []
                villagerSaved.push(villagerKey);
                localStorage.setItem("quicklist", JSON.stringify(villagerSaved));
        }
        
    })
}


// function for amiibo
function amiiboImage () {

    var amiiboQuery = searchBar.value
    var amiiboApiUrl = "https://www.amiiboapi.com/api/amiibo/?name=" + amiiboQuery;
        console.log(amiiboApiUrl)
    fetch (amiiboApiUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        console.log(data)

        var amiiboSection = document.querySelector('#main-left');
        var amiiboImg = document.createElement('span');
        amiiboImg.innerHTML = "<img src='" + data.amiibo[0].image + "' alt='amiibo-card for searched character'>";
        // console.log(data.amiibo[0].image)
        amiiboSection.appendChild(amiiboImg)
    })
}

// TODO: Remove this later. Was working on allowing user to click on quick-list.
// function testClick() {
//     console.log('Working')
//     var quickButton = document.querySelector('.ql-button')
//     quickButton.addEventListener('click', quickRender)
//     function quickRender() {
//     var getName = quickButton.getAttribute('value')
//     console.log(getName)
// }

//     qlItem = document.querySelector('list-item')
//     villagerSaved = JSON.parse(localStorage.getItem("quicklist")) || []
//     console.log(qlItem)
//     qlItem.addEventListener('click', queryRender(villagerApiUrl + data.id))

//     TODO: Click must call villager to be rendered on main card.
//                 queryString = villagerApiUrl + data.id
//                 qlItem.addEventListener('click', queryRender(villagerApiUrl + data.id))
//                 console.log(queryString)
//                 queryRender(queryString)

//                 console.log(villagerSaved);
//                 Old solution: reverse array again before feeding back into onLoad; villagerSaved.reverse()
// }

// var quickButton = document.querySelector('.ql-button')
// quickButton.addEventListener('click', quickRender)
// function quickRender() {
//     var getName = quickButton.getAttribute('value')
//     console.log(getName)
// }

searchBar.addEventListener('submit', handleSearchSubmit)
searchButton.addEventListener('click', handleSearchSubmit)

// console.log(villagerSavedGlobal)

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

