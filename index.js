const fs = require('fs');
const readline = require('readline');
const mongoose = require('mongoose');


const connectDB = async (MONGO_URI) => {
    try {

        await mongoose.connect(MONGO_URI);
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
                try {
                        await Model.insertMany(medicines);
                        console.log('completado');
                }catch(err){
                        console.log('error');
                        console.log(err);
                }
                
        })
}

module.exports = {
        insertMedicine,
        connectDB
}