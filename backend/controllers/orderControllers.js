import asyncHandler from '../middleware/asyncHandler.js'; // Middleware to handle async errors
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   Post /api/order
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        try {
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        } catch (error) {
            console.error('Error saving order:', error.message);
            res.status(500);
            throw new Error('Failed to save the order');
        }
    }
});

// @desc    Get logged in user orders
// @route   Get /api/order/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   Get /api/order/:id
// @access  Private
const getOrdersById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.status(200).json(order);
    }
    else{
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order to paid
// @route   Put /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }
    else{
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order to delivered
// @route   Put /api/order/:id/deliver
// @access  Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updateOrder = await order.save();

        res.status(200).json(updateOrder);
    }
    else{
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get all orders
// @route   Get /api/order
// @access  Private/admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders);
});

export {
    addOrderItems,
    getMyOrders,
    getOrdersById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}


