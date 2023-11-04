let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
searchInputEl.addEventListener("keydown", searchwikipedia);

function createAndAppendSearchResults(result) {
    //creating reult item 
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    // creating title 
    let {
        link,
        title,
        description
    } = result;
    let resultsTitleEl = document.createElement("a");
    resultsTitleEl.href = link;
    resultsTitleEl.target = "_blank";
    resultsTitleEl.textContent = title;
    resultsTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultsTitleEl);
    //cretaing break element 
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //creating URL element 
    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);


    //creating break Element 
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    //creating description element 
    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);

}

function displayresults(searchResults) {
    for (let result of searchResults) {
        spinnerEl.classList.toggle("d-none");
        createAndAppendSearchResults(result);
    }
}

function searchwikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {

                let {
                    search_results
                } = jsonData;
                displayresults(search_results);
                spinnerEl.classList.toggle("d-none");

            });

    }
}