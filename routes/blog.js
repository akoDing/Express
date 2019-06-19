var express = require('express');
var router = express.Router();
const loginCheck = require('../middleware/loginCheck')

const {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 获取博客列表
router.get('/list', function (req, res, next) {
    // const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // 配置管理员权限
    let author = ''
    if (req.session.username === 'admin') {
        author = ''
    } else {
        author = req.session.username
    }
    const result = getList(author, keyword)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        )
    })
});
// 获取一篇博客的详情
router.get('/detail', function (req, res, next) {
    const result = getDetail(req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});
// 新建一篇博客
router.post('/new', loginCheck, function (req, res, next) {
    const author = req.session.username
    req.body.author = author
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})
// 更新一篇博客
router.post('/update', loginCheck, function (req, res, next) {
    const result = updataBlog(req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('更新博客失败！')
            )
        }
    })
})
// 删除一篇博客
router.post('/del', loginCheck, function (req, res, next) {
    const author = req.session.username
    const result = delBlog(req.query.id, author)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('删除博客失败！')
            )
        }
    })
})

module.exports = router;
