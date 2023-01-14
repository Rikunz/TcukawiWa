/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Express from "express";

const router = Express.Router();

/* GET home page. */
router.get("/ping", function(req:Express.Request, res:Express.Response, next?:Express.NextFunction) {
  res.status(200).json({
    message: "hello world",
  });
});

export default router;
