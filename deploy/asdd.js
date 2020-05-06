const axios = require('axios');
for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
        for(var k=0;k<10;k++){
            var string = 'www.'+i+''+j+k+".kiwi";
            if(string.indexOf('6')>-1){
                axios.get(string).then((asd)=>{
                    console.log(asd)
                })


            }
        }
    }
}