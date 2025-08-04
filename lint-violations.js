// ==================================================================================================
// lint-violations.js
// This file contains intentional rule violations for JavaScript and related plugins.
// The code here is designed to fail linting so you can confirm your ESLint configuration works.
// ==================================================================================================

// --- Core ESLint Rules ---
// Rule: no-unused-vars
let unusedVariable = "I am never used.";

// Rule: no-extra-semi
const extraSemi = 123;;

// --- eslint-plugin-import ---
// Rule: import/no-unresolved
// This will fail if the module 'non-existent-module' does not exist.
import { something } from 'non-existent-module';

// Rule: import/no-duplicates
import { a } from './some-module';
import { b } from './some-module';

// --- eslint-plugin-promise ---
async function promiseViolations() {
  const myPromise = Promise.resolve("done");

  // Rule: promise/no-return-in-finally
  myPromise.finally(() => {
    return "This is a violation";
  });

  // Rule: promise/catch-or-return
  // The promise is not returned and has no .catch()
  myPromise.then(() => {
    console.log('No catch or return!');
  });
}

// --- eslint-plugin-jsdoc ---
// Rule: jsdoc/require-jsdoc
// This function is missing a JSDoc block.
function missingJSDoc(a, b) {
  return a + b;
}

// --- eslint-plugin-unicorn ---
// Rule: unicorn/no-for-loop
const arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// Rule: unicorn/prefer-includes
if (arr.indexOf(2) !== -1) {
  console.log("Found");
}

// --- eslint-plugin-security ---
// Rule: security/detect-eval-with-expression
const userCode = "console.log('hi')";
eval(userCode);

// Rule: security/detect-unsafe-regex
const regex = /^(a+)+$/;
"aaaaaaaaaaaaaaaaaaaaaaaaaaaa!".match(regex);

// --- eslint-plugin-no-secrets ---
// Rule: no-secrets/no-secrets
// This rule will flag the hardcoded string as a potential secret.
const API_KEY = "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

// --- eslint-plugin-react ---
// A simple function returning JSX to test React-specific rules
function MyComponent() {
  const items = [{ id: 1, text: "A" }];
  
  // Rule: react/jsx-key
  return (
    <ul>
      {items.map(item => <li>{item.text}</li>)}
    </ul>
  );
}

function AnotherComponent() {
  // Rule: react/no-unknown-property
  return <div class="container">Hello, world!</div>;
}

// --- eslint-plugin-react-hooks ---
function useMyCustomHook() {
  // Rule: react-hooks/rules-of-hooks
  // This hook call is inside a conditional, which is a violation.
  if (true) {
    const [count, setCount] = useState(0);
  }
}

function MissingDependency() {
  const [count, setCount] = useState(0);
  const otherValue = 1;
  
  // Rule: react-hooks/exhaustive-deps
  // 'otherValue' is used but not in the dependency array.
  useEffect(() => {
    console.log(count + otherValue);
  }, [count]);
}

// --- eslint-plugin-jsx-a11y ---
function A11yViolations() {
  // Rule: jsx-a11y/alt-text
  // Missing alt attribute on <img>
  return <img src="image.jpg" />;
}

function AnchorViolation() {
  // Rule: jsx-a11y/anchor-is-valid
  // An anchor without a valid href
  return <a onClick={() => alert('hi')}>Click me</a>;
}

// --- eslint-plugin-vue ---
// A simple Vue-like script block to test the plugin.
// This requires the file extension to be .vue for the parser to run correctly.
const myVueComponent = {
  // Rule: vue/no-unused-components
  // This component 'AppHeader' is not used in a template but is registered.
  components: {
    AppHeader: {}
  },
  data() {
    return {
      message: 'Hello Vue!'
    };
  }
};

// --- eslint-plugin-node ---
// Rule: node/no-unpublished-import
// This will fail if 'non-published-package' is not a dependency in your package.json.
import fs from 'non-published-package';

// Rule: node/no-unsupported-features
// This will fail if your Node.js version doesn't support a specific feature.
// Example: Using process.version for an old Node version check.
if (process.version === "v0.12.0") {
  // some old code
}

// --- eslint-plugin-security-node ---
// Rule: security-node/detect-buffer-unsafe-allocation
function unsafeBuffer() {
  // Direct use of new Buffer() is unsafe and a security-node violation.
  new Buffer(100);
}
