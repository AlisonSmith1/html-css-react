const router = require("express").Router();
const Commodity = require("../models").commodity;
const commodityValidation = require("../validation").commodityValidation;

router.use((req, res, next) => {
  console.log("正在接收一個跟commodity有關的請求");
  next();
});

// 取得全部商品
router.get("/", async (req, res) => {
  try {
    const commodityFound = await Commodity.find({})
      .populate("business", ["username", "email"])
      .exec();
    return res.send(commodityFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 新增商品
router.post("/", async (req, res) => {
  const { error } = commodityValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.isCustomer()) {
    return res.status(400).send("客戶無法新增商品");
  }

  const { title, description, price } = req.body;
  try {
    const newCommodity = new Commodity({
      title,
      description,
      price,
      business: req.user._id,
    });
    const savedCommodity = await newCommodity.save();
    return res.send({ message: "新商品已經保存", savedCommodity });
  } catch (e) {
    return res.status(500).send("無法創建商品");
  }
});

// 用商家id搜尋商品
router.get("/business/:businessId", async (req, res) => {
  const { businessId } = req.params;
  try {
    const commodityFound = await Commodity.find({ business: businessId })
      .populate("business", ["username", "email"])
      .exec();
    return res.send(commodityFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 用買家id搜尋購買商品
router.get("/customers/:customerId", async (req, res) => {
  const { customerId } = req.params;
  try {
    const commodityFound = await Commodity.find({ customers: customerId })
      .populate("business", ["username", "email"])
      .exec();
    return res.send(commodityFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 用商品名稱尋找商品
router.get("/findByName/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const commodityFound = await Commodity.find({ title: name })
      .populate("business", ["email", "username"])
      .exec();
    return res.send(commodityFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 買家透過商品id註冊新商品
router.post("/enroll/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const commodity = await Commodity.findOne({ _id: id }).exec();
    if (!commodity) return res.status(404).send("商品不存在");
    commodity.customers.push(req.user._id);
    await commodity.save();
    return res.send("註冊完成");
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 用商品id搜尋商品（多餘路由，可合併到最後一個/:id，視需求可刪除）
router.get("/commodity/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const found = await Commodity.findById(id).populate("business", [
      "username",
      "email",
    ]);
    if (!found) return res.status(404).send("找不到商品");
    return res.send(found);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 更新商品
router.patch("/update/:id", async (req, res) => {
  const { error } = commodityValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { id } = req.params;
  try {
    const commodityFound = await Commodity.findOne({ _id: id }).exec();
    if (!commodityFound) {
      return res.status(404).send("商品不存在");
    }

    if (commodityFound.business.equals(req.user._id)) {
      const updateCommodity = await Commodity.findOneAndUpdate(
        { _id: id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      return res.send({ message: "商品已經更新", updateCommodity });
    } else {
      return res.status(403).send("只有此商家才可以編輯商品");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 刪除商品
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const commodityFound = await Commodity.findOne({ _id: id }).exec();
    if (!commodityFound) {
      return res.status(404).send("商品不存在");
    }

    if (commodityFound.business.equals(req.user._id)) {
      await Commodity.deleteOne({ _id: id }).exec();
      return res.send("商品已經刪除");
    } else {
      return res.status(403).send("只有此商家才可以刪除商品");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 用商品id搜尋商品 - 一定要放最下面，避免覆蓋其他路由
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const commodityFound = await Commodity.findOne({ _id: id })
      .populate("business", ["email"])
      .exec();
    if (!commodityFound) return res.status(404).send("商品不存在");
    return res.send(commodityFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
