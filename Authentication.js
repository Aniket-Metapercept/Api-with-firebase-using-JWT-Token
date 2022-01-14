const jwt = require('jsonwebtoken')

const auth = async (req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.send("Invalid User")
        return;
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token,process.env.SECRET_KEY)

        req.user = {username:payload.username}
        // console.log(req.user)
        next()

    } catch (error) {
        res.send("Invalid User")
        return;
    }

}

module.exports = auth