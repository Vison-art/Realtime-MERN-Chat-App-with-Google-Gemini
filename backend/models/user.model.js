import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowecase: true,
        minLength: [ 6, 'Email must be at lealst 6 characters long' ],
        maxLength: [ 50, 'Email must be at most 50 characters long' ]
    },
    password: {
        type: String,
        select: false,
    }
});

userSchema.static.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.method.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.method.generateJWT = function () {
    return jwt.sign({
        email: this.email,
    },
    process.env.JWT_SECRET,
    )
}

const User = mongoose.model('User', userSchema);

export default User;