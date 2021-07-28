import { get, post } from "./http";

export async function getUserList(): Promise<{ uid: number, role: number }[]> {
    return (await get('/mng/api/user')).data
}

export async function setUserRole(uid: number, role: number): Promise<void> {
    await post('/mng/api/user/set', {uid, role})
}

export async function getUserGroups(): Promise<{ gid: number, group_name: string, group_avatar: string, role: 'admin' | 'owner',  }[]>{
    const rsp = await get('/mng/api/user/group')
    return rsp.data
}