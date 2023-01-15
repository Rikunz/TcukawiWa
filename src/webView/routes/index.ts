/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Express from "express";
import {uptime, client} from "../../index.js";
const router = Express.Router();

/* GET home page. */
router.get("/", function(req:Express.Request, res:Express.Response, next?:Express.NextFunction) {
  const uptimes = new Date(Date.now() - (uptime.getTime()));
  const days = uptimes.getUTCDate() - 1;
  const hours = uptimes.getUTCHours();
  const minutes = uptimes.getUTCMinutes();
  const seconds = uptimes.getUTCSeconds();
  const cmdList = client.commands?.size;
  res.render("index", {uptime: `uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`, commands: cmdList});
});

router.get("/confess", function(req:Express.Request, res:Express.Response, next?:Express.NextFunction) {
  res.render("confess");
});

export default router;
