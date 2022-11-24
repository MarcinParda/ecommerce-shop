export interface CartItem {
  readonly id: number | string;
  readonly price: number;
  readonly title: string;
  readonly count: number;
}
