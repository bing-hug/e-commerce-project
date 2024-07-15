import requests from "@/api/request";
import mockAjax from "@/api/mockAjax";

//三级联动接口
export const reqCategoryList = ()=>requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
});

export const reqBanner = ()=>mockAjax.get('/banner');
export const reqFloor = ()=>mockAjax.get('/floor');