import express from "express";
import jwt from "jsonwebtoken"; // You'll need: npm install jsonwebtoken
import userModel from "../Models/userModel.js";

const validateJWT = (req, res, next) => { 
// Get authorization header
        const authorizationHeader = req.get('authorization');
        
        // Check if header exists
        if (!authorizationHeader) {
            return res.status(401).send({ 
                error: 'Authorization header required' 
            });
        }
        
        // Extract token (assuming "Bearer TOKEN" format)
        const token = authorizationHeader.startsWith('Bearer ') 
            ? authorizationHeader.slice(7) 
            : authorizationHeader;

        
        if (!token) {
            return res.status(401).send({ 
                error: 'Token required' 
            });
        }
        
        // Verify token
        const decoded = jwt.verify(token, '%%f!~LU|Jrwgdep[.z[[OGO:[{!6x(&b' , async (err , payload) => { //payload is the data that user enter to dataBase
            if(err){
                res.status(403).send('Invalid Token');
                return; 
            }

            if(!payload){
                res.status(403).send('Invalid token payload');
                return;
            }

            const user = await userModel.findOne({email : payload.email});

            req.user = user;
            next();
        });
        
};


export default validateJWT;