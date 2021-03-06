const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true, //caixa baixa
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false //para oculta senha no banco de dados
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    createdAt: { // data de criação do usuario 
        type: Date,
        default: Date.now // pega a data de criação
    },
    addFoods: [{
        blood_glucose: [{
            value: {
                type: Number, // post
                required: true
            },
            createdAt: { // post
                type: Date,
                default: Date.now
            },
            updatedAt: { // metodo put
                type: Date,
            }
        }],
        food: [{
            name: {
                type: String,
                required: true
            },
            measure: {
                type: String,
                required: true
            },
            addGram: {
                type: Number,
                required: true
            },
            choCal: {
                type: Number,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date
            },
        }],
        totalChoFood: {
            type: Number,
            required: true
        },
        totalInsulinFood: {
            type: Number,
            required: true
        }
    }],
    born: {
        type: Date,
    },
    weight: {
        type: Number,
    },
    height: {
        type: Number,
    },
    sexo: {
        type: String
    },
    typeDm: {
        type: String
    },
    breakfastCHO: {
        type: Number
    },
    lunchCHO: {
        type: Number
    },
    afternoonSnackCHO: {
        type: Number
    },
    dinnerCHO: {
        type: Number
    },
    fc: {
        type: Number
    },
    target_glucose: {
        type: Number
    }
});

UserSchema.pre('save', async function (next) { //realizar ação antes de salvar usuário
    const hash = await bcrypt.hash(this.password, 10); //padrão para encriptar password
    this.password = hash;

    next();
});

module.exports = mongoose.model('User', UserSchema); //exportação padrão