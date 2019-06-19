var express = require('express');
var router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function (req, res, next) {
    const { username, password } = req.body
    // const { username, password } = req.query
    const result = login(username, password)
    return result.then(data => {
        if (data.username) {
            // 操作cookie
            // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
            // 设置Session
            req.session.username = data.username
            req.session.realname = data.realname
            // 同步到redis
            // set(req.sessionId, req.session)
            // console.log('req session is', req.sessionId)
            // console.log('req session is', req.session)

            res.json(
                new SuccessModel(data)
            )
            return
        }
        res.json(
            new ErrorModel('登录失败！')
        )
    })
});

/* router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json({
            errno: 0,
            msg: 'ok'
        })
        return
    }
    res.json({
        errno: -1,
        msg: 'not ok'
    })
}) */

/* router.get('/session-test', (req, res, next) => {
    const session = req.session
    if (session.viewNum == null) {
        session.viewNum = 0
    }
    session.viewNum++
    res.json({
        viewNum: session.viewNum
    })
}) */

module.exports = router;
