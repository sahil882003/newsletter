const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get('/',function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res)
{
    var First_name=req.body.first;
    var Last_name=req.body.last;
    var mail=req.body.mail;
    // res.write(First_name);
    // res.write(Last_name);
    // res.write(mail);
    // res.send();
    const data={
        members:[
            {
                email_address:mail,
                status:"subscribed",
                merge_fields:{
                    FNAME:First_name,
                    LNAME:Last_name
                }
            }
        ]
    }
    const jsondata=JSON.stringify(data);
    const url="https://us14.api.mailchimp.com/3.0/lists/98922db210";
    const options={
        method:"POST",
        auth:"sahil:ec8cbba078b706f22f0462ac18908eac-us14"
    }
    const request=https.request(url,options,function(response)
    {
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
        }
     response.on("data",function(data)
       {
        console.log(JSON.parse(data));
        
       });

    });
    request.write(jsondata);
    request.end();

});
app.post("/failure",function(req,res)
{
    res.redirect("/");
});

app.listen(3000,function(req,res)
{
   console.log("server is on and running"); 
})