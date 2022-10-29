import axios from "axios"
import moment from "moment"

//para cada item respondido da API fazer um push no valor convertido
const formatSparkline = (numbers: any[]) => {
    const sevenDaysAgo = moment().subtract(7, 'minutes').unix();
    let formattedSparkline = numbers.map((item: string,index: number) => {
        return{ 
            timestamp: sevenDaysAgo + (index + 1 )* 3600,//converte para segundos
            value: item,
        } 
    })

    return formattedSparkline
}
//função para trocar o objeto retornado pela API pelo formatSparkline criado acima
const fixFormatData = (data:any) => {
    let formattedResponse:any = [];

    data.forEach((item: any) => {
        const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)

        const formattedItem = {
            ...item,
            sparkline_in_7d:{
                price: formattedSparkline
            }
        }
             
        formattedResponse.push(formattedItem)
    });

    return formattedResponse
}

export const getCryptoData = async () => {
    try{        //chamada da api
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=150&page=1&sparkline=true&price_change_percentage=7d")
        const result = response.data;
        const formatedResponse = fixFormatData(result);
        console.log(formatedResponse[1])
        return formatedResponse
    }catch(err){
        console.error(err)
    }
}
