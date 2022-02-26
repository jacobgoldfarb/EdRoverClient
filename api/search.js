const SERVICE_URL = new URL('https://ed-rover.herokuapp.com/search')
const DEV_SERVICE_URL = new URL('http://127.0.0.1:5000/search')

const searchPrograms = async (query, offset, limit, filters) => {
  const parsedFilters = filters?.join(",")
  if (!offset) { offset = 0 }
  if (!query) { return Error("no query") }
  var url = SERVICE_URL + "?query=" + query + "&limit=" + limit + "&offset=" + offset 
  if (filters) {
    url += "&filters=" + parsedFilters
  }
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
  const url = 'https://ed-rover.herokuapp.com/program/' + id
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

export { searchPrograms, getProgram }