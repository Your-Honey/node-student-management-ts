import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/genrateToken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (password === user.password) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(String(user._id)),
      });
    }
  } else {
    res.status(400);
    throw new Error('Wrong email or password');
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = new Date(Date.now() + 3600000); // Token expires in 1 hour
  await user.save();

  // Send email
  // const transporter = nodemailer.createTransport({
  //   service: 'Gmail',
  //   auth: { user: 'garvitsharma@thoughtwin.com', pass: '' },
  // });

  // const mailOptions = {
  //   to: user.email,
  //   from: 'garvitsharma@thoughtwin.com',
  //   subject: 'Password Reset Request',
  //   text: `Click on the link to reset your password: http://localhost:3000/reset/${resetToken}`,
  // };

  // await transporter.sendMail(mailOptions);

  res.json({ message: 'Password reset link sent to email' });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired token');
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.json({ message: 'Password reset successful' });
});

export { authUser, forgotPassword, resetPassword };
