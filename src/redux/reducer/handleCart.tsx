const cart:any[] = [];

const handleCart = (state = cart, action:any) => {
    const product = action.payload;
    switch (action.type) {
        case "ADDITEM":
            // check if product is already exist
            const exist = state.find((x) => x.id === product.id);
            if (exist) {
                return state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty + 1 } : x
                );
            } else {
                const product = action.payload;
                return [...state, { ...product, qty: 1 }];
            }
        case "DELETEITEM":
            // check if product only has 1 quantity
            const exist1 = state.find((x) => x.id === product.id)
            if(exist1.qty === 1){
                return state.filter((x) => x.id !== exist1.id)
            }
            else{
                return state.map((x) => x.id === product.id ? { ...x, qty: x.qty - 1} : x)
            }
        default:
            return state
    }
};

export default handleCart;
