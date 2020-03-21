import axiosApi from "../../axios-api";
import {push} from "connected-react-router";

export const FETCH_GOODS_REQUEST = 'FETCH_GOODS_REQUEST';
export const FETCH_GOODS_SUCCESS = 'FETCH_GOODS_SUCCESS';
export const FETCH_GOODS_ERROR = 'FETCH_GOODS_ERROR';

export const fetchGoodsRequest = () => {return {type: FETCH_GOODS_REQUEST}};
export const fetchGoodsSuccess = (response) => {return {type: FETCH_GOODS_SUCCESS, response}};
export const fetchGoodsError = () => {return {type: FETCH_GOODS_ERROR}};

export const FETCH_ONE_GOODS_REQUEST = 'FETCH_ONE_GOODS_REQUEST';
export const FETCH_ONE_GOODS_SUCCESS = 'FETCH_ONE_GOODS_SUCCESS';
export const FETCH_ONE_GOODS_ERROR = 'FETCH_ONE_GOODS_ERROR';

export const fetchOneGoodsRequest = () => {return {type: FETCH_ONE_GOODS_REQUEST}};
export const fetchOneGoodsSuccess = (response) => {return {type: FETCH_ONE_GOODS_SUCCESS, response}};
export const fetchOneGoodsError = () => {return {type: FETCH_ONE_GOODS_ERROR}};

export const DELETE_GOODS = 'DELETE_GOODS';

export const deleteGoods = () => {return {type: DELETE_GOODS}};

export const getOneGoods = (id) => {
    return (dispatch, getState) => {
        const user = getState().users.user;
        dispatch(fetchOneGoodsRequest());
         axiosApi.get('/goods/' + id, {headers: {'Authorization': 'Token ' + user.token}}).then(response => {
            dispatch(fetchOneGoodsSuccess(response.data));
        }, error => {
            dispatch(fetchOneGoodsError(error));
        });
    }
};

export const getGoods = () => {
    return dispatch => {
        dispatch(fetchGoodsRequest());
         axiosApi.get('/goods').then(response => {
            dispatch(fetchGoodsSuccess(response.data));
        }, error => {
            dispatch(fetchGoodsError(error));
        });
    }
};

export const getGoodsByCategory = (id) => {
    console.log(id);
    return dispatch => {
        dispatch(fetchGoodsRequest());
        axiosApi.get('/goods?categories=' + id).then(response => {
            dispatch(fetchGoodsSuccess(response.data));
        }, error => {
            dispatch(fetchGoodsError(error));
        });
    }
};

export const addGoods = data => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        await axiosApi.post('/goods', data, {headers: {'Authorization': 'Token ' + user.token}});
        dispatch(push('/'));
        dispatch(getGoods());
    }
};

export const deleteGoodsGet = (id) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = {'Authorization': 'Token ' + token};
        await axiosApi.delete('/goods/' + id, {headers});
        dispatch(deleteGoods());
        dispatch(push('/'));
    }
};

