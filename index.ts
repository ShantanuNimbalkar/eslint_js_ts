/**
 * @template A first object type
 * @template B second object type
 */
// --- @angular-eslint/eslint-plugin ---
import { Component, OnInit } from '@angular/core';
// --- eslint-plugin-react (in TSX) ---
import React, { useState, useEffect } from 'react';

    
type ProblemMerge = { a: number; b: string } & { a: string; c: number[] };

console.log(
  Object.assign({ a: 44, b: "hello" }, { a: "from second object", c: 99 })
);


/**
 * - ExtractPropertyNamesAssignableTo: obtain the names of properties assignable to a type
 * @template T object type to operate on
 * @template S type to check property values against

 */
interface Foo {
  x: string;
  y: number;
}

// IMPLEMENT ME
export type ExtractPropertyNamesAssignableTo<T, S> = never;

type X = ExtractPropertyNamesAssignableTo<
  Window,
  (a: Function, b: number) => any
>;

/**
 * - OptionalPropertyNamesOf: Extract the property names of an object type that are optional
 *
 * @template T object type to extract optional property names from
 *
 */

 // IMPLEMENT ME
export type OptionalPropertyNamesOf<T> = never;

/**
 * - RequiredPropertyNamesOf: Extract the property names of an object type that are required
 */

 // IMPLEMENT ME
export type RequiredPropertyNamesOf<T> = never;

// Rule: react-hooks/exhaustive-deps
function MissingDepComponent() {
  const [count, setCount] = useState(0);
  const data = 10;
  
  // 'data' is used in the effect but not in the dependency array
  useEffect(() => {
    console.log(count + data);
  }, [count]);
}


// --- eslint-plugin-jsx-a11y ---
// Rule: jsx-a11y/alt-text
const ImageComponent = () => <img src="logo.png" />;

// Rule: jsx-a11y/anchor-is-valid
const AnchorComponent = () => <a onClick={() => {}}>Click Me</a>;
