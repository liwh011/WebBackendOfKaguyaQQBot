import { get, post } from "./http";


export async function getServiceList(): Promise<string[]> {
    return (await get('/mng/api/sv')).data
}

export interface ServiceDetail {
    svname: string,
    enabled: boolean,
    visiable: boolean,
    use_priv: string,
    mng_priv: string,
    group_states: {
        group_id: number,
        group_name: string,
        enabled: boolean,
    }[],
    config: { [key: string]: { [key: string]: any } }
}

export async function getAllServiceDetail(): Promise<ServiceDetail[]> {
    return (await get('/mng/api/sv')).data
}
export async function getServiceDetail(svname: string): Promise<ServiceDetail> {
    return (await get('/mng/api/sv', { svname })).data
}

export async function getServiceState(svname: string): Promise<{ group_id: string, group_name: string, enabled: boolean }[]> {
    return (await get('/mng/api/sv/state', { svname })).data
}

export async function getGroupServiceState(gid: number)
    : Promise<{ gid: number, group_name: string, sv: { svname: string, enabled: boolean, enabled_globally: boolean }[] }> {
    return (await get('/mng/api/sv', { gid })).data
}


export async function setServicState(svname: string, gid: number, enable: boolean): Promise<null> {
    return await post('/mng/api/sv/switch/grp', { svname, gid, enable })
}


export async function getAllServiceGlobalState(): Promise<{ svname: string, enabled: boolean }[]> {
    const rsp = await get('/mng/api/sv/glbstate')
    return rsp.data
}

export async function setServiceGlobalState(svname: string, enable: boolean): Promise<void> {
    const rsp = await post('/mng/api/sv/switch/glb', { svname, enable })
}


export async function getServicConfig(svname: string, gid?: number): Promise<any> {
    let params = { svname, gid }
    return (await get('/mng/api/sv/cfg', params)).data
}
