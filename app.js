let registeredValues = {
	AX: 0,
	BX: 0,
	CX: 0,
	DX: 0
};

let userCommands = [];

initializeInput = () => {
	document.querySelector('.command-prompt').addEventListener('keypress', handleCommand);
};

handleCommand = (event) => {

	//Send command
	if (event.key === 'Enter') {

		const commands = document.querySelector('.command-prompt').value.trim().toUpperCase().split(' ');
		document.querySelector('.command-prompt').value = '';

		// User command write
		let userCommandString = '';
		commands.forEach(command => {
			userCommandString += command + ' ';
		});
		userCommands.push(userCommandString);
		writeUserCommand(`<span>root@i8086</span> $> ${userCommandString}`);

		switch (commands[0]) {

			case 'MOV':
				if (parseInt(commands[2]) >= 0) {
					registeredValues[commands[1]] = commands[2];
				} else {
					registeredValues[commands[2]] = registeredValues[commands[1]];
				}
				break;

			case 'GET':
				if (commands[1] === 'ALL') {
					writeLine(`AX = ${registeredValues.AX}`);
					writeLine(`BX = ${registeredValues.BX}`);
					writeLine(`CX = ${registeredValues.CX}`);
					writeLine(`DX = ${registeredValues.DX}`);
				} else {
					writeLine(`${commands[1]} VALUE: ${registeredValues[commands[1]]}`);
				}
				break;

			case 'RESET':
				registeredValues = {
					AX: 0,
					BX: 0,
					CX: 0,
					DX: 0
				};
				break;

			case 'HELP':
				writeLine(`MOV [XX] [XXXX] - set value (e.g. MOV AX 1650 will set AX to 1650)`);
				writeLine(`MOV [XX] [XX] - move value (e.g. MOV AX BX will move AX value to BX)`);
				writeLine(`GET [XX/ALL] - show value/all values (e.g. GET AX - shows AX value)`);
				writeLine(`RESET - resets all values`);
				writeLine(`CLEAR - clears screen`);
				break;

			case 'CLEAR':
				document.querySelector('.console').innerHTML = '';
				break;

			default:
				writeLine('Unknown command');
				writeLine('You can check available commands using HELP command');
				break;
		}
	}
};

writeLine = (line) => {
	const newLine = document.createElement('p');
	newLine.innerHTML = line;
	document.querySelector('.console').appendChild(newLine);
};

writeUserCommand = (command) => {
	const newLine = document.createElement('p');
	newLine.innerHTML = command;
	newLine.classList.add('user-command');
	document.querySelector('.console').appendChild(newLine);
};

init = () => {
	initializeInput();
};
init();
