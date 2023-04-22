export class Book {
  public id?: string;
  public name: string;
  public author: string;
  public price?: number | undefined;
  public imgUrl?: string;
  public desc: string;
  public inCard?: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.author = data.author;
    this.price = data.price;
    this.imgUrl = data.imgUrl;
    this.desc = data.desc;
    this.inCard = false;
  }
}
