import { ServiceInterface } from '../interfaces/service.interface';

export class BaseModel {
  protected service: ServiceInterface
  protected rawData: any
  private attrKey = 'attribute'

  setValue(obj: any) {
    this.rawData = obj
    return this
  }

  create() {
    const createObj = {}

    Object.keys(this).forEach(n => {
      if (n.includes(this.attrKey)) {
        createObj[n.replace(this.attrKey, '').toLowerCase()] = this[n]
      }
    })

    return this.service.create(createObj)
  }

}