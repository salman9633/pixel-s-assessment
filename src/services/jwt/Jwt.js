import jwt from "jsonwebtoken";

class JwtService { 
   
    //here the token key is generated
     //we can call each token with from the route
    static async sign(payload, secret,expiry) {   
        return jwt.sign(payload, secret, { expiresIn: expiry });

    }

    // here we verify the token
    static  async verify(token, secret){
        return jwt.verify(token, secret); 
    }  
 }

export default JwtService; 