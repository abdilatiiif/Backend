import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    // Logic to create a subscription
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    }); // who is creating the subscription

    // if user is authorized, respond with 201 status and subscription data
    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error(
        "you are not authorized to view these subscriptions"
      );
      error.status = 403;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};
