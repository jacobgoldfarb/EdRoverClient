const SERVICE_URL = new URL('https://ed-rover.herokuapp.com/search')

const searchPrograms = async (query) => {
    if (!query) { return Error("no query") }
    const url = SERVICE_URL + "?query=" + query
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

const getProgram = async (id) => {
  const url = 'https://ed-rover.herokuapp.com/search/'
}

export { searchPrograms }