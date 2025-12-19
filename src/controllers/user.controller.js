import { asyncHandler } from "../utils/asyncHandler.js";
import {apierror} from "../utils/apiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";




const registerUser = asyncHandler(async(req,res,next)=>{
   //get user details from frontend
   // validation  - not empty
   // check if user already exist
   // file exist or not, check for the avatar and image
   //upload them to cloudinary, avatar
   // create user object - create entry in db
   // remove password and refresh token field from response
   // check for user creation 
   // return response 


   const {username,email,fullName,password}=req.body
   if(
    {username,email,fullName,password}.some((field)=>
        fiels?.trim=="")
   ){
        throw new apierror(400,"All fields are required")
   }

   const existedUser=User.fineOne({
        $or:[
            {username},
            {email}
        ]
    })   

    if(existedUser){
        throw new apierror(409,"User already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path; // take file using the multer
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath || !coverImageLocalPath){
        throw new apierror(40,"All files are required")
    
    }

  const avatar =  await uploadOnCloudinary(avatarLocalPath)
  const coverImage =  await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new apierror(400, "Avatar is requried")
    }

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        username:username.toLowerCase(),
        password
    
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshingToken"
    )

    if(!createdUser){
        throw new apierror(500, "User not created")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User created successfully")
    )

} )

export default registerUser