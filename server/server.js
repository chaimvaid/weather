const app = require('./app')
const db = require('./models')
const port = process.env.PORT;



const ConnectAndTesDB = async () =>{
    
    try {
        await db.sequelize.authenticate();
        console.log('Database postgres connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


ConnectAndTesDB();


app.listen(port, () => {
    console.log(`projects microservice listening on port ${port}`)
})


