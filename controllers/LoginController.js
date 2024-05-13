const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postLoginData = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
       
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (isPasswordValid) {
            // Generate JWT token
            const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, "your_secret_key", { expiresIn: '1h' });
            // Redirect based on user role
            res.cookie('jwt', token, { httpOnly: true });
            if (user.role === 'buyer') {
                return res.redirect('/buyer-dashboard');
            } else if (user.role === 'seller') {
                return res.redirect('/seller-dashboard');
            }
        } 
        
        // If password is invalid
        return res.status(401).json({ message: "Invalid email or password" });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

module.exports = { postLoginData };
