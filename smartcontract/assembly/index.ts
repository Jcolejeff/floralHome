import { ContractPromiseBatch,u128, context } from "near-sdk-as";
import { Flower, listedFlowers } from "./model";

export function setFlower(flower: Flower): void {
  let storedFlower = listedFlowers.get(flower.id);
  if (storedFlower != null) {
    throw new Error(`flower with ${flower.id} already exists`);
  }
  listedFlowers.set(flower.id, Flower.fromPayload(flower));
}

export function getFlower(id: string): Flower | null {
  return listedFlowers.get(id);
}

export function getFlowers(): Flower[] {
  return listedFlowers.values();
}

export function buyFlower(flowerId: string): void {
    const flower = getFlower(flowerId);
    if (flower == null) {
      throw new Error("flower not found");
    }
    if (flower.price.toString() != context.attachedDeposit.toString()) {
      throw new Error("attached deposit should equal to the flower's price");
    }
    ContractPromiseBatch.create(flower.owner).transfer(context.attachedDeposit);
    flower.owner = context.sender;
    flower.quantity = flower.quantity - 1;
    listedFlowers.set(flower.id, flower);
}

export function increaseQuantity(flowerId: string): void {
  const flower = getFlower(flowerId);
  if (flower == null) {
    throw new Error("flower not found");
  }
  flower.quantity++;
  
  listedFlowers.set(flower.id, flower);
}

