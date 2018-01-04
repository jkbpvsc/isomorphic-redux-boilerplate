import axios from 'axios';
const baseUrl = 'http://localhost:3000/Api';

class ApiClient {
    constructor(baseurl)
    {
        this.__BASEURL = baseurl;
    }

    get(type, endpoint, requestData)
    {
        return dispatchAction(type, axios.get(this.getUrl(endpoint), requestData ? {params: requestData}: null))
    }

    post(type, endpoint, requestData)
    {
        return dispatchAction(type, axios.post(this.getUrl(endpoint), {params: requestData}))
    }

    getUrl(endpoint) {
        return `${this.__BASEURL}${endpoint}`
    }
}

export default new ApiClient(baseUrl);

function dispatchAction(type, payload)
{
    return function (dispatch)
    {
        dispatch({type: constructType(type, actionTypes.LOADING)});

        return payload.then(response =>
        {
            let dispatchObject = {};
            try {
                dispatchObject = {
                    type: constructType(type, actionTypes.DONE),
                    data: validateError(response)
                }
            }
            catch(err)
            {
                dispatchObject = {type: constructType(type, actionTypes.ERROR), message: err};
            }

            dispatch(dispatchObject);
        });
    }
}

function validateError(response)
{
    if (response.data.status === ApiStatus.SUCCESS)
    {
        return response.data.data;
    }

    throw response.data.error;
}

export function constructType(type, actionType)
{
    return  `ACTION_TYPE_${ type }_${ actionType }`
}

const ApiStatus = {
    SUCCESS: 'success',
    ERROR: 'error'
};

export const actionTypes = {
    LOADING: 'FETCHING',
    DONE: 'FETCH',
    ERROR: 'ERROR'
};