import mongo from './mongo'
import server from './server'

mongo.connect();

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});
