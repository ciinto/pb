import { FirebaseService } from '../services/firebase.service';

export interface PostInterface {
  title?: string
  slug?: string
  tag?: string[]
  content?: string
  author?: string
  createdAt?: Date
  updatedAt?: Date
}

export class PostModel implements PostInterface {
  collection
  
  constructor(public rawData: PostInterface) {
  }

  get validate() {
    return true
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
    return this.rawData.createdAt
  }

  get updatedAt() {
    return this.rawData.updatedAt
  }

}