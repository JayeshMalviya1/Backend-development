import mongoose ,{Schema} from 'mongoose'
import { JsonWebTokenError } from 'jsonwebtoken'
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, // 
            required:true,
        },
        coverImage:{
            type:String,
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        refreshingToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
)
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.generateAccessToken =function(){
    jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.userSchema,
        fullName:this.fullName
    }),
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_SECRET
    }
}
userSchema.methods.generateRefreshToken =function(){

    jwt.sign({
        _id:this._id,
        
    }),
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
}

userSchema.method.isPasswordCorrect =async function(password) {
    return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User",userSchema)