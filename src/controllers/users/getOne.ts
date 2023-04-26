import * as Services from './../../services/user.services'

import * as Express from 'express'
import Users from '../../models/user.schema'
import date from 'date-and-time'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const GetData:Express.RequestHandler = async (req, res) =>{
    const toke :any = req.headers.token 
    //verify token 
    if (!toke) {
        res.status(400).send("Give me the token ! ")
        return 
    }
    const [Bearer, token] = toke.split(" ") 
    if (Bearer != "Bearer" || !token) {
        res.status(400).send("Give me the token ! ")
        return 
    }


    JWT.verify(token, String(process.env.JWT_SECRET), async (err:any, decoded:any)=>{

        if (err) {
            res.status(401).send("You're not allowed to access this route !")
            return
        }
        console.log(decoded)

            const data : any = await Services.getOne(decoded.email)
            console.log(data)
            if (data) {
                res.status(200).send(data)
                return
            }
            else {
                res.status(404).send("User not found")
            }
    })
    

}


export default GetData