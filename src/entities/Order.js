export default class Order {
  constructor(order) {
    this.userInfo = new UserInfo(order.userInfo);
    this.products = order.products.map((product) => new OrderProduct(product));
    this.processing = order.processing.map(
      (item) => new ProcessingStatus(item)
    );
    this.orderStatus = order.orderStatus;
  }
  setOrderId(orderId) {
    this.id = orderId;
  }
}
export class UserInfo {
  constructor(userInfo) {
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.phone = userInfo.phone;
  }
}
export class OrderProduct {
  constructor(orderProduct) {
    this.title = orderProduct.title;
    this.amount = orderProduct.amount;
    this.price = orderProduct.price;
    this.images = orderProduct.images.map(
      (image) => new OrderProductImage(image)
    );
  }
}
export class OrderProductImage {
  constructor(orderProductImage) {
    this.alt = orderProductImage.alt;
    this.url = orderProductImage.url;
    this.is_main = orderProductImage.is_main;
  }
}

export class ProcessingStatus {
  constructor(processing) {
    this.processingStatus = processing.processingStatus;
    this.content = processing.content;
  }
}
