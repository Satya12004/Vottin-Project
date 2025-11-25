function checkAdmin(req, res, next) {
 
  if (!req.user) {
    return res.status(400).json({ message: "Not authenticated" });
  }
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "only abmin have access to send message" });
  }
  next();
}
module.exports=checkAdmin