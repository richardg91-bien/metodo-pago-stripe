const express = require  ('express');
const Stripe = require ('stripe');
const cors = require ('cors');

const app = express();
app.use(cors({origin: 'http://localhost:3000'}));

app.use(express.json())

const stripe = new Stripe("")

app.post("/api/checkout", async (req, res) => {

    const { id, amount } = req.body;
    try {   

    const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Notebook",
        payment_method: id,
        confirm: true
    });

    console.log(payment);
    res.send({message: 'successfull payment'})
} catch(error) {
    console.log(error);
    res.json({message: error});
}
  

});

app.listen(3001, () => {
    console.log('server on port', 3001);
});