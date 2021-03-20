import axios from 'axios';

// request to backend
export const createUpdateUser = async (authtoken, userName) => {
  return await axios.post(`${process.env.REACT_APP_API}/create-update-user`, {userName}, {
    headers : {
      authtoken,
    }
  })
}

// get current user from backend
export const currentUser = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/current-user`, {}, {
        headers: {
            authtoken
        }
    })
}

// get current admin from backend
export const currentAdmin = async (authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/current-admin`, {}, {
      headers: {
          authtoken
      }
  })
}