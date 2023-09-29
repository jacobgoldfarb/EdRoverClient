const SERVICE_URL = new URL('https://ed-rover-06e06cd4e051.herokuapp.com/search')
const DEV_SERVICE_URL = new URL('http://127.0.0.1:5000/search')

const searchPrograms = async (query, offset, limit, filters, autoCorrect) => {
  if (!offset) { offset = 0 }
  if (!query) { return Error("no query") }
  var url = SERVICE_URL + "?query=" + query + "&limit=" +  limit + "&offset=" + offset + "&autocorrect=" + autoCorrect
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
    url += `&city_filter=${city_filters}`
  }
  if (school_filters) {
    url += `&school_filter=${school_filters}`
  }
  if (category_filters) {
    url += `&category_filter=${category_filters}`
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