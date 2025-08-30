import cartModel from "../Models/cartModel.js";

const CreateCartForUser = {
    userID : String,
};
const createCartForUser = async ({userID}) => {
    try {
        const cart = await cartModel.create({
            userId: userID,
            items: [],
            totalAmount: 0,
            status: "active"
        });
        await cart.save();
        return cart;
    } catch (error) {
        console.error("Error creating cart:", error);
        throw error;
    }
} 



const activeCard = {
    userID:String,
}
export const getActiveCardForUser = async ({userID}) => {
    try {
        let cart = await cartModel.findOne({userId: userID, status: "active"});
        
        if(!cart){
            cart = await createCartForUser({userID});
        }
        
        return cart;
    } catch (error) {
        console.error("Error getting active cart:", error);
        throw error;
    }
}
