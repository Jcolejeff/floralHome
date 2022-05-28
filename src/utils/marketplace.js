import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function createFlower(flower) {
  flower.id = uuid4();
  flower.price = parseNearAmount(flower.price + "");
  console.log(flower);
  return window.contract.setFlower({ flower });
}

export function getFlowers() {
  return window.contract.getFlowers();
}

export function increaseQuantity({id}) {
  return window.contract.increaseQuantity({ flowerId: id });
}

export async function buyFlower({ id, price }) {
  await window.contract.buyFlower({ flowerId: id }, GAS, price);
}