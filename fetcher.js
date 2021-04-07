const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2, 4)
// console.log(args);

const fetch = (argsArr) => {
	request(argsArr[0], (error, response, body) => {
		if (error) {
			console.log(`Error happened, please check URL`);
			return;
		}
  // console.log('error:', error); 
 console.log('statusCode:', response && response.statusCode);
		// console.log('body:', body);
		fs.writeFile(argsArr[1], body, (error) => {
      if (error) {
				console.log('Failed to write to file, please check local file path');
				return;
			} 
      console.log(`Downloaded and saved 3261 bytes to ${argsArr[1]}`);
    });
});
}

fetch(args)

