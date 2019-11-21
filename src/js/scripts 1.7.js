var pokemonRepository = (function (repository) {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    //search: search,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

var $pokemonList = document.querySelector('ul');
pokemonRepository.getAll().forEach(function(pokemon) { //pokemon is placeholder name for each element in repo
  pokemonRepository.addListItem(pokemon); //what happens if parameter is blank, will it work?
});


pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
