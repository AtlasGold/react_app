const axios= require( "axios")
const _ = require("lodash");  

async function a () {
    try{        //chamada da api
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d")
        const result = response.data;
   console.log(JSON.stringify(_.map(result, result =>_.pick(result,["id", "symbol","name", "current_price", "price_change_percentage_7d_in_currency","image","sparkline_in_7d"]))).replace("'",'"').replace(',',',\n'))
    }catch(err){
        console.error(err)
    }
}

a()