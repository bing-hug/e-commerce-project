import requests from "@/api/request";
import mockAjax from "@/api/mockAjax";

//三级联动接口
export const reqCategoryList = ()=>requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
});

export const reqBanner = ()=>mockAjax.get('/banner');
export const reqFloor = ()=>mockAjax.get('/floor');
export const reqSearchList = (params)=>requests({
    url: '/list',
    method: 'post',
    data: params
});
export const reqGoodInfo = (skuid)=>requests({
    url: `/item/${skuid}`,
    method: 'get'
});

export const reqAddShopCar = ({skuId, skuNum})=>requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
});

export const reqCartList = ()=>requests({
    url: '/cart/cartList',
    method: 'get'
});

export const reqDelCartGood = (skuId) => requests({
    url: `cart/deleteCart/${skuId}`,
    method: 'delete'
});

export const reqUpdateCheckedByid = (skuId, isChecked) =>requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get"
});

export const reqUserLogin = (data) => requests({

    url: '/user/passport/login',
    method: 'post',
    data
});

export const reqlogout = ()=> requests({
    url: '/user/passport/logout',
    method: 'get'
});

export const reqUserInfo = ()=>requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
});

export const reqGetCode = (phone)=>requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
});

export const reqUserRegister = (data)=>requests({
    url: '/user/passport/register',
    method: 'post',
    data
});

export const reqTrade = ()=>requests({
    url: '/order/auth/trade',
    method: 'get'
});

export const reqSubmitOrder = (data)=>requests({
    url: `/order/auth/submitOrder?tradeNo=${data.traderNo}`,
    method: 'post',
    data
});

export const reqPay = (orderId)=>requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
});

export const reqPayStatus = (orderId)=>requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})
