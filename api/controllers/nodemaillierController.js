// import nodemailer 
const nodemailer = require('nodemailer'),
    // Déclaration ne notre transporter
    // C'est en quelque sorte notre connexion à notre boite mail
    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: 'gmail',
        port: '587',
        auth: {
            user: process.env.USER_GMAIL,
            pass: process.env.PASS_GMAIL
        }
    })

module.exports = {

    // Test Nodemailer //
    responseMessage: (req, res) => {
        console.log(req.body)

        const mailOptions = {
            from: 'graflo720@gmail.com',
            to: req.body.mail,
            subject: 'Félicitations, ' + req.body.mail + ' !',
            html: `
        <h2>${req.body.mail}, Ton premier mail avec nodemailer, Successfull !!</h2> `
        }

        // On demande à notre transporter d'envoyer notre mail
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err)
            else {
                console.log(info)
                res.redirect('/admin')
            }
        })
    }
}