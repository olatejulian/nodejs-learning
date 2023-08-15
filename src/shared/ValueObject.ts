export class ValueObject<T> {
  protected value: T;

  constructor(value: T) {
    this.value = value;
  }

  public equals(valueObject: ValueObject<T>): boolean {
    return this.value === valueObject.getValue;
  }

  get getValue(): T {
    return this.value;
  }
}
