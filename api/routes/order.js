const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("order has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ORDER
router.get("/findOrder/:orderId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.findById(req.params.orderId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  // const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  // const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  // const monthBefore = new Date(
  //   new Date().setMonth(previousMonth.getMonth() - 1)
  // );
  // const thirdMonth = new Date(new Date().setMonth(monthBefore.getMonth() - 1));
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const previousYear = new Date(
    new Date().setFullYear(lastYear.getFullYear() - 1)
  );

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: lastYear,
            $gte: previousYear,
          },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },

      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET MONTHLY INCOME
router.get("/incomePerYear", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  // const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  // const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  // const monthBefore = new Date(
  //   new Date().setMonth(previousMonth.getMonth() - 1)
  // );
  // const thirdMonth = new Date(new Date().setMonth(monthBefore.getMonth() - 1));
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const previousYear = new Date(
    new Date().setFullYear(lastYear.getFullYear() - 1)
  );

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: lastYear,
            $gte: previousYear,
          },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },

      {
        $project: {
          year: { $year: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$year",
          total: { $sum: "$sales" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
