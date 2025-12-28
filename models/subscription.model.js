import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema();

// all data fields for subscription

const Subscription = mongoose.model("Subscription", subscriptionSchema); // Models start with uppercase letter

export default Subscription; // allows us to create instances of Subscription
