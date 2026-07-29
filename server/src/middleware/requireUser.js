export function requireUser(req, res, next) {
  const userId = req.header('x-user-id');
  if (!userId) return res.status(401).json({ message: 'Authentication is required.' });
  req.userId = userId;
  return next();
}
