import mongoose from 'mongoose';

const { Schema } = mongoose;

const schemaContent = {
    name:{
        type:String,
        default:''
    },
    details:{
        type:String,
        default:''
    },
    description:{
        type:String,
        default:''
    },
    cost:{
        type:Number,
        default:0
    },
}
var ServicesSchema = new Schema(schemaContent);
export const services = mongoose.model('AvailableServices',ServicesSchema)