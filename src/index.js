
console.log(data);

//You can start simple and just render a single 
//pokemon card from the first element

const cardList = document.querySelector(".cards");

function renderFilterDropDown() {

}

function renderPokemonCards() {
    cardList.innerHTML = '';

    data.forEach((pokemon) => {
        const li = document.createElement('li');
        li.className = 'card'

        const h2 = document.createElement('h2');
        h2.className = 'card--title';
        h2.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        li.appendChild(h2);

        const img = document.createElement('img');
        img.width = '256';
        img.className = 'card--img';
        img.src = pokemon.sprites.front_default;
        li.appendChild(img);

        const select = document.createElement('select');

        const spriteOptions = {
            'Front Default': pokemon.sprites.front_default,
            'Back Default': pokemon.sprites.back_default,
            'Front Shiny': pokemon.sprites.front_shiny,
            'Back Shiny': pokemon.sprites.back_shiny,
            'Dream World': pokemon.sprites.other['dream_world'].front_default,
            'Official Artwork': pokemon.sprites.other['official-artwork'].front_default
        };

        for (let [label, url] of Object.entries(spriteOptions)) {
            if (url) { 
                const option = document.createElement('option');
                option.value = url;
                option.text = label;
                select.appendChild(option);
            }
        }

        select.addEventListener('change', (event) => {
            img.src = event.target.value;
        });
        li.appendChild(select);

        const ul = document.createElement('ul');
        ul.className = 'card--text';
        pokemon.stats.forEach((stat) => {
            const statli = document.createElement('li');
            statli.innerText = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`
            ul.appendChild(statli);
        })

        li.appendChild(ul);

        const gameDiv = document.createElement('div');
        gameDiv.innerText = 'Games: ';

        const gameNames = pokemon.game_indices.map(game => 
            game.version.name
        );

        gameDiv.innerText += gameNames.join(', ');
        li.appendChild(gameDiv);

        cardList.appendChild(li);
    });
}

renderPokemonCards();

