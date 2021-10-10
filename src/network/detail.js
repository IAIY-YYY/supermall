import { request } from "./request"

export function getDetail(iid){
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}
export function getRecommend() {
  return request({
    url:'/recommend'
  })
}
// ES6语法。直接class一个对象
export class Goods {
    // 构造器，构造函数  默认的  从项目中复制过来的
    constructor(itemInfo, columns, services) {
        // 将详情页中轮播图下的组件数据整合成一个对象，方便获取
      this.title = itemInfo.title;
      this.desc = itemInfo.desc;
      this.newPrice = itemInfo.price;
      this.oldPrice = itemInfo.oldPrice;
      this.discount = itemInfo.discountDesc;
      this.nowPrice = itemInfo.highNowPrice;
      this.columns = columns;
      this.services = services;
      this.realPrice = itemInfo.lowNowPrice;
      
    }
  }

//   对商家信息数据进行整合
  export class Shop {
    constructor(shopInfo) {
      this.logo = shopInfo.shopLogo;
      this.name = shopInfo.name;
      this.fans = shopInfo.cFans;
      this.sells = shopInfo.cSells;
      this.score = shopInfo.score;
      this.goodsCount = shopInfo.cGoods
    }
  }
  
// 对参数信息进行整合
  export class GoodsParam {
    constructor(info, rule) {
      // 注: images可能没有值(某些商品有值, 某些没有值)
      this.image = info.images ? info.images[0] : '';
      this.infos = info.set;
      this.sizes = rule.tables;
    }
  }