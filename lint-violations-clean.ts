// ==================================================================================================
// lint-violations-clean.ts
// This file contains intentional rule violations for a wide range of ESLint plugins.
// It avoids common configuration errors to allow for more effective testing of specific rules.
// ==================================================================================================

import { useState, useEffect } from 'react';
import { useState as useStateAgain } from 'react'; // Duplicates 'useState' to trigger import/no-duplicates

import * as fs from 'fs';
import * as url from 'url';
import { Component, OnInit } from '@angular/core';

// --- ESLint Core & @typescript-eslint/eslint-plugin ---

// Rule: eslint:prefer-const
// Flags variables declared with `let` that are never reassigned.
let someVariable = "This is a violation.";

// Rule: @typescript-eslint/no-explicit-any
// Disallows the use of the 'any' type.
let unsafeData: any = "This is a violation.";


// --- eslint-plugin-import ---

// Rule: import/no-duplicates
// This line, combined with the import at the top of the file, violates this rule.
// import { useState as useStateAgain } from 'react';


// --- eslint-plugin-promise ---

// Rule: promise/no-new-promise
// Disallows using the `new Promise()` constructor.
const myPromise = new Promise((resolve) => {
    resolve("hello");
});

// Rule: promise/catch-or-return
// Requires `.catch()` or `return` on promise chains.
const myOtherPromise = Promise.resolve("data").then(() => {});


// --- eslint-plugin-unicorn ---

// Rule: unicorn/no-null
// Disallows the use of `null`.
const myNullValue = null;


// --- eslint-plugin-no-secrets ---

// Rule: no-secrets/no-secrets
// Flags hardcoded strings that look like secrets.
const apiKey = "sk_live_abcdef1234567890";


// --- eslint-plugin-react-hooks ---

// Rule: react-hooks/rules-of-hooks
// Disallows calling Hooks conditionally.
function useInvalidHookCall() {
    if (true) {
        const [count, setCount] = useState(0); // This hook call is conditional.
    }
}

// Rule: react-hooks/exhaustive-deps
// Requires all dependencies of a Hook (like useEffect) to be in the dependency array.
function MissingDepComponent() {
    const [count, setCount] = useState(0);
    const data = 10;
    
    useEffect(() => {
        console.log(count + data);
    }, [count]); // 'data' is used but not in the dependency array.
}


// --- eslint-plugin-security & eslint-plugin-security-node ---

// Rule: security/detect-buffer-noassert
// Detects usage of Buffer methods with `noAssert` set to true.
const buf = Buffer.alloc(10);
const maliciousInput = -5;
buf.writeUInt8(1, maliciousInput, true); // `noAssert: true` is a violation.

// Rule: security-node/non-literal-fs-filename
// Disallows non-literal filenames in `fs` methods, which could be a path traversal vulnerability.
const userFileName = 'user_input.txt';
fs.readFileSync(userFileName); // Non-literal filename is a violation.


// --- eslint-plugin-node ---

// Rule: node/no-deprecated-api
// Warns about usage of deprecated Node.js APIs.
const legacyUrl = url.parse("http://example.com", false, true); // `url.parse` is deprecated.

// Rule: node/no-callback-literal
// Discourages using non-error literals in callbacks.
function deprecatedCallback(cb: (err: string | null) => void) {
    cb("something went wrong"); // Passing a literal string as an error is a violation.
}


// --- @angular-eslint/eslint-plugin ---

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
    someVariable,
    unsafeData,
    myPromise,
    myOtherPromise,
    myNullValue,
    apiKey,
    useInvalidHookCall,
    MissingDepComponent,
    deprecatedCallback,
    MyComponent,
    MyAngularComp,
    legacyUrl,
};
