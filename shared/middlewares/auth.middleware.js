export const requireAuth = (options = {}) => {
  return (req, res, next) => {
    if (!req.session?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (options.role && req.session.user.role !== options.role) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = req.session.user;
    next();
  };
};
