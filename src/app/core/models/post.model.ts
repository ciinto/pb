import * as moment from 'moment';

export interface PostInterface {
  id?: string
  title?: string
  slug?: string
  tag?: string[]
  content?: string
  author?: string
  createdAt?: string | number
  updatedAt?: string | number
  isDeleted?: boolean
}

export class PostModel implements PostInterface {

  displayColumns: string[] = ['title', 'tag', 'author', 'updatedAt', 'createdAt', 'id'];

  constructor(public rawData: PostInterface) {
  }

  get id() {
    return this.rawData.id
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

    return moment(+this.rawData.createdAt * 1000).format('DD/MM/YYYY')
  }

  get updatedAt() {
    if (!this.rawData.updatedAt) {
      return moment().unix();
    }

    return moment(+this.rawData.updatedAt * 1000).format('DD/MM/YYYY')
  }

  get isDeleted() {
    return this.rawData.isDeleted
  }

}