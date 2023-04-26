import Users from "../models/user.schema"

//to get all users 


const getOne = async(email : any) =>{
    return await Users.findOne({
        select:["name" , "lname" , "id" , "bday" , "email" ],
        where:{
            email : email
        }
    })
}


const getPass = async (target :any) =>{
    return await Users.findOne({
        select:["password"] , 
        where:{
            email : target
        }
    })
}


const createUser = async (datas : any ) =>{
    await Users.save(datas)
}




export {getOne , getPass , createUser}