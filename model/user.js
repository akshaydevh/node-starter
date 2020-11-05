import mongoose from 'mongoose';

const { Schema } = mongoose;

const schemaContent = {
    username:{
        type:String,
        default:''
    },
    firstName:{
        type:String,
        default:''
    },
    lastName:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    address:{
        type:String,
        default:''
    },
    numberOfDealings:{
        type:Number,
        default:0
    },
    registeredDate:{
        type:Date,
        default:Date.now
    }
}
var userSchema = new Schema(schemaContent);
export const users = mongoose.model('Users',userSchema)
export const castUserId = ( userId ) => mongoose.Types.ObjectId( userId )