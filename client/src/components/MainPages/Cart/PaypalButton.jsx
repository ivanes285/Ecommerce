import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default function PaypalButton({totalValor,tranSuccess}) {
    
        const onSuccess =  (payment) => {
            // Congratulation, it came here means everything's fine!
            		console.log("The payment was succeeded!", payment);
            		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
                   tranSuccess(payment)
        }
 
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
         
        }
 
        let env = 'sandbox'; 
        let currency = 'USD'; 
        let total = totalValor; 
 
        const client = {
            // REVISAR ESTE LINK para obtener el ID https://developer.paypal.com/developer/accounts
            sandbox:    'AUEYRIjhDqf_IZlf014xfluehXbDxtXnVFA007MNgWIk15Wbmp9txowPT_XROtcZXgtP_ycfXyyFaTh5',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
       

        let style={
            size: 'medium',
            tagline:false,
            label: 'checkout'
        }

        return (
            <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} style={style} />
        );
    
}