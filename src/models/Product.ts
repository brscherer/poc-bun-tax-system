export abstract class Product {
  private name: string;
  private value: number;
  
  constructor(name: string, value: number) {
    this.name = name
    this.value = value
  }
  
  getName() {
    return this.name
  }
  
  getValue() {
    return this.value
  }
}