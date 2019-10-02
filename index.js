const apiKey = 'YeONQKaWCGb3oDTpH3SM1hZCZYMRPRfDkFmyzqtF'
const baseUrl = 'https://developer.nps.gov/api/v1/parks'


function watchForm() {
    $('form').submit(function(e) {
        e.preventDefault();
        const userStateInput = $("#stateInput").val();
        const userMaxResults = $("#maxResults").val();
        checkStates(userStateInput, userMaxResults);
    })
}

function checkStates(userStateInput, userMaxResults) {
    if (userStateInput = userStateInput.toUpperCase()) {
        getNationalParks(userStateInput, userMaxResults);
    }
    else {
        alert('State names must be capitalized')
    }
};

function constUrl (params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function getNationalParks(userStateInput, userMaxResults) {
    const params = {
        stateCode: userStateInput,
        api_key: apiKey,
        limit: userMaxResults,
    }
    const queryString = constUrl(params)
    const url = baseUrl + '?' + queryString;
    fetch (url)
        .then (response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error(response.statusText);
            }
            })
        .then (responseJson => displayResults(responseJson, userMaxResults))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
    };

function displayResults (responseJson, userMaxResults) {
    console.log(responseJson);
    $("div.resultsHolder").empty();
    $("div.resultsHolder").append(`
        <h1 class="header">
                Here are the parks in your desired states:
        </h1>
    `);
    for (let i = 0; i<userMaxResults && i < responseJson.data.length; i++) {
        $("div.resultsHolder").append (`
            <br>
            <p class="results">${responseJson.data[i].name}</p>
            <p class="results">${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}" class="resultsLink">${responseJson.data[i].url}</a>
            <br><br>
        `)
    }
}


$(function() {
    console.log('Form is ready! Waiting for submit');
    watchForm();
});
