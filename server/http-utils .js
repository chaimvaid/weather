const axios = require('axios')
const db = require('./models')


async function internalGet (service, path, data, method = 'get') {
    const options = {
        headers: {
            Authorization: "Bearer " + process.env.CRYPTO_INTERNAL_KEY
        }
    }
    if (data) {
        options.data = data
    }
   return axios[method](process.env.SERVER_BASE_URL + service + path, options)
}
async function usersGet (path, data, token, method = 'get') {
    const options = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    if (data) {
        options.data = data
    }
   return axios[method](process.env.USERS_URL + path, options)
}

async function internalPost (service, path, data, method = 'post') {
    const options = {
        headers: {
            Authorization: "Bearer " + process.env.CRYPTO_INTERNAL_KEY
        }
    }
    
   return axios[method](process.env.SERVER_BASE_URL + service + path, data, options)
}

async function billingPost (token, organizationId, path, data, method = 'post') {
    const options = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    
   return axios[method](process.env.BILLING_URL + organizationId + path , data, options)
}

async function mailerPost (token, data, method = 'post') {
    const options = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    
   return axios[method](process.env.BILLING_URL + 'mailer/send' , data, options)
}





module.exports = {
    internalGet,
    internalPost,
    billingPost,
    usersGet,
    mailerPost
}
