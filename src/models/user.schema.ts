import * as TypeORM from 'typeorm'



@TypeORM.Entity()
class Users extends TypeORM.BaseEntity{
    @TypeORM.PrimaryGeneratedColumn()
    id : number 

    @TypeORM.Column({
        unique : true 
    })
    email : string 

    @TypeORM.Column() 
    name : string 


    @TypeORM.Column() 
    lname : string
    
    @TypeORM.Column() 
    password : string 
    
    @TypeORM.Column() 
    bday : Date
    
    
    
    
}


export default Users