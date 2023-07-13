import getConfig from 'next/config';
import mongoose from 'mongoose';

const { serverRuntimeConfig } = getConfig();
const Schema = mongoose.Schema;



mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
mongoose.Promise = global.Promise;
let playerSchema;
let teamSchema;

export const db = {
    User: userModel(),
    // team: teamModel(),
    // player: playerModel()
};

// mongoose models with schema definitions


function userModel() {

    
    playerSchema = new Schema({
        name:  { type: String},
        score: { type: Number},
        photo: { type: String},
        id: { type: Number }
    });

    teamSchema = new Schema({
        name: String,
        players: {type: [playerSchema]},
        totalScore: { type: Number  },
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
