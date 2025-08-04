// ==================================================================================================
// index.ts (Corrected version of lint-violations.ts)
// This file demonstrates how to write code that adheres to common ESLint rules for TypeScript,
// React, Angular, and related plugins. It should pass linting without errors.
// ==================================================================================================

// --- @typescript-eslint/eslint-plugin ---
// Rule: @typescript-eslint/no-explicit-any - CORRECTED
// Explicit types used instead of 'any'.
let data: string = "This is no longer a violation.";

// Rule: @typescript-eslint/explicit-function-return-type - CORRECTED
function hasReturnType(): string {
    return "This function now has an explicit return type.";
}

// Rule: @typescript-eslint/no-unused-vars - CORRECTED
// All parameters are now used.
function usedParams(used: string): void {
    console.log(used); // Parameter 'used' is now utilized.
}

// Rule: @typescript-eslint/ban-types - CORRECTED
// 'Record<string, unknown>' or a specific interface used instead of 'Object'.
let myStrictObject: Record<string, unknown> = {};

// --- eslint-plugin-import ---
// Rule: import/no-duplicates - CORRECTED
// All imports from the same module are consolidated into one statement.
import { a, b } from './some-module'; // Assuming 'some-module' exists in your project.

// Rule: import/no-unresolved - CORRECTED
// This import now points to a module that should exist (e.g., a standard lib or one you create).
// For demonstration, replacing with a common type from a standard library.
import { CSSProperties } from 'react'; // Example: importing a type from 'react'.


// --- @angular-eslint/eslint-plugin ---
import { Component, OnInit } from '@angular/core';

// Rule: @angular-eslint/component-selector - CORRECTED
// The selector now follows a required prefix (e.g., 'app-').
// Rule: @angular-eslint/component-class-suffix - CORRECTED
// The class name now ends with 'Component'.
@Component({
    selector: 'app-my-angular-component', // Corrected selector
    template: '<div>Hello Angular</div>'
})
class MyAppAngularComponent implements OnInit { // Corrected class name
    constructor() { }
    ngOnInit(): void { }
}

// --- eslint-plugin-react (in TSX) ---
import React, { useState, useEffect } from 'react';

interface Props {
    // Rule: react/prop-types - Typically disabled in TS configs due to TS handling types.
    // If enabled, this would require prop-types runtime checks, which are redundant with TypeScript.
    // Assuming the rule is disabled or handled by TS types.
    someProp: string;
}

// Rule: react/jsx-key - CORRECTED
// 'key' prop added to list items.
function ComponentWithKeys({ items }: { items: string[] }): JSX.Element {
    return (
        <ul>
            {items.map((item, index) => <li key={index}>{item}</li>)} {/* Key added */}
        </ul>
    );
}

// Rule: react/no-unknown-property - CORRECTED
// 'className' used instead of 'class' for JSX properties.
const ValidProperty = (): JSX.Element => <div className="my-class"></div>;

// --- eslint-plugin-react-hooks ---
// Rule: react-hooks/rules-of-hooks - CORRECTED
// Hooks are now called unconditionally at the top level of the function component.
function useValidHookCall(): [number, React.Dispatch<React.SetStateAction<number>>] {
    const [count, setCount] = useState(0); // This hook call is now unconditional
    return [count, setCount];
}

// Rule: react-hooks/exhaustive-deps - CORRECTED
// 'data' is now included in the dependency array.
function CorrectDepComponent(): JSX.Element {
    const [count, setCount] = useState(0);
    const data = 10;

    useEffect(() => {
        console.log(count + data);
    }, [count, data]); // 'data' is now in the dependency array
    return <div>Count: {count}, Data: {data}</div>;
}


// --- eslint-plugin-jsx-a11y ---
// Rule: jsx-a11y/alt-text - CORRECTED
// 'alt' attribute added to images.
const ImageComponent = (): JSX.Element => <img src="logo.png" alt="Company Logo" />;

// Rule: jsx-a11y/anchor-is-valid - CORRECTED
// Anchor has a valid href or role attribute.
const AnchorComponent = (): JSX.Element => <a href="#valid-link">Click Me</a>;

// Exporting some components to avoid unused variable warnings if not used elsewhere
export {
    hasReturnType,
    usedParams,
    MyAppAngularComponent,
    ComponentWithKeys,
    ValidProperty,
    useValidHookCall,
    CorrectDepComponent,
    ImageComponent,
    AnchorComponent
};

// Example usage to prevent 'no-unused-vars' for imported modules if not explicitly used
console.log(a, b, data, myStrictObject);
console.log(typeof CSSProperties);
