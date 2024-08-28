const axios = require('axios');
const blinkUrl = "https://secure.blinkpayment.co.uk/api/pay/v1";
const createToken = (api_key, secret_key) =>{
return axios.post(`${blinkUrl}/tokens`,  {
    api_key,
    secret_key,
    application_name: "Node Test",
    source_site: "Shalom-test",
    payment_api_status: true,
    send_blink_receipt: true,
    address_postcode_required: true,
    enable_moto_payments: true
   }
   ).then(({data})=>{
    return  data;
   })
   .catch((err) => err)
}

const getTransaction = (transaction_id, access_token)=>{
    return axios
        .get(`${blinkUrl}/transactions/${transaction_id}`, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })
        .then((response) => {
            const { data } = response.data;
          return data
        })
        .catch((error) => console.error(error));
}
const fs = require("fs");
require('dotenv').config();
const api_key = process.env.API_KEY;
const secret_key = process.env.SECRET_KEY;
const doItAll = (transaction_id)=>{
    createToken(api_key, secret_key)
    .then((token)=>{
        const {access_token} = token;
        return getTransaction(transaction_id, access_token)
    }).then((transaction)=>{

        const jsonObj = JSON.parse(fs.readFileSync("./storage/support_users.json", "utf-8")).users;
        const names = jsonObj.map((person)=>person.name)
        if(names.indexOf(transaction.customer_name) >= 0) {
            jsonObj[names.indexOf(transaction.customer_name)].MOTO = true;
            const objToWrite = JSON.stringify({users: jsonObj});
            fs.writeFileSync("./storage/support_users.json", objToWrite)
        }
        return transaction;
    }).catch((err)=>{console.log(err)})
}
const handlePaylinkWebhook = (paylinkRes)=>{
    const jsonObj = JSON.parse(fs.readFileSync("./storage/support_users.json", "utf-8")).users;
    const names = jsonObj.map((person)=>person.name)
    console.log(names)
    if(names.indexOf(paylinkRes.name) >= 0) {
        jsonObj[names.indexOf(paylinkRes.name)].paylink = true;
        const objToWrite = JSON.stringify({users: jsonObj});
        fs.writeFileSync("./storage/support_users.json", objToWrite)
    }
    return paylinkRes;
}
module.exports = {doItAll, handlePaylinkWebhook}