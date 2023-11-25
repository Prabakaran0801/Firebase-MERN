import mongoose from "mongoose";
import Users from "../models/auth.js";

export const getAllusers = async (req, res) => {
  try {
    const allUsers = await Users.find();
    const allUsersDetails = [];
    allUsers.forEach((user) => {
      allUsersDetails.push({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    });
    res.status(200).json(allUsersDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { firstName, lastName, email } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("User Unavailable...");
  }
  try {
    const updateProfile = await Users.findByIdAndUpdate(
      _id,
      { $set: { firstName: firstName, lastName: lastName, email: email } },
      { new: true }
    );
    res.status(200).json(updateProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};
