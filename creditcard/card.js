const form = document.getElementById('form-container');

function isCardNumberValid(number) {
	// normally we would contact a credit card service...but we don't know how to do that yet. So to keep things simple we will only accept one number
	return number === '1234123412341234'
}
function displayError(msg) {
	// display error message
	document.getElementById('errorMsg').innerHTML = msg
}
function submitHandler(event) {
    event.preventDefault()
    let errorMsg = ''
    displayError('')
    // check credit card number
    if (isNaN(this.cardNumber.value)) {
        // it is not a valid number
        errorMsg += 'Card number is not a valid number\n'
    } else if (!isCardNumberValid(this.cardNumber.value)) {
        // it is a number, but is it valid?
        errorMsg += 'Card number is not a valid card number\n'
    }

    // check card expiration date
    const cardMonth = parseInt(this.cardMonth.value, 10)
    const cardYear = parseInt(this.cardYear.value, 10) + 2000 // assuming YY format is 2000-based
    const currentDate = new Date()
    const cardDate = new Date(cardYear, cardMonth - 1) // months are 0-based in JavaScript Date

    if (cardDate < currentDate) {
        errorMsg += 'Card is expired!\n'
    }

    if (errorMsg !== '') {
        displayError(errorMsg)
        return false
    }
    return true
}

form.addEventListener('submit', submitHandler)