import ApiClient from './ApiClient'
export const INDEX_DEMO = 'CASE_INDEX';

export function getData()
{
    return ApiClient.get(INDEX_DEMO, '/timeout', {'start': Date.now()});
}

export const load = () => {
    return (dispatch, getState) => {
        let state = getState();

        if (!state.indexData.loaded)
        {
            return dispatch(getData());
        }
    }
};