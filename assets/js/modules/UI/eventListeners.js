import {
  startButton,
  saveButton,
	refreshButton,
	settingsButton,
	settingsMenu,
	aiSettings,
	humanSettings,
	aiModeButton,
	humanModeButton,
	aiPlayerX,
	aiCheckboxX,
	aiPlayerO,
	aiCheckboxO,
	cancelButton
} from '../UI/elements.js';

export const startButtonListener = () => startButton.addEventListener('click', function () {
  if (!gameStarted) {
    startGame();
  }
});

export const saveButtonListener = () => saveButton.addEventListener('click', function (set, start ) {
  set();
  document.querySelector('.settings-menu').classList.add('hidden');
  start();
});

export const refreshListener = (startGame) => refreshButton.addEventListener('click', startGame)


export const settingsButtonListener = () => settingsButton.addEventListener('click', function () {
  settingsMenu.classList.remove('hidden');
});




export const aiModeListener = aiModeButton.addEventListener('change', function () {
  if (aiModeButton.checked === true) {
    aiSettings.classList.remove('hidden');
    humanSettings.classList.add('hidden');
  }
});


export const humanModeListener = humanModeButton.addEventListener('change', function () {
  if (humanModeButton.checked === true) {
    humanSettings.classList.remove('hidden');
    aiSettings.classList.add('hidden');
  }
});


export const aiXListener = aiPlayerX.addEventListener('focus', () => {
  setAiPlayer(aiPlayerX, 'X', aiPlayerO, aiCheckboxX);
});



export const aiOListener = aiPlayerO.addEventListener('focus', () => {
  setAiPlayer(aiPlayerO, 'O', aiPlayerX, aiCheckboxO);
});


export const cancelListener = cancelButton.addEventListener('click', function () {
  settingsMenu.classList.add('hidden');
  humanSettings.classList.remove('hidden');
  aiSettings.classList.add('hidden');
  aiPlayerX.setAttribute('placeholder', 'Player X');
  aiPlayerO.setAttribute('placeholder', 'AI');
  settings.reset();
});