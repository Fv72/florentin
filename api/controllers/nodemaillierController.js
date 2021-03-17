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
            html: `<h2>${req.body.mail}, Ton premier mail avec nodemailer, Successfull !!</h2> `
        }

        // On demande à notre transporter d'envoyer notre mail
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err)
            else {
                console.log(info)
                res.redirect('/admin')
            }
        })
    },
    lostPassword: async(req, res) => {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            // génération d'un chiffre random
            rand = Math.floor((Math.random() * 100) + 54)
                // on definit notre host
            host = req.get('host')
                // on définit le lien
            link = "http://" + req.get('host') + "/lostpassword/" + rand
                // et enfin notre mail
            mailOptions = {
                from: process.env.USER_GMAIL,
                to: req.body.email,
                subject: "Veuillez confirmez votre email svp.",
                rand: rand,
                html: `
        <h2>Encore un effort</h2>,<br>
        <h5>Cliquer sur le lien suivant afin de finir la procédure de recréation de mot de passe.</h5><br>
        <a href=" ` + link + ` ">Click here to create password</a>
      `
            }
            console.log(mailOptions)
                // Et envoi notre mail avec nos callback
            transporter.sendMail(mailOptions, (err, res, next) => {
                    if (err) {
                        console.log(err)
                        res.end("error")
                    } else {
                        console.log("Message Envoyer")
                        next()
                    }
                })
                // Response
            res.render('home', {
                success: "Un email à bien été envoyer à " + req.body.email
            })

        } else res.redirect('/')
    }
}