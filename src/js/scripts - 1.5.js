var pokemonRepository = (function (pokemonRepository) { //should this be changed to just 'repository'?
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
  
    function addListItem(pokemon) {
        //
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
      add: add,
      getAll: getAll
    };
  })();

pokemonRepository.getAll().forEach(function(repository) {
  if (repository.height > 1.5) {
    document.write(
      "<p>" +
        repository.name +
        "(" +
        repository.height +
        ") - Wow, that's big!" +
        "</p>"
    );
  } else {
    document.write(
      "<p>" + repository.name + "(" + repository.height + ")" + "</p>"
    );
  }
  //console.log(repository[pokemonRepository]);
});

