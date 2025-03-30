import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    githubId: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    postgresConfig: {
        host: {
            type: String,
            required: true,
        },
        port: {
            type: Number,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        database: {
            type: String,
            required: true,
        },
    },
    indexingCategories: {
        type: [String],
        default: [],
    },
    isValid: {
        type: Boolean,
        default: false,
    },
    lastChecked: {
        type: Date,
        default: null,
    },
}, { timestamps: true });



export const User = mongoose.model("User", userSchema);
