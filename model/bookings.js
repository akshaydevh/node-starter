import mongoose, { SchemaType } from 'mongoose';

const { Schema } = mongoose;

const schemaContent = {
    serviceId:{
        type:Schema.Types.ObjectId,
        ref:'services'
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        default:'pending',
        values:['pending','active','payment']
    },
    paymentStatus:{
        type:Boolean,
        default:false
    },
    availableDates:[{
        from:{
            type:Date,
            default:null
        },
        to:{
            type:Date,
            default:null
        }
    }],
    scheduledDate:{
        type:Date,
        default:null
    },
    bookedAddress:{
        type:String,
        default:''
    },
    generatedInvoice:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
}
var bookingSchema = new Schema(schemaContent);
export const bookings = mongoose.model('bookings',bookingSchema)