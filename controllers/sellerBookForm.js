const BookFormModel = require("../models/bookForm");
const User = require("../models/user");

const BookForm = async (req, res) => {
    try {
        // Ensure the user is authenticated and the user ID is available
        const userIdFromToken = req.user && req.user.userId; // Assuming the JWT payload has userId

        if (!userIdFromToken) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Find the user in the database based on the user ID
        const user = await User.findById(userIdFromToken);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { bookName, price, category } = req.body;

        // Check if a file was uploaded
        let image = null;
        if (req.file) {
            image = req.file.path; // Get the file path from multer
        }

        // Create a new book form entry
        const newBookForm = new BookFormModel({
            userId: userIdFromToken,
            bookName,
            price,
            image, // Use the file path obtained from multer
            category
        });

        await newBookForm.save();
        res.status(201).json({ message: 'Book form created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { BookForm };
