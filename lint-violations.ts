// ==================================================================================================
// lint-violations.ts
// This file contains intentional rule violations for TypeScript and related plugins.
// The code here is designed to fail linting so you can confirm your ESLint configuration works.
// ==================================================================================================

// --- @typescript-eslint/eslint-plugin ---
// Rule: @typescript-eslint/no-explicit-any
let data: any = "This is a violation.";

// Rule: @typescript-eslint/explicit-function-return-type
function noReturnType() {
  return "This function is missing an explicit return type.";
}

// Rule: @typescript-eslint/no-unused-vars
function unusedParams(_unused: string) {
  // _unused is intentionally not used, but the rule may still flag it
}

// Rule: @typescript-eslint/ban-types
// Banning the use of the `Object` type, a common and recommended rule.
let myObject: Object = {};

// --- eslint-plugin-import ---
// Rule: import/no-duplicates
import { a } from './some-module';
import { b } from './some-module';

// Rule: import/no-unresolved
// This will fail if the module 'non-existent-ts-module' does not exist.
import { someType } from 'non-existent-ts-module';


// --- @angular-eslint/eslint-plugin ---
import { Component, OnInit } from '@angular/core';

// Rule: @angular-eslint/component-selector
// The selector 'my-component' does not follow a required prefix (e.g., 'app-').
@Component({
  selector: 'my-component',
  template: '<div>Hello Angular</div>'
})
class MyAngularComponent implements OnInit {
  // Rule: @angular-eslint/component-class-suffix
  // The class name 'MyAngularComponent' does not end with 'Component'.
  constructor() { }
  ngOnInit(): void { }
}

// --- eslint-plugin-react (in TSX) ---
import React, { useState, useEffect } from 'react';

interface Props {
  // Rule: react/prop-types
  // 'prop-types' is deprecated in TS, so this rule is often disabled in TS configs.
  // We include it here as a violation to test if the rule is active.
  someProp: string;
}

function MissingKeyComponent({ items }: { items: string[] }) {
  // Rule: react/jsx-key
  // Missing key on list items
  return (
    <ul>
      {items.map(item => <li>{item}</li>)}
    </ul>
  );
}

// Rule: react/no-unknown-property
// 'class' is not a valid property in JSX; should be 'className'
const InvalidProperty = () => <div class="my-class"></div>;

// --- eslint-plugin-react-hooks ---
// Rule: react-hooks/rules-of-hooks
function useInvalidHookCall() {
  if (true) {
    const [count, setCount] = useState(0); // This hook call is conditional
  }
}

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
