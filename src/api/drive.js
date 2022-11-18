import axios from "axios"

// const baseUrl = "https://www.googleapis.com/drive/v3/"

export async function getFiles(auth) {
  
  const config = {
    headers: {
      Authorization: `Bearer ${auth.access_token}`
    }
  };

  const url = "https://www.googleapis.com/drive/v3/files?corpora=user";

  axios
    .get(url, config)
    .then(res=> console.log(res))
    .catch(err=> console.log(err))
}