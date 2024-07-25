document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', contactFormSubmit);
});

const successMsg = "Sending message...";
const validatingMsg = "Validating... ";
const allOKMsg = "Validation succesful...";
const validationErrorMsg = "Validation unsuccesful...";

async function contactFormSubmit(event) {
    event.preventDefault();

    resetMessages()

    const userNameInput = document.getElementById('user-name');
    const emailAddressInput = document.getElementById('email-address');
    const userMessageInput = document.getElementById('user-message');

    const neutralMsgElement = document.querySelector('.neutral-msg');
    const errorMsgElement = document.querySelector('.error-msg');
    const successMsgElement = document.querySelector('.success-msg');

    await showMessage(neutralMsgElement, validatingMsg)

    if (userNameInput.value.trim() === '' || emailAddressInput.value.trim() === '' || userMessageInput.value.trim() === '') {
        await showMessage(errorMsgElement, validationErrorMsg)
        return;
    }

    await showMessage(successMsgElement, allOKMsg)

    resetMessages()

    await showMessage(successMsgElement, successMsg)
}

async function showMessage(element, phrase) {
    const intervalValue = 30;
    let idx = 0;
    const interval = setInterval(() => {
        if (idx < phrase.length) {
            element.textContent += phrase[idx];
            idx++;
        } else {
            clearInterval(interval)
        }
    }, intervalValue)

    return new Promise(resolve => {
        setTimeout(resolve, phrase.length * intervalValue)
    })
}

function resetMessages() {
    document.querySelector('.neutral-msg').textContent = '';
    document.querySelector('.error-msg').textContent = '';
    document.querySelector('.success-msg').textContent = '';
}