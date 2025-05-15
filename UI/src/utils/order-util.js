

export const createOrderRequest = (cartItems, userId, addressId, paymentMethod = "CARD") => {
    let request = {};
    request.userId = userId;
    request.addressId = addressId;
    request.orderDate = new Date().toISOString();
    let orderItems = [];
    let amount = 0;

    cartItems?.map((item) => {
        amount += item?.subTotal;
        orderItems.push({
            productId: item.productId,
            productVariantId: item?.variant?.id,
            discount: 0,
            quantity: item?.quantity,
        });
    });

    request.orderItemRequests = orderItems;
    request.totalAmount = amount?.toFixed(2);
    request.discount = 0;
    request.paymentMethod = paymentMethod; // Thay đổi paymentMethod
    request.expectedDeliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 ngày nữa
    request.currency = "usd"; // Nếu sử dụng đô la Mỹ
    return request;
};


export const getStepCount = {
    'PENDING':1,
    'IN_PROGRESS':2,
    'SHIPPED':3,
    'DELIVERED':4
}