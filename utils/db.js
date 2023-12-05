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
            console.error('Error checking database connection:', error);
            return false;
        }
    }

    async nbUser() {
        try {
            const user = this.db.collection('users');
            const count = await user.countDocuments();
            return count;
        } catch (error) {
            console.error('Error counting users:', error);
            return -1;

        }
    }

    async nbFiles() {
        const files = this.db.collection('files');
        const numfiles = await files.countDocuments();
        return numfiles;
    } catch(error) {
        console.error('Error counting files:', error);
        return -1;
    }


    
    const dbClient = new DBClient();
    module.exports = dbClient;
}