/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Express from "express";

const router = Express.Router();

/* GET home page. */
router.get("/", function(req:Express.Request, res:Express.Response, next?:Express.NextFunction) {
  res.render("index", {uptime: "1jam"});
});

export default router;
