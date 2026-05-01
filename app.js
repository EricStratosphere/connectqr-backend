import cookieParser from 'cookie-parser';
import path from 'path';
import express from 'express'


var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.post('/', (req, res) => {
    const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if(!userIP){
        res.status(404).json(
            {
                success : false,
                userIP : userIP,
                message : "Network address not found in post request body!"
            }
        )
    }
    const networkAddress = req.body.network_address;
    console.log(userIP);
    if(userIP === networkAddress){
        res.status(200).json({
            success : true,
            userIP : userIP,
            message : "IP verified! Attendance eligible for confirmation."
        })
    }
    else{
        res.status(403).json(
            {
                success : false,
                userIP : userIP,
                message : "Network address not verified! Make sure user is connected to the same network as admin."
            }
        )
    }
})

app.listen(5500, async () => {
    console.log("Express app started!");
})


export default app;