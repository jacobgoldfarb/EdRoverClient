const SERVICE_URL = new URL('https://ed-rover-06e06cd4e051.herokuapp.com/program/')
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
  return body
}

export { getProgram }