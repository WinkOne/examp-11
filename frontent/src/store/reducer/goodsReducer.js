import {
    DELETE_GOODS,
    FETCH_GOODS_SUCCESS,
    FETCH_ONE_GOODS_SUCCESS
} from "../action/goodsActions";


const initialState = {
    goods: [],
    oneGoods: null,
};

const goodsReducer = (state = initialState, action) => {
    if (action.type === FETCH_GOODS_SUCCESS) {
        return {...state, goods: action.response};
    }
    if (action.type === FETCH_ONE_GOODS_SUCCESS) {
        return {...state, oneGoods: action.response};
    }
    if (action.type === DELETE_GOODS) {
        return {...state, oneGoods: null};
    }
    return state;
};

export default goodsReducer;