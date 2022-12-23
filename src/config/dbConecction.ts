const mongoose = require('mongoose');

require('dotenv').config({path:'.env'});

export const dbConnect =async () => {
    try {
        
        await mongoose.connect(process.env.MONGODB,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`database connected`);
    } catch ( error ) {

        console.error('No connected');
        console.error(error);
        process.exit(1);
        
        
    }
}