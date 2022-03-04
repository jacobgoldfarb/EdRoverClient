const SERVICE_URL = new URL('https://ed-rover.herokuapp.com/search')
const DEV_SERVICE_URL = new URL('http://127.0.0.1:5000/search')

const searchPrograms = async (query, offset, limit, filters) => {
  if (!offset) { offset = 0 }
  if (!query) { return Error("no query") }
  var url = SERVICE_URL + "?query=" + query + "&limit=" + limit + "&offset=" + offset 
  if (filters) { 
    url = addFiltersToUrl(url, filters)
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

const addFiltersToUrl = (url, filters) => {
  const city_filters = filters.cities_filter?.join(",")
  const school_filters = filters.schools_filter?.join(",")
  const category_filters = filters.categories_filter?.join(",")
  if (city_filters) {
    url += `&cities_filters="${city_filters}"`
  }
  if (school_filters) {
    url += `&school_filters="${school_filters}"`
  }
  if (category_filters) {
    url += `&category_filters="${category_filters}"`
  }
  return url
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