import redisClient from "../config/redis";


export async function getCache(key:string){

    const data = await redisClient.get(key);

    if(!data){
        return null;
    }


    return JSON.parse(data);

}



export async function setCache(
    key:string,
    data:any,
    expiry:number = 3600
){

    await redisClient.set(
        key,
        JSON.stringify(data),
        {
            EX: expiry
        }
    );

}