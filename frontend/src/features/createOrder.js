import api from "../../utils/axios";

export const createOrder = async (plan) => {
    try{
        console.log("Creating new Order...");
        const {data} = await api.post("/api/billing/order",{plan});
        console.log("Order crreated: ",data)
        return data;
    }
    catch(error){
        console.log(error);
        return [];
    }
}