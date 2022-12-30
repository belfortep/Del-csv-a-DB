const fs = require('fs');
const readline = require('readline');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB CONNECTED');
        return;

    } catch (err) {
        console.log(err);
        return;
    }
}



const insertMedicine = async (Model) => {
        const file = readline.createInterface(fs.createReadStream('data.csv'));

        const medicines = [];

        file.on("line", async (line) => {
                let [name, expiredDate, freeSale, quantity] = line.split(',');
                quantity = parseInt(quantity);
                freeSale = (freeSale === 'true');
                medicines.push({ name, expiredDate, freeSale, quantity });
        })

        file.on("close", async () => {
                await Model.insertMany(medicines);
                console.log('completado');
        })
}

module.exports = {
        insertMedicine,
        connectDB
}