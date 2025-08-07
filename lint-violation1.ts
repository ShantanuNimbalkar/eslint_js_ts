// lint-violations.ts

// Violation 1: eslint-plugin-import - import/no-unresolved
// This line attempts to import from a module that likely does not exist,
// triggering the 'import/no-unresolved' rule.
import { nonExistentFunction } from 'non-existent-module-abc-123';

// Violation 2: eslint-plugin-react - react/display-name
// This functional component does not have a display name or is not assigned to a named variable,
// which violates the 'react/display-name' rule, especially in older React/ESLint setups
// or when specific configurations enforce it for debugging purposes.
function MyUnnamedComponent() {
  return (
    // Violation 3: eslint-plugin-no-secrets - no-secrets/no-secrets
    // This string contains a common keyword that ESLint's no-secrets plugin
    // identifies as a potential secret, triggering a violation.
    <div>
      Hello, this is a component. My API_KEY is: sk_live_your_secret_key_here
      {/* Attempt to use the non-existent function to ensure the import is not optimized away */}
      <button onClick={nonExistentFunction}>Click Me</button>
    </div>
  );
}

// Exporting the component to make it a module, even if it's unnamed.
export default MyUnnamedComponent;

// Another import to ensure import rules are active
import * as path from 'path';
console.log(path.join('hello', 'world'));

// A variable that is not used, which might trigger 'no-unused-vars' if configured,
// but not explicitly requested from the specified plugins.
const unusedVariable: string = "I am not used";


// --- Vue.js Plugin Violations ---

// Violation 4: eslint-plugin-vue - vue/no-reserved-component-names
// Defining a component-like object with a reserved name like 'component'.
// This rule checks for usage of reserved HTML or Vue component names.
const component = { // 'component' is a reserved name in Vue
  name: 'component',
  template: '<div>Reserved Name Component</div>'
};

// Violation 5: eslint-plugin-vue - vue/no-unused-properties
// Defining a prop ('unusedProp') in a Vue component that is not used within its template.
const AnotherVueComponent = {
  name: 'AnotherVueComponent',
  props: {
    unusedProp: String, // This prop is defined but not used in the template below
    usedProp: String
  },
  template: `
    <div>
      <p>{{ usedProp }}</p>
    </div>
  `
};


// --- Node.js Plugin Violations ---

// Violation 6: eslint-plugin-node - node/no-sync
// Using a synchronous file system method, which is generally discouraged in Node.js
// for performance and blocking reasons.
import * as fs from 'fs';
try {
  const fileContent = fs.readFileSync('/tmp/nonexistent.txt', 'utf-8');
  console.log(fileContent);
} catch (e) {
  // Error handling for readFileSync
}

// Violation 7: eslint-plugin-node - node/no-deprecated-api
// Using a deprecated Node.js API constructor. 'new Buffer()' is deprecated.
const oldBuffer = new Buffer('hello', 'utf8'); // This should trigger node/no-deprecated-api
console.log(oldBuffer.toString());


// --- Security Node Plugin Violations ---

// Violation 8: eslint-plugin-security-node - security-node/detect-child-process
// Spawning a child process, which can be a security risk if not handled carefully,
// especially with user-controlled input.
import { exec } from 'child_process';
exec('ls -la', (err, stdout, stderr) => {
  if (err) {
    // Error handling for exec
    return;
  }
  console.log(`stdout: ${stdout}`);
});

// Violation 9: eslint-plugin-security-node - security-node/detect-unsafe-regex
// Using a potentially vulnerable regular expression (catastrophic backtracking).
// Such regexes can lead to denial-of-service (DoS) attacks.
const unsafeRegex = /^(a+)+b$/; // This regex is prone to catastrophic backtracking
const testString = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaac';
unsafeRegex.test(testString);


// --- Promise Plugin Violations ---

// Violation 10: eslint-plugin-promise - promise/catch-or-return
// A Promise is created but its rejection is not handled with a .catch() or
// a second argument to .then().
function unhandledPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Something went wrong!')); // This rejection is not caught
    }, 100);
  });
}
unhandledPromise(); // This call will trigger the violation


// --- React Hooks Plugin Violations ---

// Violation 11: eslint-plugin-react-hooks - react-hooks/rules-of-hooks
// Calling a React Hook conditionally. Hooks must be called unconditionally
// at the top level of a function component or custom hook.
import React, { useState, useEffect } from 'react';

function MyConditionalHookComponent({ shouldUseHook }: { shouldUseHook: boolean }) {
  if (shouldUseHook) {
    // This violates the rule: Hooks must be called unconditionally
    const [count, setCount] = useState(0);
    useEffect(() => {
      console.log(`Count is: ${count}`);
    }, [count]);
  }
  return <div>Conditional Hook Test</div>;
}

// Exporting components to ensure they are part of the module structure
export const ReservedNameComponent = component;
export const UnusedPropComponent = AnotherVueComponent;
export const ConditionalHookComponent = MyConditionalHookComponent;

// Violation 12: eslint-plugin-no-secrets - no-secrets/no-secrets
// Another potential secret string.
const password = "mySuperSecretPassword123!";
console.log(password);
