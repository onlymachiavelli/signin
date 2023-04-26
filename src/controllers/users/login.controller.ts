import * as Services from './../../services/user.services'

import * as Express from 'express'
import Users from '../../models/user.schema'
import date from 'date-and-time'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const Login  :Express.RequestHandler= async(req, res) => {
    const saltRound: number = Number(process.env.SALT)



    //get the datas ! 
    const datas = req.body
    if (!datas.email || !datas.password ) {
        res.status(401).send("Cannot Login")
        return 
    }

    
    //get the datas 

    const target : any = await Services.getOne(datas.email)

    if (!target) {
        res.status(401).send("Unathorized because there's no user ! ") 
        return 
    }

    
    //get the pass 

    const pass : any = await Services.getPass(target.email) 
    if (!pass) {
        res.status(401).send("Unathorized ! ") 
        return 
    }

    //compaire ! 
    console.log("datas : " , datas)
    const isMatch = await bcrypt.compare(String(datas.password) , pass.password)
    console.log(isMatch)
    if (!isMatch) {
        res.status(401).send("Invalid username or password")
        return 
    }
    console.log("User datas ! : " , target)
    const token = JWT.sign({
        email : target.email
    } , process.env.JWT_SECRET as string , {
        expiresIn : "10h"
    })

    res.status(200).send({
        token : token
    }) 

}

export default Login


