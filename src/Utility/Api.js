import axios from "axios"

const PEXEL_URL = "https://api.pexels.com/v1/search?query=people"
const userKey = "U7QlRU8f5PQyLggmw5TvYsYBOsbyLd64EJZ5auiPf9oZEMYVnxVb6Olr"


const authAxios = axios.create({
    baseURL:PEXEL_URL,
    headers:{
        Authorization:userKey
    }

})
export async function getWallPapers(){
 try{
console.log("getWallPapers function called");
const response = await authAxios.get()
const data = response.data
const wallPapers = data.photos[0]
const image = wallPapers.src.medium
console.log (image)
 }
 catch{console.error();
 }
}