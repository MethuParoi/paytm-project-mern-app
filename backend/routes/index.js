const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

// const app = express();
// app.use(
//   cors({
//     origin: ["#"],
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
