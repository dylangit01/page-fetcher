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

const fetch = (argsArr, callback) => {
	request(argsArr[0], 'utf-8', (error, response, body) => {
		if (error) {
			callback(`Error happened, please check if URL correct`, null)
		} else {
			callback(null, body, argsArr[1])
		}
	})
}

fetch(args, (error, content, filePath) => {
	if (error) {
		console.log(error);
	} else {
		fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        writeFile(filePath, content);
      } else {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('File already exists, type Y to overwrite, or cancel by typing anything else...', (answer) => {
          if (answer === 'Y') {
            writeFile(filePath, content);
          }
          rl.close();
        });
      }
    });
	}
})

