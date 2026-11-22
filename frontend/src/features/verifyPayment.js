import api from "../../utils/axios";

export const verifyPayment = async (payload) => {
    try{
        console.log("Verifying Payment...");
        const {data} = await api.post("/api/billing/verify",payload);
        console.log("Payment Verified: ",data)
        return data;
    }
    catch(error){
        console.log(error);
        return [];
    }
}