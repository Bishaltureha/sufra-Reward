// ✅ Fake OTP + Notifications Backend (Node + Express)
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
const SECRET = "supersecretkey123";
const FIXED_OTP = "1234"; // For testing
const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

// 🧩 In-memory data stores
let users = [
  {
    id: 101,
    mobile: "+966512345678",
    email: "user@example.com",
    tier: "Star",
    points: 120,
  },
];

let otpStore = {}; // { "+966512345678": { otp: "1234", expiresAt: 173654234 } }

let notifications = [
  {
    id: 1,
    userId: 101,
    title: "Your order is on the way!",
    message: "Estimated delivery time: 30 mins",
    timestamp: "2025-09-25T12:30:00Z",
    read: false,
  },
  {
    id: 2,
    userId: 101,
    title: "Order delivered",
    message: "Thank you for ordering with Sufra!",
    timestamp: "2025-09-25T13:15:00Z",
    read: true,
  },
  {
    id: 3,
    userId: 102,
    title: "Welcome to Sufra!",
    message: "Your registration was successful.",
    timestamp: "2025-09-25T10:00:00Z",
    read: false,
  },
];

// ======================================================
// 🟢 STEP 1: Request OTP
// ======================================================
app.post("/api/auth/request-otp", (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  const expiresAt = Date.now() + OTP_EXPIRY_MS;
  otpStore[mobile] = { otp: FIXED_OTP, expiresAt };

  console.log(`📱 OTP ${FIXED_OTP} sent to ${mobile} (valid for 5 mins)`);

  return res.json({
    message: "OTP sent to mobile",
    status: "pending",
    expiresIn: "5 minutes",
  });
});

// ======================================================
// 🟢 STEP 2: Verify OTP
// ======================================================
app.post("/api/auth/verify-otp", (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({ message: "Mobile and OTP are required" });
  }

  const record = otpStore[mobile];
  if (!record) {
    return res
      .status(400)
      .json({ message: "No OTP found. Please request again." });
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[mobile];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (otp !== record.otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[mobile];

  let user = users.find((u) => u.mobile === mobile);

  if (!user) {
    const newUser = {
      id: users.length + 1,
      mobile,
      email: null,
      tier: "Star",
      points: 0,
    };
    users.push(newUser);

    const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: "1h" });

    return res.json({
      message: "User registered and logged in",
      status: "new_user",
      token,
      user: newUser,
    });
  } else {
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });

    return res.json({
      message: "Login successful",
      status: "existing_user",
      token,
      user,
    });
  }
});

// ======================================================
// 🟢 STEP 3: Notifications (JWT required)
// ======================================================
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

app.get("/api/notifications", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const userNotifications = notifications.filter((n) => n.userId === userId);
  res.json(userNotifications);
});

// ======================================================
// ✅ Start the Server
// ======================================================
app.listen(PORT, () => {
  console.log(`🔥 Fake OTP + Notifications API running on port ${PORT}`);
});
