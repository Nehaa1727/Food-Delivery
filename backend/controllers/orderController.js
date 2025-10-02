import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//config variables
const currency = "inr";
const deliveryCharge = 50;
const frontend_URL = 'https://food-delivery-frontend-a3d7.onrender.com';

// Placing User Order for Frontend using stripe
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100 
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: "Delivery Charge" },
        unit_amount: deliveryCharge * 100
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${frontend_URL}/verify?success=true&userId=${userId}&items=${encodeURIComponent(JSON.stringify(items))}&amount=${amount}&address=${encodeURIComponent(JSON.stringify(address))}`,
      cancel_url: `${frontend_URL}/verify?success=false`
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("Stripe Order Error:", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};


const verifyOrder = async (req, res) => {
  const { success, userId, items, amount, address } = req.body;

  try {
    if (success === "true") {
      const newOrder = new orderModel({
        userId,
        items,
        amount,
        address,
        status: "Food Processing",
        payment: true,
        paymentMethod: "Stripe",
        paymentStatus: "Paid"
      });

      await newOrder.save();
      res.json({ success: true, message: "Payment successful, order created" });

    } else {
      res.json({ success: false, message: "Payment failed, order not created" });
    }

  } catch (error) {
    console.error("Verify Order Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


//user orders for frontend
const userOrders = async (req,res) => {
    try {
        const  orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"ERROR"})
    }
}


//Listing orders for admin panel
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})       
    }
}

//api for update order status
const updateStatus = async (req, res) => {
    console.log(req.body);
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}


// Cash on Delivery (COD) Order
const placeOrderCod = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      status: "Food Processing",
      payment: false,    
      paymentMethod: "COD",      
      paymentStatus: "Pending"    
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, message: "COD Order placed successfully" });
  } catch (error) {
    console.error("COD Order Error:", error);
    res.json({ success: false, message: "Error placing COD order" });
  }
};




export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus, placeOrderCod}


