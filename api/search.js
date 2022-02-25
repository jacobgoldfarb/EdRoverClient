const SERVICE_URL = new URL('https://ed-rover.herokuapp.com/search')
const DEV_SERVICE_URL = new URL('http://127.0.0.1:5000/search')

const searchPrograms = async (query, offset, filters) => {
  const parsedFilters = filters.join(",")
  const limit = 20
    if (!offset) { offset = 0 }
    if (!query) { return Error("no query") }
    const url = SERVICE_URL + "?query=" + query + "&limit=" + limit + "&offset=" + offset + "&filters=" + parsedFilters
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