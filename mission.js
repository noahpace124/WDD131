const themeSelector = document.querySelector('#theme-selector');
function changeTheme() {
    // check to see what the current value of our select is.
    // The current value is conveniently found in themeSelector.value!
    selected = themeSelector.value;

    // if the value is dark then:
    if (selected == 'dark') {
        // add the dark class to the body
        // change the source of the logo img to point to the white logo.
        document.body.classList.add('dark');
        document.body.style.backgroundColor = '#333';
        document.body.style.color = 'white';
        document.querySelector('img').src = 'img/byui-logo_white.png';
    // otherwise
    } else {
        // remove the dark class
        // make sure the logo src is the blue logo.
        document.body.classList.remove('dark');
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        document.querySelector('img').src = 'img/byui-logo_blue.webp';
    }
}

// add an event listener to the themeSelector element here.
// Use the changeTheme function as the event handler function.
themeSelector.addEventListener('change', changeTheme);