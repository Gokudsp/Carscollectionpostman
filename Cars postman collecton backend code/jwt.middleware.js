var jwt = require('jsonwebtoken');
const secretkey ="Autony"

 exports.createToken = async(encData) => {
 try{
        const token = jwt.sign(JSON.stringify(encData),secretkey);
         return token
}
catch(error){
    throw error
}
  }

 exports.verifyToken = async (token) => {
    try { 
        console.log(token);
        let splitedToken = token.split(" ")[1]
        console.log(splitedToken);
           const decryptToken = jwt.verify((token),secretkey);
            return decryptToken
    }
   catch(error){
       throw error
   }
    }
   


     
// //     catch(error){
// //         console.log(error)
// //         throw error
// //     }
// // }

// // exports.verifyToken = async(token) =>{
// //     try{
// //         console.log(token)
// //         //let splitedToken= token.split(" ")[1]
// //         //console.log(splitedToken);
// //         const decryptToken = jwt.verify(token,secretkey);
// //         return decryptToken
        
// //     } 
// //     catch(error){
// //         res.status(404).send({
// //             status: 404,
// //             message: "Invlid Token"
// //         })
// // }
// // }