import asyncHandler from '../middleware/asyncHandler.js'; // Middleware to handle async errors
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js"; // Function to generate JWT token

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isProfileComplete: user.fullProfile !== null,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }

});

// @desc    Register User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
  else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get my user profile
// @route   GET /api/users/myprofile
// @access  Private
const getMyUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

    if(user){
        res.status(200).json({
          _id: user._id,
          fullProfile: user.fullProfile,
          membership: user.membership,
        })
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});


// @desc    Get user profile - only First Name, Last Name, Age, Occpation, Father Gotra, Mother Gotra
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const pageSize = 9;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? {frstName: {$regex: req.query.keyword, $options: 'i'}} : {};


  const count = await User.countDocuments({...keyword});
  const users = await User.find({...keyword}, {
    _id: 1,
    'fullProfile.firstame': 1,
    'fullProfile.lastName': 1,
    'fullProfile.dateOfBirth': 1,
    'fullProfile.occupation': 1, 
    'fullProfile.fatherGotra': 1,
    'fullProfile.motherGotra': 1
  })
  .limit(pageSize)
  .skip(pageSize * (page-1));
  res.status(200).json({users, page, pages: Math.ceil(count/pageSize)});
});

// @desc    Get my user profile
// @route   GET /api/users/myprofile
// @access  Private
const getFullUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

    if(user){
        res.status(200).json({
          _id: user._id,
          email: user.email,
          fullProfile: user.fullProfile,
        })
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  }
  else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
  });

// @desc    Get users by ID
// @route   GET /api/users/:id
// @access  Private/admin
const getUsersByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if(user){
    res.status(200).json(user);
  }  
  else{
    res.status(404);
    throw new Error('User not found');
  }
});
  
  // @desc    Delete Users
  // @route   DELETE /api/users/:id
  // @access  Private/admin
  const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
      if(user.isAdmin){
        res.status(400);
        throw new Error('Cannot delete admin user');
      }
      await User.deleteOne({_id:user._id});
      res.status(200).json({message: 'User deleted successfully'});
    }
    else{
      res.status(404);
      throw new Error('User not found');
    }
  });

  // @desc    Update Users
  // @route   PUT /api/users/:id
  // @access  Private/admin
  const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin
      })
    }
    else{
      res.status(404);
      throw new Error('User not found');
    }
  });

  export{
    authUser,
    registerUser,
    logoutUser,
    getMyUserProfile,
    getUserProfile,
    getFullUserProfile,
    updateUserProfile,
    getUsers,
    getUsersByID,
    deleteUser,
    updateUser
  }