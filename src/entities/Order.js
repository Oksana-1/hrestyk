import { ObjectCreationValidator } from "@/entities/ObjectCreationValidator";

export default class Order {
  constructor(order) {
    this.userInfo = new UserInfo(order.userInfo);
    this.products = order.products.map((product) => {
      return new OrderProduct(product);
    });
    this.processing = order.processing.map(
      (item) => new ProcessingStatus(item)
    );
    this.orderStatus = order.orderStatus;

    ObjectCreationValidator.validate(this);
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

    ObjectCreationValidator.validate(this);
  }
}
export class OrderProduct {
  constructor(orderProduct) {
    this._id = orderProduct._id;
    this.title = orderProduct.title;
    this.amount = orderProduct.amount;
    this.price = orderProduct.price;
    this.images = orderProduct.images.map((imageItem) => {
      const image = new OrderProductImage(imageItem);
      if (imageItem.image) {
        image._setImage(imageItem.image);
      }
      return image;
    });

    ObjectCreationValidator.validate(this);
  }

  get id() {
    return this._id;
  }
}
export class OrderProductImage {
  constructor(orderProductImage) {
    this.alt = orderProductImage.alt;
    this.url = orderProductImage.url;
    this.is_main = orderProductImage.is_main;
  }
  _setImage(image) {
    this.image = image;
  }
}

export class ProcessingStatus {
  constructor(processing) {
    this.processingStatus = processing.processingStatus;
    this.content = processing.content;
  }
}
