let jokes = [];

// DEBUGGING PURPOSES ONLY
function deleteSavedJokes() {
    localStorage.removeItem('jokes');
    console.log('Saved jokes have been deleted.');
}

function loadJokes() {
    const savedJokes = localStorage.getItem('jokes');
    if (savedJokes) {
        jokes = JSON.parse(savedJokes);
    } else {
        const defaultJokes = [
            { joke: 'I submitted ten jokes to a joke contest hoping one would win. Sadly, no pun in ten did.', author: 'Noah' },
            { joke: 'Did you hear about the scarecrow that graduated college? He was outstanding in his field!', author: 'Noah' },
            { joke: 'What do you call a fish without eyes? A Fsshh!', author: 'Noah' }
        ];
        jokes = defaultJokes.map((jokeObj, index) => ({
            ...jokeObj,
            likes: 0,
            liked: false,
            id: index
        }));
        saveJokes();
    }
}

function saveJokes() {
    try {
        localStorage.setItem('jokes', JSON.stringify(jokes));
        console.log('Jokes saved successfully.');
    } catch (error) {
        console.error('Error saving jokes:', error);
    }
}

function getAJoke() {
    if (jokes.length === 0) {
        console.error('No jokes available.');
        return;
    }

    const jokeElement = document.querySelector('div.joketext > p');
    const currentJokeText = jokeElement ? jokeElement.textContent : null;

    let randomIndex;
    let randomJoke;

    // Ensure the new joke is different from the current one
    do {
        randomIndex = Math.floor(Math.random() * jokes.length);
        randomJoke = jokes[randomIndex];
    } while ((randomJoke.joke + ' --- Author: ' + randomJoke.author) === currentJokeText && jokes.length > 1);

    if (jokeElement) {
        jokeElement.textContent = randomJoke.joke + ' --- Author: ' + randomJoke.author  + " --- Likes: " + randomJoke.likes;";
    } else {
        console.error('Joke element not found.');
    }

    const likeButton = document.getElementById('likeButton');
    likeButton.style.backgroundColor = randomJoke.liked ? '#ffc61a' : 'gray';
}

function toggleLike() {
    const jokeElement = document.querySelector('div.joketext > p');
    if (!jokeElement) {
        console.error('Joke element not found.');
        return;
    }

    const currentJokeText = jokeElement.textContent.split(' --- Author: ')[0];
    const joke = jokes.find(j => j.joke === currentJokeText);

    if (!joke) {
        console.error('Currently displayed joke not found in jokes list.');
        return;
    }

    if (joke.liked) {
        joke.likes -= 1;
        joke.liked = false;
        console.log(`Joke: "${joke.joke}" now has ${joke.likes} likes.`);
    } else {
        joke.likes += 1;
        joke.liked = true;
        console.log(`Joke: "${joke.joke}" now has ${joke.likes} likes.`);
    }
    const likeButton = document.getElementById('likeButton');
    likeButton.style.backgroundColor = joke.liked ? '#ffc61a' : 'gray';
    saveJokes();
}

function addNewJoke() {
    const jokeTextInput = document.getElementById('jokeText');
    const jokeAuthorInput = document.getElementById('jokeAuthor');

    if (!jokeTextInput || !jokeAuthorInput) {
        console.error('Form inputs not found.');
        return;
    }

    const jokeText = jokeTextInput.value.trim();
    const jokeAuthor = jokeAuthorInput.value.trim();

    if (!jokeText || !jokeAuthor) {
        console.error('Both joke text and author are required.');
        return;
    }

    const newJoke = {
        joke: jokeText,
        author: jokeAuthor,
        likes: 0,
        liked: false,
        id: jokes.length // Assign a new ID based on the current length of the jokes array
    };

    jokes.push(newJoke);
    saveJokes();

    // Clear the form inputs
    jokeTextInput.value = '';
    jokeAuthorInput.value = '';

    console.log('New joke added:', newJoke);
}

// Load jokes when the script is loaded
document.addEventListener('DOMContentLoaded', loadJokes);
// Load random joke when the page is loaded
document.addEventListener('DOMContentLoaded', getAJoke);