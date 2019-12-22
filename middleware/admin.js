// 401 Unauthorized - supplied token is not a valid, so try again
// 403 Forbidden - like forbidden for normal users only admin can access

function admin(req, res, next){
    if(!req.user.isAdmin) return res.status(403).send('Access denied.');
    next();
}

module.exports = admin;