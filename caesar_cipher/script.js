function caesarCipher(text, shift) {
    let encryptedText = '';
    for (let char of text) {
        if (char >= 'A' && char <= 'Z') {
            encryptedText += String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
        } else if (char >= 'a' && char <= 'z') {
            encryptedText += String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
        } else {
            encryptedText += char;
        }
    }
    return encryptedText;
}

function caesarDecrypt(encryptedText, shift) {
    return caesarCipher(encryptedText, (26 - shift) % 26);
}

function encryptMessage() {
    const message = document.getElementById('message').value;
    const shift = parseInt(document.getElementById('shift').value);
    const result = caesarCipher(message, shift);
    document.getElementById('result').innerText = result;
}

function decryptMessage() {
    const message = document.getElementById('message').value;
    const shift = parseInt(document.getElementById('shift').value);
    const result = caesarDecrypt(message, shift);
    document.getElementById('result').innerText = result;
}
