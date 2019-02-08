const {spawn, exec} = require('child_process')
const path = require('path')

const dataFolderPath = path.join(__dirname,'data')
const lockFilePath = path.join(dataFolderPath,'mongod.lock')

exec('rm -f '+ lockFilePath, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
})

const mongod = spawn('mongod', ['--dbpath',dataFolderPath,'--storageEngine','mmapv1', '--quiet']);

mongod.stdout.on('data', (data) => {
  console.log(`${data}`);
});

mongod.stderr.on('data', (data) => {
  console.log(`${data}`);
});

mongod.on('close', (code) => {
  console.log(`mongod exited with ${code}`);
});