// ==================================================================================================
// lint-violations-comprehensive.ts
// This file contains intentional rule violations for a wide range of ESLint plugins,
// based on the configuration provided. The code is designed to fail linting so you can
// confirm your ESLint setup is working as expected.
// ==================================================================================================

// --- ESLint Core & @typescript-eslint/eslint-plugin ---

// Rule: eslint:no-unused-vars
// This variable is declared but never read.
const unusedVariable = 10;

// Rule: @typescript-eslint/no-explicit-any
// Disallows the use of the 'any' type.
let unsafeData: any = "This is a violation.";


// --- eslint-plugin-import ---

// Rule: import/no-duplicates
// Disallows duplicate imports from the same module.
import { a } from './some-module';
import { b } from './some-module';

// Rule: import/first
// All imports must be at the top of the file, before any other code.
const codeBeforeImport = "This will cause an error.";
import { c } from './some-other-module';


// --- eslint-plugin-promise ---

// Rule: promise/no-new-promise
// Disallows `new Promise()`. The rule may suggest using async/await instead.
const myPromise = new Promise((resolve) => {
  resolve("hello");
});

// Rule: promise/catch-or-return
// Requires `.catch()` or `return` on promise chains.
const myOtherPromise = Promise.resolve("data").then(() => {});


// --- eslint-plugin-unicorn ---

// Rule: unicorn/filename-case
// Requires filenames to be in a specific case (e.g., kebab-case).
// This rule check happens on the file name itself, so this violation is for demonstration.
// (The file itself, 'lint-violations-comprehensive.ts', violates this rule if kebab-case is required).

// Rule: unicorn/no-null
// Disallows the use of `null`.
const myNullValue = null;


// --- eslint-plugin-no-secrets ---

// Rule: no-secrets/no-secrets
// Flags hardcoded strings that look like secrets (e.g., API keys, passwords).
const apiKey = "sk_live_abcdef1234567890";


// --- eslint-plugin-react & eslint-plugin-react-hooks ---
// Note: These rules are being checked even without JSX elements.

// Rule: react/jsx-uses-react
// This rule flags the import if React is not used in JSX.
// This will cause a violation because there is no JSX in this file.
import React from 'react';

// Rule: react-hooks/rules-of-hooks
// Disallows calling Hooks conditionally.
import { useState, useEffect } from 'react';

function useInvalidHookCall() {
  if (true) {
    const [count, setCount] = useState(0); // This hook call is conditional.
  }
}


// --- eslint-plugin-security & eslint-plugin-security-node ---

// Rule: security/detect-buffer-noassert
// Detects usage of Buffer methods with `noAssert` set to true, which can lead to vulnerabilities.
// This is a violation since `noAssert` can bypass bounds checking.
const buf = Buffer.alloc(10);
const maliciousInput = -5;
buf.writeUInt8(1, maliciousInput, true); // `noAssert: true` is a violation.

// Rule: security-node/non-literal-fs-filename
// Disallows non-literal filenames in `fs` methods, which could be a path traversal vulnerability.
import * as fs from 'fs';
const userFileName = 'user_input.txt';
fs.readFileSync(userFileName); // Non-literal filename is a violation.


// --- eslint-plugin-vue ---
// Note: This plugin is for Vue files, so we can't directly show violations in a .ts file.
// The violation would occur within a .vue file's `<script>` or `<template>` block.
// A common violation is `vue/no-unused-components`.
// We will simulate a violation that could happen in a TS file that is part of a Vue app.
// Rule: vue/no-unused-properties - a common Vue rule
// In a Vue component's TS, this could be a prop or a data property that's declared but not used.
const unusedPropForVueComponent = 'some-value';


// --- eslint-plugin-node ---

// Rule: node/no-deprecated-api
// Warns about usage of deprecated Node.js APIs.
import * as url from 'url';
const legacyUrl = url.parse("http://example.com", false, true); // `url.parse` is deprecated.

// Rule: node/no-callback-literal
// Discourages using non-error literals in callbacks.
function deprecatedCallback(cb: (err: string | null) => void) {
  cb("something went wrong"); // Passing a literal string as an error is a violation.
}


// --- @angular-eslint/eslint-plugin ---
import { Component, OnInit } from '@angular/core';

// Rule: @angular-eslint/component-selector
// Requires component selectors to follow a naming convention (e.g., having a prefix).
@Component({
  selector: 'my-component', // Fails if a prefix like 'app-' is required.
  template: '<div>Hello Angular</div>'
})
class MyComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}

// Rule: @angular-eslint/component-class-suffix
// Requires component class names to end with 'Component'.
@Component({
  selector: 'app-my-other-component',
  template: '<div>Hello Angular again</div>'
})
class MyAngularComp { // Fails because the name does not end with 'Component'.
  constructor() { }
  ngOnInit(): void { }
}

// Export some items to prevent 'no-unused-vars' linting errors on the items themselves
export {
  unusedVariable,
  unsafeData,
  myPromise,
  myOtherPromise,
  myNullValue,
  apiKey,
  useInvalidHookCall,
  deprecatedCallback,
  MyComponent,
  MyAngularComp,
  unusedPropForVueComponent,
  legacyUrl
};

// Example usage to prevent 'no-unused-vars' for imported modules if not explicitly used
console.log(a, b, c);
