//errors
// scripts.js:50 Fetch API cannot load file:///C:/Users/1/Documents/GitHub/simple-js-app/src/undefined. URL scheme must be "http" or "https" for CORS request.
// loadDetails @ scripts.js:50
// showDetails @ scripts.js:24
// (anonymous) @ scripts.js:19
// scripts.js:58 TypeError: Failed to fetch
//     at Object.loadDetails (scripts.js:50)
//     at showDetails (scripts.js:24)
//     at HTMLButtonElement.<anonymous> (scripts.js:19)

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
    $button.classList.add('pokemon-list__button') //changed from pokemon-name
    $listItem.appendChild($button);
    $pokemonList.appendChild($listItem);
    $button.addEventListener('click', function() { //!!!why does this work event without a parameter in the function? - answered by Jason in submission history
      showDetails(pokemon);
    })
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);   });

      var $modalContainer = document.querySelector('#modal-container');
    var dialogPromiseReject; // This can be set later, by showDialog

    function showModal(title, text) {
      // Clear all existing modal content
      $modalContainer.innerHTML = '';

      var modal = document.createElement('div');
      modal.classList.add('modal');

      // Add the new modal content
      var closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      var titleElement = document.createElement('h1');
      titleElement.innerText = title;

      var contentElement = document.createElement('p');
      contentElement.innerText = text;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      $modalContainer.appendChild(modal);

      $modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      $modalContainer.classList.remove('is-visible');

      if (dialogPromiseReject) {
        dialogPromiseReject();
        dialogPromiseRejct = null;
      }
    }

    function showDialog(title, text) {
      showModal(title, text);

      // We want to add a confirm and cancel button to the modal
      var modal = $modalContainer.querySelector('.modal');

      var confirmButton = document.createElement('button');
      confirmButton.classList.add('modal-confirm');
      confirmButton.innerText = 'Confirm';

      var cancelButton = document.createElement('button');
      cancelButton.classList.add('modal-cancel');
      cancelButton.innerText = 'Cancel';

      modal.appendChild(confirmButton);
      modal.appendChild(cancelButton);

      // We want to focus the confirmButton so that the user can simply press Enter
      confirmButton.focus();

      // Return a promise that resolves when confirmed, else rejects
      return new Promise((resolve, reject) => {
        cancelButton.addEventListener('click', hideModal);
        confirmButton.addEventListener('click', () => {
          dialogPromiseReject = null; // Reset this
          hideModal();
          resolve();
        });
        // This can be used to reject from other functions
        dialogPromiseReject = reject;
      });
    }

    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('Modal title', 'This is the modal content!');
    });

    document.querySelector('#show-dialog').addEventListener('click', () => {
      showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
        alert('confirmed!');
      }, () => {
        alert('not confirmed');
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    $modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal container,
      // We only want to close if the user clicks directly on the overlay
      var target = e.target;
      if (target === $modalContainer) {
        hideModal();
      }
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
    addListItem: addListItem,
    getAll: getAll,
    //search: search, // causing error for some reason
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
