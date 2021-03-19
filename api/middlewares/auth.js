// export de module
// on definie notre fonction de req,res,next

module.exports = {
    admin: (req, res, next) => {
        console.log('Middlware admin', req.session)

        // si =/= admin alors redirect sur '/'
        if (!req.session.isAdmin) res.redirect('/')

        // else next
        else next()
    },
    ban: (req, res, next) => {
        console.log('Middlware ban')
        if (req.session.isBan === true) res.end()
        else next()
    }
}