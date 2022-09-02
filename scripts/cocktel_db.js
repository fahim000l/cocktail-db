let loadCocktail = async (cocktailName, limit) => {

    let cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`;

    try {
        let res = await fetch(cocktailUrl);
        let data = await res.json();
        displayCocktail(data.drinks, limit);
    }
    catch (error) {

        console.log(error);
        displayCocktail([]);
    }

}

let displayCocktail = (cocktails, limit) => {

    console.log(cocktails);

    let cocktailContainer = document.getElementById('cocktail-container');
    cocktailContainer.innerHTML = ``;

    if (limit && cocktails.length > 10) {
        cocktails = cocktails.slice(0, 10);
        document.getElementById('show-all').classList.remove('d-none');
    }
    else {

        document.getElementById('show-all').classList.add('d-none');
    }




    if (cocktails.length === 0) {
        document.getElementById('not-found').classList.remove('d-none');
    }
    else {

        cocktails.forEach(cocktail => {
            let cocktailDiv = document.createElement('div');
            cocktailDiv.classList.add('col');
            cocktailDiv.innerHTML = `
                <div class="card">
                    <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${cocktail.strDrink}</h5>
                        <p class="fw-bold">Alchoholic/Non-Alchoholic : ${cocktail.strAlcoholic}</p>
                        <p class="fw-bold">Category      : ${cocktail.strCategory}</p>
                        <p class="fw-bold">Container     : ${cocktail.strGlass}</p>
                        <p class="fw-bold">Modified date : ${cocktail.dateModified}</p>

                        <button onclick="loadDetails(${cocktail.idDrink})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detail">Show Details</button>
                    </div>
                </div>
            `;

            cocktailContainer.appendChild(cocktailDiv);
        });

        document.getElementById('not-found').classList.add('d-none');

    }

    spinner(false);

}

let loadDetails = detailId => {
    let detailUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${detailId}
    `;

    fetch(detailUrl)
        .then(res => res.json())
        .then(data => displayDetails(data.drinks[0]))
}

let displayDetails = (details) => {

    console.log(details);

    let detailHeader = document.getElementById('detailLabel');
    detailHeader.innerText = `${details.strDrink}`;

    let detailBody = document.getElementById('detail-body');

    detailBody.innerHTML = `
        <div class="d-flex justify-content-center align-items-center">
            <img class="m-0 p-0" style="width:500px;" src="${details.strDrinkThumb}">
        </div>
        <div class="p-5">
            <p class="fw-bold">Ingredient (1) : ${details.strIngredient1}</p>
            <p class="fw-bold">Ingredient (2) : ${details.strIngredient2}</p>
            <p class="fw-bold">Ingredient (3) : ${details.strIngredient3}</p>
            <p>Instruction DE                 : ${details.strInstructionsDE}</p>
            <p>Instruction ES                 : ${details.strInstructionsES}</p>
            <p>Instruction IT                 : ${details.strInstructionsIT}</p>
        </div>
    `;
}

let searchProcess = (limit) => {


    spinner(true);
    let searchIn = document.getElementById('search-in');
    let searchText = searchIn.value;
    loadCocktail(searchText, limit);
}

let searchBtn = () => {
    searchProcess(10);
}

document.getElementById('show-all').addEventListener('click', function () {
    searchProcess();
});

let spinner = (signal) => {

    if (signal == true) {
        document.getElementById('spinner').classList.remove('d-none');
    }
    else {
        document.getElementById('spinner').classList.add('d-none');
    }
}


// margarita