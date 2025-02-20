require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 1️⃣ CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// 2️⃣ CREATE USER SCHEMA & MODEL
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});
const User = mongoose.model("User", UserSchema);

// 3️⃣ REGISTER USER
app.post("/users/register", async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.json({ success: true, message: "User registered successfully!" });
});

// 4️⃣ LOGIN USER
app.post("/users/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ username: user.username }, "secretKey", { expiresIn: "1d" });
    res.json({ success: true, access_token: token });
});

// 5️⃣ START SERVER
app.listen(8000, () => {
    console.log("🚀 Server running on http://localhost:8000");
});
