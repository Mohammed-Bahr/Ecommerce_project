import mongoose , {Schema} from "mongoose";

const IOrderItem =new Schema({
    productTitle : {type: String , required:true },
    productImage: {type:String , required:true , default:1},
    unitPrice:{type:Number , required:true},
    quantity: {type:Number , required: true , default:1},
});


const IOrder = new Schema ({
    orderItems:[IOrderItem],
    total:{type:Number , required:true},
    address:{type:String,  required:true},
    userID:{type:Schema.Types.ObjectId , ref:"User" ,required:true},
})


const orderModel = mongoose.model("order" ,IOrder);
export default orderModel;