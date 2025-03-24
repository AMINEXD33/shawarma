

type error = {
    code:"error",
    status: number,
    error : string
}
type data = {
    code:"data",
    status: number,
    data: any
}
export default async function CustomFetch(
    url:string,
    method: "GET"|"POST",
    body?: string
): Promise<error|data>{

    async function handleCall(header:Response):  Promise<error|data>{
        if (header.ok){
            try{
                const data = await header.json();
                return {
                    code:"data",
                    status:header.status,
                    data : data
                }
            }catch{
                return {
                    code:"error",
                    status: header.status,
                    error: "can't parse json"
                }
            }
        }else{
            return {
                code:"error",
                status: header.status,
                error: "request error"
            }
        }
    }
    if(method === "POST"){
        const header = await fetch(url , {
            method: method,
            body: body,
                        headers:{
                'Accept': 'application/json',
            },
        });
        return await handleCall(header);
    }
    else if (method === "GET"){
        const header = await fetch(url , {
            method: method,
            headers:{
                'Accept': 'application/json',
            },
        });
        return await handleCall(header);
    }
    throw new Error("bad method");
} 