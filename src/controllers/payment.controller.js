import mercadopago from 'mercadopago'
import {HOST, MERCADOPAGO_API_KEY} from '../config.js'

export const createOrder = async (req,res)=>{
    
    mercadopago.configure({
        access_token:MERCADOPAGO_API_KEY,

    })
    
    const result = await mercadopago.preferences.create({
        items:[
            {
                title:"laptop lenovo",
                unit_price: 500,
                currency_id:"ARS",
                quantity:1,
            }
        ],
        back_urls:{
            success:`${HOST}/success`,
            failure:`${HOST}/failure`,
            pending:`${HOST}/pending`,
        },
        notification_url:"https://250d-190-104-32-94.ngrok.io/webhook"
    });
    console.log(result);
    res.send(result.body);
};

export const reciveWebhook = async (req,res)=>{
    
   const payment = req.query
   try{

    if(payment.type === "payment"){

        const data = await mercadopago.payment.findById(payment['data.id'])
        console.log(data)
         }
    res.sendStatus(204);
   } catch (error){
    console.log(error);
    return res.sendStatus(500).json({ error: error.message})
   }

   
    res.send('webhook');
};