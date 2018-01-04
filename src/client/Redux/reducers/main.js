import { INDEX_DEMO } from '../actions/main'
import {constructType, actionTypes} from '../actions/ApiClient'

export function indexData(state = { time: '', error: false, loading: false, loaded: false }, action = {})
{
    switch (action.type)
    {
        case constructType(INDEX_DEMO, actionTypes.LOADING):
            return Object.assign({}, state, {
                time: '',
                error: false,
                loading: true,
                loaded: false
            });

        case constructType(INDEX_DEMO, actionTypes.DONE):
            return Object.assign({}, state, {
                time: action.data.time,
                error: action.error,
                loading: false,
                loaded: true
            });


        default:
            return state
    }
}