const encryptButton = document.querySelector('#encrypt');
const decryptButton = document.querySelector('#decrypt');
const copyButton = document.querySelector('#copy');
const message = document.querySelector('#message');
const messageWithoutText = document.querySelector('#message-without-text');
const messageWithText = document.querySelector('#message-with-text');
const textPreview = document.querySelector('#text-preview');

encryptButton.addEventListener('click', () => {
  if (message.value === '') return alert('Please enter a message to encrypt');
  const value = encryptMessage(message.value);
  cleanResultContainer(value);
});

decryptButton.addEventListener('click', () => {
  if (message.value === '') return alert('Please enter a message to decrypt');
  const value = decryptMessage(message.value);
  cleanResultContainer(value);
});

copyButton.addEventListener('click', () => {
  const text = textPreview.innerHTML;
  navigator.clipboard.writeText(text);
  copyButton.innerHTML = 'Copied!';
  setTimeout(() => {
    copyButton.innerHTML = 'Copy';
  }, 1000);
});

const cleanResultContainer = (value) => {
  textPreview.innerHTML = value;
  messageWithoutText.style.display = 'none';
  messageWithText.style.display = 'block';
  message.value = '';
};

const encryptMessage = (message) => {
  const cleanMessage = removeAccents(message).toLowerCase();
  return cleanMessage
    .split('')
    .map((letter) => {
      if (letter === 'a') return 'ai';
      if (letter === 'e') return 'enter';
      if (letter === 'i') return 'imes';
      if (letter === 'o') return 'ober';
      if (letter === 'u') return 'ufat';
      return letter;
    })
    .join('');
};

const decryptMessage = (message) => {
  const cleanMessage = removeAccents(message).toLowerCase();
  return cleanMessage
    .replaceAll('ai', 'a')
    .replaceAll('enter', 'e')
    .replaceAll('imes', 'i')
    .replaceAll('ober', 'o')
    .replaceAll('ufat', 'u');
};

const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
