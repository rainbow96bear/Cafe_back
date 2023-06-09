import { Router } from "express";
import { Session } from "express-session";
import { disconnect } from "process";

interface CustomSession extends Session {
  account: string;
  admin: boolean;
}

const router = Router();

router.get("/check/admin", (req, res) => {
  const session = req.session as CustomSession;
  session.account = String(req.query.account);
  if (
    session.account.toLowerCase() == process.env.ADMIN_ADDRESS?.toLowerCase()
  ) {
    session.admin = true;
  } else {
    session.admin = false;
  }
  res.send({ account: session.account, admin: session.admin });
});
router.get("/check/connect", (req, res) => {
  const session = req.session as CustomSession;
  if (session.account == "disconnect" || session.account == undefined) {
    res.send({ account: "disconnect", admin: false });
  } else {
    if (
      session.account.toLowerCase() == process.env.ADMIN_ADDRESS?.toLowerCase()
    ) {
      res.send({ account: session.account, admin: true });
    } else {
      res.send({ account: session.account, admin: false });
    }
  }
});
router.put("/disconnect", (req, res) => {
  const session = req.session as CustomSession;
  session.account = "disconnect";
  res.send({ account: session.account, admin: false });
});

export default router;
