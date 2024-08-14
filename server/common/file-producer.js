
const fs = require('fs');

function produceViaFile (channel, projectId) {

  var dir = './microkit/' + channel;
  
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  
  const content = '';
  
  fs.writeFile(dir + '/' + projectId, content, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
}

module.exports = {
    produceViaFile
}