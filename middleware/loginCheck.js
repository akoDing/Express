const { SuccessModel, ErrorModel } = require('../model/resModel')

// **检测邓丽中间件**
module.exports = (req, res, next) => {
    if (req.session.username) {
        next()
        return
    }
    res.json(
        new ErrorModel('登录失败！!')
    )
}