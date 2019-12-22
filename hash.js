const bcryptjs = require('bcryptjs');
// bcryptjs is pure JS and it also works electron, webkit, etc

async function run(){
    const salt = await bcryptjs.genSalt(10);
    const hashed = await bcryptjs.hash('12345', salt);
    console.log(salt);
    console.log(hashed);
}

run();