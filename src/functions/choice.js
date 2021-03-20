import axios from 'axios';

export const createChoice = async (choice, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/choice`, choice, {
        headers: {
            authtoken
        }
    })
}

export const getChoices = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/choice`)
}

export const getChoice = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/choice/${slug}`)
}

export const getProductChoice = async (_id) =>
    await axios.get(`${process.env.REACT_APP_API}/choice/${_id}`);

export const updateChoice = async (slug, choice, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/choice/${slug}`, choice, {
        headers: {
            authtoken
        }
    })
}

export const removeChoice = async(slug, authtoken) => {
    return axios.delete(`${process.env.REACT_APP_API}/choice/${slug}`, {
        headers: {
            authtoken
        }
    })
}

