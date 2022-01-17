var villagerApiUrl = 'https://acnhapi.com/v1a/villagers/'
var villagerSavedGlobal = []
var quickListContainer = document.querySelector('#quicklist')
var threeCards = document.querySelector('.three-cards')
var searchBar = document.querySelector('input')
var searchButton = document.querySelector('.success')


function onLoad() {
    birthday();
    var history = JSON.parse(localStorage.getItem("quicklist"))
    var recentHistory = history.reverse();
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

            qlItem.classList.add("clickable");
            qlItem.setAttribute("vill-id", data.id)
            qlItem.setAttribute("vill-name", data.name['name-USen'])
            qlItem.innerText = data.name['name-USen']
            quickListContainer.appendChild(qlItem)

            var qlItemIcon = document.createElement('img');
            qlItemIcon.setAttribute("vill-id",  data.id)
            qlItemIcon.setAttribute("vill-name", data.name['name-USen'])
            qlItemIcon.setAttribute("alt", "Icon of villager");
            qlItemIcon.src = data.icon_uri
            qlItemIcon.style.width = "53px"
            qlItem.appendChild(qlItemIcon)
    
            })
    }
  
}


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
        console.log(apiVillagerInfo)

        if (apiVillagerInfo.length === 0) {
            alert("No villagers matched your query. Remember to use proper capitalization.")
            return;
        }

        var villagerId = apiVillagerInfo[0].id;
        var queryString = villagerApiUrl + villagerId

        queryRender(queryString);
        amiiboImage(query);

    })
    
   
}

function queryRender(queryString) {
    fetch(queryString)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var mainCardContainer = document.querySelector('#main-card')
        mainCardContainer.style.display = "block";

        var mainCardTop = document.querySelector('#main-top')
        var mainCardRight = document.querySelector('#right')
        var mainCardLeft = document.querySelector('#left')

        mainCardTop.innerHTML = ''
        mainCardRight.innerHTML = ''
        mainCardLeft.innerHTML = ''

        var nameButton = document.createElement('div')
        nameButton.style.display = "block"
        nameButton.style.padding = "15px"
        var villagerName = document.createElement('h2')
        villagerName.style.cssFloat = "left"
        villagerName.textContent = data.name['name-USen']
        nameButton.appendChild(villagerName)
 
        var saveButton = document.createElement('button')
        saveButton.style.cssFloat = "right"
        saveButton.classList.add('button', 'success')
        saveButton.style.marginTop = "10px"
        saveButton.textContent = 'Save'
        nameButton.appendChild(saveButton)
        mainCardTop.appendChild(nameButton)
        saveButton.addEventListener('click', saveToQuickList)

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
        villagerImg.style.paddingBottom = "5px"
        villagerImg.innerHTML = "<img src='" + data.image_uri + "' style='padding-bottom: 10px;' alt='Image of villager.'>";
        mainCardLeft.appendChild(villagerImg)

        var villagerMottoEl = document.createElement('div')
        villagerMottoEl.style.display = "block"
        // villagerMottoEl.style.textAlign = "center";
        // villagerMottoEl.style.cssFloat = "right"
        var villagerMotto = document.createElement('span')
        var villagerMottoTag = document.createElement('h5')
        villagerMotto.textContent = data.saying
        villagerMottoTag.textContent = 'Motto: '
        villagerMottoEl.appendChild(villagerMottoTag)
        villagerMottoTag.appendChild(villagerMotto)
        mainCardRight.appendChild(villagerMottoEl)
        
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


        function saveToQuickList() {

                var qlItem = document.createElement('li')
                qlItem.classList.add("clickable");
                qlItem.setAttribute("vill-id", data.id)
                qlItem.setAttribute("vill-name", data.name['name-USen'])    
                qlItem.textContent = data.name['name-USen']
                quickListContainer.appendChild(qlItem)

                var qlItemIcon = document.createElement('img');
                qlItemIcon.setAttribute("vill-id",  data.id)
                qlItemIcon.setAttribute("vill-name", data.name['name-USen'])
                qlItemIcon.setAttribute("alt", "Icon of villager");
                qlItemIcon.src = data.icon_uri
                qlItemIcon.style.width = "53px"
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
function amiiboImage (query) {

    // var amiiboQuery = searchBar.value
    var amiiboApiUrl = "https://www.amiiboapi.com/api/amiibo/?name=" + query;
        console.log(amiiboApiUrl)
    fetch (amiiboApiUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        console.log(data)

        var amiiboSection = document.querySelector('#left');
        var amiiboImg = document.createElement('span');
        amiiboImg.innerHTML = "<img src='" + data.amiibo[0].image + "' alt='amiibo-card for searched character'>";
        // console.log(data.amiibo[0].image)
        amiiboSection.appendChild(amiiboImg)
    })
}


threeCards.addEventListener("click", function(event) {
    var element = event.target


    if (element.matches("li") || element.matches("img") || element.matches("h4") === true) {
        var grabId = element.getAttribute("vill-id");
        var quickUrl = villagerApiUrl + grabId
        var amiiboName = element.getAttribute("vill-name")
        console.log(amiiboName);
        queryRender(quickUrl);
        amiiboImage(amiiboName)

    }
})

//This function is called birthday but it also contains the functionality for the villager spotlight.
function birthday() {
    var showTime = document.querySelector('#time')
    var currentTime = document.createElement('span')
    currentTime.textContent = moment().format("MMMM Do")
    
    var birthdayEl = document.querySelector('#birthday-list')
    var spotlightEl = document.querySelector('#vodcard')


    fetch(villagerApiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {

        //Villager Spotlight
        const spotlight = data[Math.floor(Math.random() * data.length)];
        var spotlightName = document.createElement('h4')
        spotlightName.classList.add("clickable");
        spotlightName.setAttribute("vill-id", spotlight.id)
        spotlightName.setAttribute("vill-name", spotlight.name['name-USen'])
        spotlightName.textContent = 'Meet ' + spotlight.name['name-USen'] + '!'
        spotlightEl.appendChild(spotlightName)

        var spotlightImg = document.createElement('img');
        spotlightImg.classList.add("clickable");
        spotlightImg.setAttribute("vill-id", spotlight.id)
        spotlightImg.setAttribute("vill-name", spotlight.name['name-USen'])
        spotlightImg.setAttribute("alt", "Our spotlight villager");
        spotlightImg.src = spotlight.image_uri
        spotlightEl.appendChild(spotlightImg)


        //Villager Birthday
        var birthdayFinder = data.filter(villager => villager['birthday-string'] === currentTime.textContent)
        console.log(birthdayFinder)

        if (birthdayFinder.length === 0) {
            var birthdayName = document.createElement('li')
            birthdayName.textContent = 'There are no birthdays today.'
            birthdayEl.appendChild(birthdayName)
        } else {

        var birthdayName = document.createElement('li')
        birthdayName.classList.add("clickable");
        birthdayName.setAttribute("vill-id",  birthdayFinder[0].id)
        birthdayName.setAttribute("vill-name", birthdayFinder[0].name['name-USen'])
        birthdayName.textContent = 'Happy Birthday, ' + birthdayFinder[0].name['name-USen'] + '!'
        birthdayEl.appendChild(birthdayName)

        var birthdayIcon = document.createElement('img');
        birthdayIcon.setAttribute("vill-id",  birthdayFinder[0].id)
        birthdayIcon.setAttribute("vill-name", birthdayFinder[0].name['name-USen'])
        birthdayIcon.setAttribute("alt", "Icon of villager");
        birthdayIcon.src = birthdayFinder[0].icon_uri
        birthdayIcon.style.width = "53px"
        birthdayName.appendChild(birthdayIcon)
        }
    })

    showTime.appendChild(currentTime)

}

searchBar.addEventListener('submit', handleSearchSubmit)
searchButton.addEventListener('click', handleSearchSubmit)

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

