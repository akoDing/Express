const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
    // 先使用假数据
    /* if (username === 'xdd' && password === '123') {
            return true
        }
        return false */

    // 防止登录的sql注入
    username = escape(username)

    // 生成加密密码
    password = genPassword(password)
    password = escape(password)

    let sql = `select username, realname from users where username = ${username} and password = ${password};`
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}
