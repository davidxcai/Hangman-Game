$(document).ready(() => {
    // This object defines the game's current state,
    const state = {
        win: false,
        guesses: 9,
        wins: 0,
        losses: 0,
        pokemon: [],
        display: [],
        guessed: []
    }
    const s = state;

    // Current pokemon information
    const pokemon = {
        name: '',
        number: '',
        image: '',
    }

    // Generate new pokemon button
    $('#generate').click(() => newPokemon());

    // receives user input and checks
    $(document).on('keypress', e => check(e.key.toLowerCase()))

    // Checks to see if user has won
    function win(disp) {
        !state.display.includes('_') ?                                      // if the display does not contain an underscore
        (s.win = true, s.wins++ , newPokemon()) :                           // set win to true, increment wins, and generate new pokemon
        s.guesses === 0 ?                                                   // else if remaining guesses = 0
        (s.losses++ , newPokemon()) :                                       // increment losses and generate new pokemon
        display(disp);                                                      // else invoke display function
    }

    // Checks against each letter if guessed correctly
    function check(l) {
        s.pokemon.includes(l) ?                                             // if pokemon name has letter equal to user input
        s.pokemon.map((e, i) => { if (e === l) { s.display[i] = e } }) :    // set each element in 'display' equal to user input if matched
        s.guessed.includes(l) ?                                             // else if user input letter has already been guessed
        alert('Pick another letter') :                                      // prompt user to pick another letter
        (s.guessed.push(l), s.guesses--);                                   // else move user input letter into guessed array and decerement guesses
        win(s.display);                                                     // invokes win function passing updated display as parameter
    }

    // Displays key values in state object into DOM
    function display(disp) {
        $('#display').text(disp.toString().replace(/,/g, ' ').toUpperCase())          // regex replacing all commas with spaces
        $('#wins').text(s.wins)
        $('#losses').text(s.losses)
        $('#guesses').text(s.guesses)
        $('#guessed').text(s.guessed.toString().replace(/,/g, ', ').toUpperCase())
        $('#pkmnId').text(pokemon.number)
        $('#pkmnImg').attr({'src': pokemon.image, 'alt': pokemon.image})
    }

    // Resets game state
    function reset() {
        s.win = false;
        s.guesses = 9;
        s.pokemon = [];
        s.display = [];
        s.guessed = [];
    }

    // Generates new random pokemon from pokemon api
    function newPokemon() {
        reset();
        const n = ~~(Math.random() * 802);
        $.ajax({ method: 'GET', url: `https://pokeapi.co/api/v2/pokemon/${n}/` })
        .then(data => {
            pokemon.name = data.name;
            pokemon.number = data.id;
            pokemon.image = data.sprites.front_default;
            const newPkmn = pokemon.name.split('')
            newPkmn.forEach(e => (s.pokemon.push(e), s.display.push('_')))
            display(s.display)
        }).catch(err => { if (err) console.log(err) })
    }
})