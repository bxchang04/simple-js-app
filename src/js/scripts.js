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

    function add(pokemon) { //only accepts pokemon
      repository.push(pokemon);
    }

    function addListItem(pokemon) { //only accpets pokemon
      var $listItem = document.createElement('li');
      var $button = document.createElement('button');
      $button.innerText = pokemon.name;
      $button.classList.add('pokemon-name') //is this redundant?
      $listItem.appendChild($button);
      $pokemonList.appendChild($listItem);
      $button.addEventListener('click', function(pokemon) { //!!!why does this work event without a parameter in the function?
        showDetails(pokemon);
      })
    }

    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function() {
        console.log(item);

          // Modal content creation
          var modalContainer = $('.modal-body');
          // NameElement
          var nameElement = $('.modal-title').text(
              item.name.charAt(0).toUpperCase() + item.name.slice(1)
          );
          // HeightElement
          var heightElement = $('<p class="pokemon-height"></p>').text(
              'Height: ' + item.height + '0 cm'
          );
          //WeightElement
          var weightElement = $('<p class="pokemon-weight"></p>').text(
              'Weight: ' + item.weight + '00 grams'
          );
          //TypeElement
          var typeElement = $('<p class="pokemon-type"></p>').text(
              'Type: ' + item.types
          );
          // ImageElement
          var imageElement = $('<img class="pokemon-img">');
          imageElement.attr('src', item.imageUrl);
          // Remove content once modal is closed
          if (modalContainer.children().length) {
              modalContainer.children().remove();
          }

          //Append all items to modalBody
          modalContainer.append(nameElement);
          modalContainer.append(heightElement);
          modalContainer.append(weightElement);
          modalContainer.append(typeElement);
          modalContainer.append(imageElement);
      });
    }


    function getAll() {
      return repository;
    }

    return {
      add: add,
      addListItem: addListItem,
      getAll: getAll
      //showDetails: showDetails
    };
  })();

var $pokemonList = document.querySelector('ul');
pokemonRepository.getAll().forEach(function(pokemon) { //pokemon is placeholder name for each element in repo
  pokemonRepository.addListItem(pokemon); //what happens if parameter is blank, will it work?
});
