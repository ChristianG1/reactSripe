const express = require('express');
const Stripe = require('stripe'); 
const cors = require('cors'); 

const app = express();

const stripe = new Stripe('sk_test_51KyjEXFLJwBb87nafAVEHfC7xfNigt65ziOl84WCkNQpshUjaMAymoZbIxC17Nlcb0KSQs6EvDBHohR8V78gFNjz00sMJQ7PIF');

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json());

app.post('/api/checkout', async (req, res) => {
	try {
		const { id, amount } = req.body;
	
		const payment = await stripe.paymentIntents.create({
			amount, 
			currency: "USD", 
			description: "Gaming Keyboard",
			payment_method: id,
			confirm: true
		})
	
		console.log(payment);
		
		res.send({ message: 'Successfull payment' });
	} catch(err) {
		console.log(err)
	}
	
})

app.listen(3001, () => {
	console.log('Server on port', 3001)
});

