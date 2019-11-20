var pokemonRepository = (function (repository) {
    var repository = [
      {
      name: "Bulbasaur",
      height: 0.7,
      types: ["grass", "poison"]
      },
      {
          name: "Squirtle",
          height: 0.5,
          types: ["water"]
      },
      {
          name: "Charizard",
          height: 1.7,
          types: ["fire", "flying"]
      }
    ];

    function add(pokemon) {
      repository.push(pokemon);
    }

    function getAll() {
      return repository;
    }

    return {
      add: add,
      getAll: getAll
    };
  })();

var $pokemonList = document.querySelector('ul');
pokemonRepository.getAll().forEach(function(pokemon) {
  var $listItem = document.createElement('li');
  var $button = document.createElement('button');
  $button.innerText = pokemon.name;
  $button.classList.add('pokemon-name')
  $listItem.appendChild($button);
  $pokemonList.appendChild($listItem);
})
