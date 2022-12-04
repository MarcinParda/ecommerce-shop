/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation CreateOrder($order: OrderCreateInput!) {\n  order: createOrder(data: $order) {\n    id\n  }\n}": types.CreateOrderDocument,
    "mutation CreateProductReview($review: ReviewCreateInput!) {\n  review: createReview(data: $review) {\n    id\n    headline\n    name\n    email\n    content\n    rating\n  }\n}": types.CreateProductReviewDocument,
    "query GetProductDetails($id: ID) {\n  product(where: {id: $id}) {\n    id\n    slug\n    name\n    price\n    description\n    images(first: 1) {\n      url\n    }\n  }\n}": types.GetProductDetailsDocument,
    "query GetProductsIds {\n  products {\n    id\n  }\n}": types.GetProductsIdsDocument,
    "query GetProductsList {\n  products {\n    id\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n}": types.GetProductsListDocument,
};

export function graphql(source: "mutation CreateOrder($order: OrderCreateInput!) {\n  order: createOrder(data: $order) {\n    id\n  }\n}"): (typeof documents)["mutation CreateOrder($order: OrderCreateInput!) {\n  order: createOrder(data: $order) {\n    id\n  }\n}"];
export function graphql(source: "mutation CreateProductReview($review: ReviewCreateInput!) {\n  review: createReview(data: $review) {\n    id\n    headline\n    name\n    email\n    content\n    rating\n  }\n}"): (typeof documents)["mutation CreateProductReview($review: ReviewCreateInput!) {\n  review: createReview(data: $review) {\n    id\n    headline\n    name\n    email\n    content\n    rating\n  }\n}"];
export function graphql(source: "query GetProductDetails($id: ID) {\n  product(where: {id: $id}) {\n    id\n    slug\n    name\n    price\n    description\n    images(first: 1) {\n      url\n    }\n  }\n}"): (typeof documents)["query GetProductDetails($id: ID) {\n  product(where: {id: $id}) {\n    id\n    slug\n    name\n    price\n    description\n    images(first: 1) {\n      url\n    }\n  }\n}"];
export function graphql(source: "query GetProductsIds {\n  products {\n    id\n  }\n}"): (typeof documents)["query GetProductsIds {\n  products {\n    id\n  }\n}"];
export function graphql(source: "query GetProductsList {\n  products {\n    id\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n}"): (typeof documents)["query GetProductsList {\n  products {\n    id\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;