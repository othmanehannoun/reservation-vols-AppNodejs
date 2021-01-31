const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const  nodemailer = require('nodemailer');


const conn = require('../db/connection.js');


router.get('/confirmer/:userId/:idVol/:nbrplace',(req, res) => {
    const userId = req.params.userId;
    const idVol = req.params.idVol;
    const nbrplace = req.params.nbrplace;

    let sql = `Select email from users where id = ${userId}`;
    let query = conn.query(sql,(err, result) => {
        let resEmail = result[0]['email'];
        if(err) throw err;

        console.log(resEmail);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'tmail1058@gmail.com',
              pass: 'test@2020'
            }
          });
          
          var mailOptions = {
            from: 'tmail1058@gmail.com',
            to: resEmail,
            subject: 'Sending Email using Node.js',
            text: 'test num 10!',
            html: ` 
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width: 320px;"><tr><td align="center" bgcolor="#eff3f8">

              <table border="0" cellspacing="0" cellpadding="0" class="table_width_100" width="100%" style="max-width: 680px; min-width: 300px;">
            
                <tr><td align="center" bgcolor="#fbfcfd">
                  <table width="90%" border="0" cellspacing="0" cellpadding="0">
                    <tr><td align="center">
                      <div style="height: 60px; line-height: 60px; font-size: 10px;"> </div>
                      <div style="line-height: 44px;">
                        <font face="Arial, Helvetica, sans-serif" size="5" color="#57697e" style="font-size: 34px;">
                        <span style="font-family: Arial, Helvetica, sans-serif; font-size: 34px; color: #57697e;">
                        Welcome to SafiAir
                        </span></font>
                      </div>
                    <div style="height: 40px; line-height: 40px; font-size: 10px;"> </div>
                    </td></tr>
                    <tr><td align="center">
                      <div style="line-height: 24px;">
                        <font face="Arial, Helvetica, sans-serif" size="4" color="#57697e" style="font-size: 15px;">
                        <span style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #57697e;">
                        In order to complete the reservation<br> you must click on the link below.
                        </span></font>
                        
                      </div>
                    <div style="height: 40px; line-height: 40px; font-size: 10px;"> </div>
                    </td></tr>
                    <tr><td align="center">
                      <div style="line-height: 24px;">
                        <a href='http://localhost:2000/succeeded/`+userId+`/`+idVol+`/`+nbrplace+`' target="_blank" font-family: Arial, Helvetica, sans-serif; font-size: 13px;">
                          <font face="Arial, Helvetica, sans-seri; font-size: 13px;" size="3" color="#596167">
                          </font>Clique ici</a>
                      </div>
                    <div style="height: 60px; line-height: 60px; font-size: 10px;"> </div>
                    </td></tr>
                  </table>		
                </td></tr>

                <tr><td>
              <div style="height: 80px; line-height: 80px; font-size: 10px;"> </div>
                </td></tr>
              </table>
  
              </td></tr>
              </table> ` 
            
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              
            }
          });

          res.render('confimeEmail');
        
    });

});

module.exports = router;