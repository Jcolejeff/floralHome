import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class Flower {
  id: string;
  name: string;
  description: string;
  image: string;
  price: u128;
  quantity: u32;
  owner: string;

  public static fromPayload(payload: Flower): Flower {
    const flower = new Flower();
    flower.id = payload.id;
    flower.name = payload.name;
    flower.description = payload.description;
    flower.image = payload.image;
    flower.price = payload.price;
    flower.quantity = payload.quantity;
    flower.owner = context.sender;
    return flower;
  }

}

export const listedFlowers = new PersistentUnorderedMap<string, Flower>("FLOWER");
