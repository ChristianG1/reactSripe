import { loadStripe } from '@stripe/stripe-js'; //cargar la plataforma de stripe
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

import "bootswatch/dist/lux/bootstrap.min.css";

//clave publica para el cliente 
//clave secreta para el back
const stripePromise = loadStripe('pk_test_51KyjEXFLJwBb87naDskHjWhOWBlqaYBn09WtsLXAVe4p4ps6a8SbWVBPH5hVyRcjdTV0eBDUyrkgusL5KN8bOiyU00SiGq6SWa');


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card', 
      card: elements.getElement(CardElement)
    })

    if(!error) {
      const { id } = paymentMethod;
    
     await axios.post('http://localhost:3001/api/checkout', {
        id,
        amount: 10000
      })

      elements.getElement(CardElement).clear();
    }
  }

  return (
    <form onSubmit={handleSubmit} className='card card-body'>
      <img 
        src='https://www.corsair.com/corsairmedia/sys_master/productcontent/k68-spill-resistant-keyboard-Content-2.png' 
        alt='keyboard' 
        className='img-fluid'/>
      <h3 className='mt-2'>Price: $100</h3>
      <div className='form-group'>
        <CardElement className='form-control' />
      </div>

      <button className='btn btn-success mt-3'>Buy</button>
    </form>
  )
}


function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className='container p-4'>
        <div className='row'>
          <div className='col-md-4 offset-md-4'>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
