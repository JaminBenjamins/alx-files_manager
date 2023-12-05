import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;


class DBClient {
    constructor() {
        this.client = new MongoClient(url, { useUnifiedTopology: true, userNewUrlParser: true});
        this.client.connect().then(() => { 
            this.db = this.client.db(`${database}`);
        }).catch((err) => {
        console.log(err);
        })
    }

    isAlive() {
        try {
            return this.client.isConnected();
        } catch (error) {
            return console.error('Error checking database connection:', error);
        }
    }

    async nbUser() {
        try {
            const user = this.db.collection('users');
            const count = await user.countDocuments();
            return count;
        } catch (error) {
            return console.error('Error counting users:', error);

        }
    }
    
    const DbClient = new DBClient();
    module.exports = DbClient;
}