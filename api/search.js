const SERVICE_URL = new URL('https://ed-rover.herokuapp.com/search/')

const searchPrograms = async (query) => {
    if (!query) { return Error("no query") }
    const url = SERVICE_URL + "?query=" + query

    var requestOptions = {
        method: 'GET',
        mode:'no-cors',
        redirect: 'follow'
      };
    const resp = await fetch(url, requestOptions)
    return resp
}

const getProgram = async (id) => {
  const url = 'https://ed-rover.herokuapp.com/search/'
}

export { searchPrograms }