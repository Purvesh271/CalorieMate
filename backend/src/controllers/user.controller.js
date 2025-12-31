import httpStatus from 'http-status';
import { User } from '../models/user.model.js'; 
import bcrypt, { hash } from 'bcrypt';
import crypto from 'crypto';


// User Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: 'User not found'
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
          return res.status(httpStatus.UNAUTHORIZED).json({
            status: httpStatus.UNAUTHORIZED,
            message: "Invalid email or password",
          });
        }
        if (isPasswordValid) { 
            let token = crypto.randomBytes(20).toString('hex');
            user.token = token;

            await user.save();
            
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: 'Login successful',
                token: token
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Error logging in',
            error: error.message
        });
    }
};


// Register User
const register = async (req, res) => {
  const { name, email, password, currentWeight, targetWeight } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({
        status: httpStatus.CONFLICT,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      currentWeight,
      targetWeight,
    });

    await newUser.save();

    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Error registering user",
      error: error.message,
    });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Profile fetched successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        currentWeight: user.currentWeight,
        targetWeight: user.targetWeight,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const user = req.user; 
    const { name, currentWeight, targetWeight } = req.body;

    // Update allowed fields only
    if (name) user.name = name;
    if (currentWeight) user.currentWeight = currentWeight;
    if (targetWeight) user.targetWeight = targetWeight;

    await user.save();

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Profile updated successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        currentWeight: user.currentWeight,
        targetWeight: user.targetWeight,
      },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

export { login, register, getUserProfile, updateUserProfile };