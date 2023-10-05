export const addItem = (product:any) => {
    return {
        type : "ADDITEM",
        payload : product
    }
}

export const delItem = (product:any) => {
    return {
        type : "DELITEM",
        payload : product
    }
}