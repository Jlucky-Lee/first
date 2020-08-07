import request from './request';

export const Search_Guid = (query) => { //检验终端是否初始化
    return request({
        url: '/api/searchGuid',
        method: 'get',
        params:{
            guid:query
        },
    })
}
export const Init_Navigation = (params) => { //初始化导航
    return request({
        url: '/api/initNavigation',
        method: 'post',
        data: {
            guid:params.guid,
            coodinate:params.coodinate,   	
            mode:params.mode,			
            speedMode:params.speedMode,	
            location:params.location,
            destination:params.destination,		
            noDataAlarmTime:params.noDataAlarmTime,
            stateChanged:params.stateChanged,
            pathDeviated:params.pathDeviated,
            speedUpdated:params.speedUpdated,
            distanceUpdated:params.distanceUpdated,
        },
    })
}
export const Stop_Navigation = (params) => { //结束导航
    return request({
        url: '/api/stopNavigation',
        method: 'get',
        params
    })
}
export const Update_Location = (params) => { //更新起点
    return request({
        url: '/api/updateLocation',
        method: 'post',
        params
    })
}
export const Update_Destination = (params) => { //更新目的地
    return request({
        url: '/api/updateDestination',
        method: 'post',
        params
    })
}
export const Get_Path = (query) => { //获取路线
    return request({
        url: '/api/getPath',
        method: 'get',
        params:{
            guid:query
        },
    })
}
export const Set_Path = (params) => { //选择导航路线
    return request({
        url: '/api/setPath',
        method: 'post',
        data:{
            guid:params.guid,
            mode:params.mode
        }
    })
}
export const Get_Speed = (params) => { //获取速度信息
    return request({
        url: '/api/getSpeed',
        method: 'get',
        params
    })
}
export const Get_Distance = (params) => { //获取速度信息
    return request({
        url: '/api/getDistance',
        method: 'get',
        params
    })
}
export const Get_PathDeviation = (params) => { //获取速度信息
    return request({
        url: '/api/getPathDeviation',
        method: 'get',
        params
    })
}
export const Get_SpeedSetting = (params) => { //获取速度设置
    return request({
        url: '/api/getSpeedSetting',
        method: 'get',
        params
    })
}
export const Set_SpeedSetting = (params) => { //速度设置
    return request({
        url: '/api/setSpeedSetting',
        method: 'post',
        params
    })
}

