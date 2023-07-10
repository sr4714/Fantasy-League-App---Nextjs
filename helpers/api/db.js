import getConfig from 'next/config';
import mongoose from 'mongoose';

const { serverRuntimeConfig } = getConfig();
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://sr4714:SPC3QrcsFqRm7Ixj@cluster0.nusarp2.mongodb.net/?retryWrites=true&w=majority"||process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
mongoose.Promise = global.Promise;
let playerSchema;
let teamSchema;

export const db = {
    User: userModel(),
    // team: teamModel(),
    // player: playerModel()
};

// mongoose models with schema definitions

function playerModel(){

    playerSchema = new Schema({
        name:  { type: String},
       
    });
   // return mongoose.models.player || mongoose.model('player', playerSchema);
}
function teamModel(){
    teamSchema = new Schema({
        name: String,
        players: {type: [playerSchema]}
    });
    //return mongoose.models.team || mongoose.model('team', teamSchema);

}
function userModel() {

    
    playerSchema = new Schema({
        name:  { type: String},
       
    });

    teamSchema = new Schema({
        name: String,
        players: {type: [playerSchema]}
    });
   
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        teams: [teamSchema],
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}
