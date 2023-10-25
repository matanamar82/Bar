function getDrinks(){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        SelectDrinks(data.drinks, 'drinks')
    })
    .catch((err) => {
        console.log(err);
    });
}

function SelectDrinks(drinksArr, select){
    const drinksList = document.getElementById(select);
    drinksArr.forEach(drink => {
        const option = document.createElement('option');
        option.value = drink.strIngredient1;
        option.innerText = drink.strIngredient1;
        drinksList.appendChild(option);
    });
}

function getCocktails(url){
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        createGallery(data.drinks);
    })
    .catch((err) => {
        console.log(err);
    });
}

function createGallery(cocktailsArr) {
    const cocktailsList = document.querySelector('.cocktails');
    cocktailsList.innerHTML = ''; // Clear previous content
    cocktailsArr.forEach(cocktail => {
        const block = document.createElement('div');
        block.classList.add('block'); 
        const name = document.createElement('h3');
        name.innerText = cocktail.strDrink;
        const image = document.createElement('img');
        image.src = cocktail.strDrinkThumb;
        image.style.height = "40%"
        image.style.marginBottom = "5%";
        image.style.border = "1px solid black"
        let table = document.createElement('table');
        table.style.border = "1px solid black";
        let trHead = document.createElement('tr');
        let th1 = document.createElement('th');
        let th2 = document.createElement('th');
        th1.innerText = "Ingredient";
        th2.innerText = "Measure";
        trHead.appendChild(th1);
        trHead.appendChild(th2);
        table.appendChild(trHead);
        
        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];
            if (ingredient) {
                let tr = document.createElement('tr');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                td1.style.fontSize = '90%';
                td2.style.fontSize = '90%';
                td1.innerText = ingredient;
                td2.innerText = measure || '';
                tr.append(td1, td2);
                table.appendChild(tr);
            }
        }
        

        let instructions = document.createElement('span');
        instructions.classList.add('desc');
        instructions.innerText = cocktail.strInstructions;
        
        block.appendChild(name);
        block.appendChild(image);
        block.appendChild(table);
        block.appendChild(instructions);

        cocktailsList.appendChild(block);
    });
}

const select = document.querySelector('select');
select.addEventListener('change', () => {
    const drink = select.value;
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    url += drink.replace(' ', '&nbsp;');
    getCocktails(url);
});

getDrinks();
getCocktails('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
