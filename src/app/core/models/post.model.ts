import * as moment from 'moment';

export interface PostInterface {
  title?: string
  slug?: string
  tag?: string[]
  content?: string
  author?: string
  createdAt?: string | number
  updatedAt?: string | number
}

export class PostModel implements PostInterface {

  constructor(public rawData: PostInterface) {
  }

  get title() {
    return this.rawData.title
  }

  get slug() {
    return this.rawData.slug
  }

  get tag() {
    return this.rawData.tag
  }

  get content() {
    return this.rawData.content
  }

  get author() {
    return this.rawData.author
  }

  get createdAt() {
    if (!this.rawData.createdAt) {
      return moment().unix();
    }

    return moment(this.rawData.createdAt).format('DD/MM/YYYY')
  }

  get updatedAt() {
    if (!this.rawData.updatedAt) {
      return moment().unix();
    }

    return moment(this.rawData.updatedAt).format('DD/MM/YYYY')
  }

}