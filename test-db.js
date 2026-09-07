const mongoose = require('mongoose');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const line = env.split('\n').find(line => line.startsWith('MONGODB_URI='));
const uri = line.substring('MONGODB_URI='.length).trim();

mongoose.connect(uri, { family: 4 })
  .then(() => { 
    console.log('CONNECTED SUCCESSFULLY!'); 
    process.exit(0); 
  })
  .catch(e => { 
    console.error('CONNECTION ERROR:', e.message); 
    process.exit(1); 
  });
