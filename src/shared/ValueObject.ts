import _ from 'lodash';

export interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = props;

    this.validate(props);
  }

  abstract validate(props: T): void;

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.props === undefined) {
      return false;
    }

    return _.isEqual(this.props, vo.props);
  }
}
