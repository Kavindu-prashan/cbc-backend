import Order from '../models/order.js'
import { isCustomer } from './userController'

export async function createOrder(req,res) {
    //cbc0001

    //take the last productId

    if (!isCustomer) {
        res.json({
            message:"Login as customer to create order"
        })
    }


    try {

        const lastOrder = await Order.find().sort
        ({date:-1}).limit(1)

        let orderId
        
        if (lastOrder.lenth == 0) {
            orderId = "CBC0001"
        }else{

            const currentOrderId = lastOrder[0].orderId


            const numberString = currentOrderId.replace("CBC","")

            const number = parseInt(numberString)
    
            const newNumber = (number+1).toString().padStart(4,"0")

            orderId = "CBC" + newNumber

            const  order = new order(newOrderData)
            
            await order.save()

            res.json({
                message:"Order Created"
            })

        }
        
        const newOrderData = req.body
        newOrderData.orderId = orderId
        newOrderData.email = req.user.email
      

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}