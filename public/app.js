// const movieSearchBox = document.getElementById("movieName");

const nominationButtons = document.querySelectorAll(".btn-info");


const nominationContainer = document.getElementById("nominationContainer");
let myStorage = window.localStorage;
let movieNominations = JSON.parse(myStorage.getItem('nominations'));


// initialize movie history table 
function initMovieNominations(movieNominations) {
    nominationContainer.innerHTML = `<h5 class="card-title">Nominations</h5>
    <ul class="list-group" id="nominations"></ul>
    `;

    const nominationList = document.getElementById("nominations");
    if (movieNominations) {
        for (let nominatedMovie of movieNominations) {
            nominationList.innerHTML += `
                
                <li class="list-group-item">${nominatedMovie}
                
                <button type="button" id="remove_${nominatedMovie}" class="btn btn-danger btn-md my-2">
                            Remove
                        </button>
                </li>

            `;

        }

    }

}

function disableNominated() {
    const nominationButtons = document.querySelectorAll(".btn-info");
    let movieNominations = JSON.parse(myStorage.getItem('nominations'));
    if (movieNominations) {
        for (let btn of nominationButtons) {
            if (movieNominations.includes(btn.id)) {
                btn.disabled = true;
            }

        }
    }

}

// call functions at initialization
function init() {
    // if (movieNominations != null) {
    //     initMovieNominations(movieNominations);
    // }
    initMovieNominations(movieNominations);
    disableNominated();

}

init();


// click nominate buttons
nominationButtons.forEach(el => el.addEventListener('click', event => {

    let movieNominations = JSON.parse(myStorage.getItem('nominations'));


    // let movieNominations = JSON.parse(myStorage.getItem("nominations"));
    if (movieNominations === null) {
        movieNominations = [];
    }

    // display a banner when there are 5 nominations
    // movieNominations.length>4
    if (movieNominations.length > 4) {
        alert("The max number of nominations is 5.");

    } else {
        const nominationList = document.getElementById("nominations");


        nominationList.innerHTML +=
            `
            <li class='list-group-item'>${event.target.id}
            <button type="button" id="remove_${event.target.id}" class="btn btn-danger btn-md my-2">
                Remove
            </button>
            
            </li>
            `;


        movieNominations.push(event.target.id);

        myStorage.setItem("nominations", JSON.stringify(movieNominations));

        //reload the page
        location.reload();


    }



}));

const removeButtons = document.querySelectorAll(".btn-danger");

// remove buttons
removeButtons.forEach(el => el.addEventListener('click', event => {
    let nominatationToRemove = event.target.id.split("_")[1];
    let movieNominations = JSON.parse(myStorage.getItem('nominations'));
    //remove it from local storage

    let newNominationList = [];
    for (let nominatedMovie of movieNominations) {
        if (nominatedMovie !== nominatationToRemove) {
            newNominationList.push(nominatedMovie);
        }
    }
    myStorage.setItem("nominations", JSON.stringify(newNominationList));
    newNominationList = [];

    //remove the child list on the page

    event.currentTarget.parentNode.remove();
    // console.log("clicked");

    //reload the page
    location.reload();


}));