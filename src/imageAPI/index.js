import axios from "axios"

 
 export const imageUplode = async(image) => {
     let formData = new FormData()
     formData.append("image", image)
     let {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
     ) 
     console.log(data.data.display_url)
     return data.data.display_url

}