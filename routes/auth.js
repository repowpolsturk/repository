const RefreshToken = require('../models/RefreshToken');
router.post('/otp/verify', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');
    const isMatch = user.compareOtp(otp);
    if (!isMatch) return res.status(400).send('Invalid OTP');
    user.otp = null;
    await user.save();
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    const refreshTokenDoc = new RefreshToken({
      token: refreshToken,
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    await refreshTokenDoc.save();
    res.send({ accessToken, refreshToken });
  } catch (error) {
    res.status(400).send(error.message);
  }
});