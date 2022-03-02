import { collection } from "firebase/firestore";
import { db } from "./firebase"


const SERVICE_URL = new URL('https://ed-rover.herokuapp.com/program/')
const DEV_SERVICE_URL = new URL('http://127.0.0.1:5000/program')

const getProgram = async (id) => {
  var url = SERVICE_URL + id
  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  const resp = await fetch(url, requestOptions)
  if (resp.status != 200) {
    return Error(resp.statusText)
  }
  const body = await resp.json()
  console.log(body)
  return body
}

export { getProgram }