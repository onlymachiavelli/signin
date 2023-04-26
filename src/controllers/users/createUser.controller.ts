import * as Services from './../../services/user.services'

import * as Express from 'express'
import Users from '../../models/user.schema'
import date from 'date-and-time'
import bcrypt from 'bcrypt'

const createUser  :Express.RequestHandler= async(req, res) => {
    const datas = req.body 
    const saltRound: number = Number(process.env.SALT)

    if (!datas.name || !datas.lname || !datas.email || !datas.password || !datas.bday) {
        res.status(400).send("Check your fields ! ")
        return 

    }

    const today : any = date.format(new Date,  'YYYY-MM-DD HH:mm:ss')

    const User  = new Users
    User.name = datas.name 
    User.lname = datas.lname
    User.bday = datas.bday 
    User.email = datas.email

    User.password = await bcrypt
        .genSalt(saltRound)
        .then((s) => bcrypt.hash(datas.password, s))

    Services.createUser(User).then(rs =>{
        res.status(200).send("Done creating the user")        
    }).catch((e:any)=>{
        res.status(500).send("Bad Request")
    })

}

export default createUser


