const {spawn, exec} = require('child_process')

exec('rm -f data/mongod.lock', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
})

const mongod = spawn('mongod', ['--dbpath','data','--storageEngine','mmapv1', '--quiet']);

mongod.stdout.on('data', (data) => {
  console.log(`${data}`);
});

mongod.stderr.on('data', (data) => {
  console.log(`${data}`);
});

mongod.on('close', (code) => {
  console.log(`mongod exited with ${code}`);
});