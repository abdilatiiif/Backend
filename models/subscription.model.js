import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: [2, "Subscription name must be at least 2 characters long"],
      maxLength: [100, "Subscription name must be at most 100 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be a positive number"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      trim: true,
      uppercase: true,
      enum: ["USD", "EUR", "GBP", "NOK"], // Add  more as needed
      default: "USD",
    },
    frequency: {
      type: String,
      required: [true, "Subscription frequency is required"],
      trim: true,
      enum: ["daily", "weekly", "monthly", "yearly"], // Add more as needed
      default: "monthly",
    },
    category: {
      type: String,
      enum: [
        "entertainment",
        "productivity",
        "education",
        "health",
        "other",
        "sports",
        "news",
        "music",
        "gaming",
      ],
      required: [true, "Subscription category is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
      enum: ["credit_card", "debit_card", "paypal", "bank_transfer", "other"],
    },
    status: {
      type: String,
      enum: ["active", "expired", "canceled", "paused"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Subscription start date is required"],
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value >= this.startDate;
        },
        message: "Renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // user reference from User model
      ref: "User",
      required: [true, "Associated user is required"],
      index: true,
    },
  },
  { timestamps: true }
);

// auto calculate renewalDate before saving, and if missing
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // auto update the status if renewalDate has passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  //proceed to save document in database
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema); // Models start with uppercase letter

export default Subscription; // allows us to create instances of Subscription
