const request = require('request');
const fs = require('fs');
const readline = require('readline');

const args = process.argv.slice(2, 4)

const writeFile = (filePath, body) => {
	fs.writeFile(filePath, body, (err) => {
    if (err) {
			console.log(('Failed to write to file, please check local file path'));
			return;
    } else {
      const stats = fs.statSync(filePath);
      const fileSizeInBytes = stats.size;
      console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${filePath}`);
    }
  });
}

const fetch = (argsArr) => {
	request(argsArr[0], (error, response, body) => {
		if (error) {
			throw Error(`Error happened, please check URL`);
		} else if (response.statusCode !== 200) {
			throw Error('Page access failed')
		};
		
		fs.access(argsArr[1], fs.constants.F_OK, err => {
			if (err) {
				writeFile(argsArr[1], body);
			} else {
					const rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout
					});
				rl.question('File already exists, type Y to overwrite, or cancel by typing anything else...', answer => {
					if (answer === 'Y') {
							writeFile(argsArr[1], body);
					}
					rl.close();
					});
			}
		})
});
}

fetch(args)

