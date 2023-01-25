import {Schema,model} from 'mongoose';

const UserSchema = new Schema({
    username : { type : String, required : true, unique : true},
    name : {
        first : { type : String, required : true},
        last : { type : String, required : true}
    },
    age : Number,
    email : String
}, { timestamps : true }
);

const User = model("user", UserSchema);
export {User};