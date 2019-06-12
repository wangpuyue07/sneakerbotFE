/**
 * Created by Anthony on 2017/4/7.
 */
exports.requestFeedback = function (data) {
    try{
        return '<!doctype html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1"> <meta http-equiv="X-UA-Compatible" content="ie=edge"> <title>Template</title></head> <body style="width:768px; margin:auto;background-color: #fafafa"> <table style="margin: 0 auto;width: 670px;background-color: #fafafa"> <tr> <td width="3px"></td> <td style="text-align: center; "><img style="width:280px" src="https://test.seekstock.nz/assets/images/SEEKSTOCK_LOGO_BLUE_WIDE.png"></td> <td width="3px"></td> </tr> <tr> <td width="3px"></td>\
            <td style="text-align: center;  font-size: 28px;color: #666;font-weight: bold;line-height: 75px;"> Hi '+ data.storeName +' Store,</td><td width="3px"></td> </tr> <tr> <td></td>\
            <td style="font-size:17px;color:#666; text-align: center;line-height: 26px;"><p style="padding: 0 46px;"><span style="color: #666;">You have a new feedback request from <strong>'+data.creatorName+'</strong> ('+data.role+') at head office:</span></p><p style="margin: 30px auto;"><strong style="font-size: 20px; color: #5cb9d5;font-style:italic;">"'
            + data.description +'"</strong></p></td>\
            <td></td> </tr> <tr> <td style="border-bottom: 5px solid #fafafa"></td> </tr> <tr> <td width="3px"></td>\
            <td style="color: #666;font-size:20px;text-align: center"><strong>'+data.product.description+'</strong></td> <td width="3px"></td> </tr> <tr> <td style="border-bottom: 5px solid #fafafa"></td> </tr> <tr> <td width="3px"></td>\
                <td style="text-align: center"><img style="width:260px;" src="'+data.product.variations[0].image+'"></td>\
              <td width="3px"></td> </tr> <tr> <td width="3px"></td> <td style="text-align: center;border-bottom: 3px solid #fafafa;color:#666;font-size: 18px;line-height: 30px;">'+data.product.variations[0].rrp+'</td> <td width="3px"></td> </tr> <tr> <td width="3px"></td> <td style="width: 270px;height:50px;text-align: center"> <a style="cursor: pointer;line-height: 46px;cursor: pointer;color: #fff;background-color: #5cb9d5;font-size: 20px;border: none;border-radius: 4px;width: 310px;height: 46px;display: inline-block;text-decoration: none;" href="'+ process.env.HOST+'/?action=giveFeedback&productId='+data.product.sku+'">Give Feedback</button></td> <td width="3px"></td> </tr> <tr> <td style="border-bottom: 22px solid #fafafa"></td> </tr> <tr> <td></td> <td width="600px"> <hr style="border:none;border-top:1px solid #e6e6e6;height:0;" /> </td> <td></td> </tr> <tr> <td style="border-bottom: 22px solid #fafafa"></td> </tr> <tr> <td width="3px"></td> <td style="font-size:21px;color:#666; text-align: center"> <table> <tr> <td style="text-align: center;background-color: #e6e6e6; width:315px; border:1px solid #fafafa;border-radius: 13px; height: 185px;padding: 0 30px;"> <span style="display: block;    font-size: 18px;">This week your store is in:</span>\
            <strong  style="font-size: 30px;display: block;color: orange;line-height: 0px;margin-top: 50px;">'+transNumber(data.storeRank)+' Place</strong>\
        </td> <td width="4px"></td> <td style="text-align: center;background-color: #e6e6e6; width: 315px; border:1px solid #fafafa;border-radius: 13px; height: 185px;padding: 0 30px;"> <span style="display: block;    font-size: 18px;">This week your top staff member is:</span>\
            <strong style="font-size: 30px;color: orange;margin-top: 18px;display: block;">'+(data.staffName?data.staffName:'N/A')+'</strong> </td>\
    </tr> </table> </td> <td width="3px"></td> </tr> <tr> <td style="border-bottom: 22px solid #fafafa"></td> </tr> <tr> <td width="3px"></td> <td style="color:orange;font-size:21px; text-align: center"> <a style="cursor:pointer;color:orange" href="'+ process.env.HOST+'"><u><strong>Place more feedback</strong></u></a> to move up the ranks! </td> <td width="3px"></td> </tr> <tr> <td style="border-bottom: 22px solid #fafafa"></td> </tr> <tr> <td></td> <td style="border:1px #e6e6e6 solid;background-color:#fff;border-radius:9px;"> <table style="text-align: center;width: 100%"> <tr> <td style="border-bottom: 10px solid #fff"></td> </tr><tr><td style="color:#5cb9d5;font-size:26px;text-align: center"><strong>Top Stores</strong></td> </tr> <tr> <td style="font-size:18px;color:#666;line-height:40px;font-weight:300; text-align: center">Stores with the most activity this week: </td> </tr>\
                    <tr> <td style="text-align: center"> <table style="font-size:15px;font-family:Calibri;line-height:50px;font-weight:bold;margin:0 auto;width: 80%"> <tr> <td style="border-bottom: 10px solid #fff"></td> </tr>'+
            function(data){
                var rs='';
                data.storeListDesc.forEach(s=>{
                    rs = rs+'<tr><td style="width: 13px"></td><td style="text-align: center; color: #666; width: 270px;border-bottom: 1px solid #e6e6e6">'+s.storeName+'</td>'+
                    '<td style="text-align: center; color: #666; width: 300px; border-bottom: 1px solid #e6e6e6">'+s.fdbSugNum+' posts</td> <td style="width: 13px"></td></tr>'
                });
                return rs;
            }(data)
                +'<tr><td style="border-bottom: 22px solid #fff"></td></tr></table></td></tr></table></td><td></td></tr><tr><td style="border-bottom: 22px solid #fafafa"></td></tr><tr><td></td><td style="border:1px #e6e6e6 solid;background-color:#fff;border-radius:9px;"> <table style="text-align: center;width: 100%"> <tr> <td style="border-bottom: 10px solid #fff"></td> </tr> <tr> <td style="color:#5cb9d5;font-size:26px;text-align: center"><strong>Top Staff</strong></td> </tr> <tr> <td style="font-size:18px;color:#666;line-height:40px;font-weight:300; text-align: center">Top contributing staff this week: </td> </tr> <tr> <td style="text-align: center"> <table style="font-size:15px;font-family:Calibri;line-height:50px;font-weight:bold;margin:0 auto;width: 80%"> <tr> <td style="border-bottom: 10px solid #fff"></td> </tr>'+
            function(data){
                var rs='';
                data.staffListDesc.forEach(s=>{
                    rs = rs+'<tr><td style="width: 13px"></td><td style="text-align: center; color: #666; width: 300px;border-bottom: 1px solid #e6e6e6">'
                        +s.staffName+
                        '<span> ('
                        +s.staffRole_ab+
                        ')</span></td> <td style="text-align: center; color: #666; width: 150px; border-bottom: 1px solid #e6e6e6">'
                        + s.storeName +
                        '</td> <td style="text-align: center; color: #666; width: 120px; border-bottom: 1px solid #e6e6e6"> '
                        +s.fdbSugNum+
                        ' posts</td> <td style="width: 13px"></td> </tr>';
                });
                return rs;
            }(data)+'<tr> <td style="border-bottom: 22px solid #fff"></td> </tr> </table> </td> </tr> </table> </td> <td></td> </tr> <tr> <td style="border-bottom:15px solid #fff"></td> </tr> <tr> <td style="width: 3px"></td> <td style="color:orange;font-size:21px;line-height:95px; text-align: center"> <a style="cursor:pointer;color:orange;text-align: center" href="'+ process.env.HOST+'"><u><strong>Place more feedback</strong></u></a> to move up the ranks! </td> <td style="width: 3px"></td> </tr> <tr> <td style="border-bottom: 10px solid #fff"></td> </tr> <tr> <td style="width: 3px"></td> <td style="text-align: center"> <a style="cursor: pointer;line-height: 46px;color:#fff;background-color:#5cb9d5;font-size:17px;border:none;border-radius:4px; width: 270px; height: 46px;display: inline-block;text-decoration: none;" href="'+ process.env.HOST+'/?action=giveFeedback&productId='+data.product.sku+'">Give Feedback</a> </td> <td style="width: 3px"></td> </tr> <tr> <td style="border-bottom: 10px solid #fff"></td> </tr> <tr> <td></td> <td width="600px"> <hr style="border:none;border-top:1px solid #e6e6e6;height:0;" /> </td> <td></td> </tr> <tr> <td style="border-bottom: 10px solid #fff"></td> </tr> <tr> <td style="width: 3px"></td> <td style="text-align: center; color: #666; display: block;margin-bottom: 20px;"> <i style="color:#666; text-align: center">Copyright © 2017 Seek Stock, All rights reserved</i> </td> <td style="width: 3px"></td> </tr> <tr> <td style="border-bottom: 10px solid #fff"></td> </tr> </table> </body> </html>';
    }catch(err){
        console.log(err);
    }
};


var transNumber = (num)=>{
    if(num=='N/A') return num;
    var num = +num;
    var digit = num%10;
    var test = num%100;
    if(test<21&&test>4){
        return num+'th';
    }else{
        switch (digit){
            case 1:
                return num+'st';
            case 2:
                return num+'nd';
            case 3:
                return num+'rd';
        }
        if(digit>3){
            return num+'th';
        }
    }

}