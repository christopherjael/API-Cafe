
const isAdmin = (req, res, next) => {


    if (!req.user) {
        return res.status(500).json({
            message: 'Token is not authorized in user'
        });
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            message: 'User is not authorized to do this action'
        })
    }

    next();
}

const isRole = (...roles) => {

    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                message: 'Token is not authorized in user'
            });
        };

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                message: 'User is not authorized to do this action',
                rolesValid: roles
            })
        }
        next();
    }
}
module.exports = { isAdmin, isRole }