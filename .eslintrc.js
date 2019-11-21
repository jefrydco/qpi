/** This lists all estlint conditions
 *  found: https://eslint.org/docs/rules/
 */

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['import', 'prettier'],
  "rules": {
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    'no-useless-constructor': 'off',
    'no-unused-vars': 'warn',
    'no-undef': 'off',
    'no-new': 'off',
    'eol-last': 'off'
  },
  // env: {
  //   commonjs: true,
  //   es6: true,
  //   node: true,
  //   "jest/globals": true
  // },
  // extends: "eslint:recommended",
  // parserOptions: {
  //   ecmaVersion: 11,
  //   sourceType: "module",
  // },
  // plugins: ["jest"],
  // rules: {
  //   //#region Possible Errors
  //   //"for-direction":              "error",        // enforce “for” loop update clause moving the counter in the right direction.
  //   //"getter-return":              "error",        // enforce return statements in getters
  //   //"no-async-promise-executor":  "error",        // disallow using an async function as a Promise executor
  //   //"no-await-in-loop":           "error",        // disallow await inside of loops
  //   //"no-compare-neg-zero":        "error",        // disallow comparing against -0
  //   //"no-cond-assign": ["error", "except-parens"], // disallow assignment operators in conditional expressions
  //   "no-console":                   "error",        // disallow the use of console
  //   //"no-constant-condition":      "error",        // disallow constant expressions in conditions
  //   //"no-control-regex":           "error",        // disallow control characters in regular expressions
  //   //"no-debugger":                "error",        // disallow the use of debugger
  //   //"no-dupe-args":               "error",        // disallow duplicate arguments in function definitions
  //   //"no-dupe-keys":               "error",        // disallow duplicate keys in object literals
  //   //"no-duplicate-case":          "error",        // disallow duplicate case labels
  //   //"no-empty":                   "error",        // disallow empty block statements
  //   //"no-empty-character-class":   "error",        // disallow empty character classes in regular expressions
  //   //"no-ex-assign":               "error",        // disallow reassigning exceptions in catch clauses
  //   //"no-extra-boolean-cast":      "error",        // disallow unnecessary boolean casts (e.g. !!!"")
  //   "no-extra-parens": ["error", "all"],            // disallow unnecessary parentheses
  //   //"no-extra-semi":              "error",        // disallow unnecessary semicolons (e.g. ;;)
  //   //"no-func-assign":             "error",        // disallow reassigning function declarations
  //   "no-import-assign":             "error",        // disallow assigning to imported bindings
  //   //"no-inner-declarations":      "error",        // disallow variable or function declarations in nested blocks
  //   //"no-invalid-regexp":          "error",        // disallow invalid regular expression strings in RegExp constructors
  //   "no-irregular-whitespace": ["error", {skipStrings: false}], // disallow irregular whitespace
  //   //"no-misleading-character-class": "error"      // disallow characters which are made with multiple code points in character class syntax (/^[👶🏻]$/u.test("👶🏻") → false)
  //   //"no-obj-call":                "error",        // disallow calling global object properties as functions
  //   //"no-prototype-builtins":      "error",        // disallow use of Object.prototypes builtins directly
  //   //"no-regex-spaces":            "error",        // disallow multiple spaces in regular expression literals
  //   //"no-sparse-arrays":           "error",        // disallow sparse arrays ([,,])
  //   "no-template-curly-in-string":  "error",        // disallow template literal placeholder syntax in regular strings (e.g. "Hello ${name}!")
  //   //"no-unexpected-multiline":    "error",        // disallow confusing multiline expressions (e.g. `const foo = bar\n(1 || 2).baz()`)
  //   //"no-unreachable":             "error",        // disallow unreachable code after return, throw, continue, and break statements,
  //   //"no-unsafe-finally":          "error",        // disallow control flow statements in finally blocks
  //   //"no-unsafe-negation":         "error",        // disallow negating the left operand of relational operators (e.g. `!a in b` → `!(a in b)`)
  //   //"require-atomic-updates":     "error",        // disallow assignments that can lead to race conditions due to usage of await or yield
  //   //"use-isnan":                  "error",        // require calls to isNaN() when checking for NaN
  //   //"valid-typeof":               "error",        // enforce comparing typeof expressions against valid strings
  //   //#endregion

  //   //#region Best Practices
  //   //"accessor-pairs":             "error",        // Enforces getter/setter pairs in objects and classes
  //   "array-callback-return":        "error",        // Enforces return statements in callbacks of array’s methods
  //   "block-scoped-var":             "error",        // Treat var as Block Scoped
  //   "class-methods-use-this":       "error",        // Enforce that class methods utilize this
  //   //"complexity": ["error", 20],                  // Limit Cyclomatic Complexity
  //   "consistent-return":            "error",        // require return statements to either always or never specify values
  //   "curly": ["error", "multi-or-nest", "consistent"], // Require Following Curly Brace Conventions
  //   //"default-case":               "error",        // Require Default Case in Switch Statements
  //   "default-param-last":           "error",        // enforce default parameters to be last
  //   "dot-location": ["error", "property"],          // Enforce newline before and after dot
  //   "dot-notation":                 "error",        // Require Dot Notation
  //   "eqeqeq": ["error", "always"],                  // Require === and !==
  //   //"guard-for-in":               "error",        // Require Guarding for-in
  //   "max-classes-per-file": ["error", 1],           // Enforce a maximum number of classes per file
  //   "no-alert":                     "error",        // Disallow Use of Alert
  //   "no-caller":                    "error",        // Disallow Use of caller/callee
  //   "no-case-declarations":         "error",        // Disallow lexical declarations in case/default clauses
  //   //"no-div-regex":               "error",        // Disallow Regular Expressions That Look Like Division
  //   "no-else-return":               "error",        // Disallow return before else
  //   "no-empty-function":            "error",        // Disallow empty functions
  //   "no-empty-pattern":             "error",        // Disallow empty destructuring patterns
  //   "no-eq-null":                   "error",        // Disallow Null Comparisons (eqeqeq)
  //   "no-eval":                      "error",        // Disallow eval()
  //   "no-extend-native":             "error",        // Disallow Extending of Native Objects
  //   "no-extra-bind":                "error",        // Disallow unnecessary function binding
  //   "no-extra-label":               "error",        // Disallow Unnecessary Labels
  //   "no-fallthrough":               "error",        // Disallow Case Statement Fallthrough
  //   "no-floating-decimal":          "error",        // Disallow Floating Decimals
  //   //"no-global-assign":           "error",        // Disallow assignment to native objects or read-only global variables
  //   //"no-implicit-coercion":       "error",        // Disallow the type conversion with shorter notations.
  //   "no-implicit-globals":          "error",        // disallow variable and function declarations in the global scope
  //   "no-implied-eval":              "error",        // Disallow Implied eval()
  //   "no-invalid-this":              "error",        // Disallow this keywords outside of classes or class-like objects.
  //   "no-iterator":                  "error",        // Disallow Iterator
  //   "no-labels":                    "error",        // Disallow Labeled Statements
  //   "no-lone-blocks":               "error",        // Disallow Unnecessary Nested Blocks
  //   "no-magic-numbers": ["error", {ignore: [0,1]}], // Disallow Magic Numbers (use consts)
  //   "no-multi-spaces": [                            // Disallow multiple spaces
  //     "error",
  //     {
  //       ignoreEOLComments: true,
  //       exceptions: {
  //         Property: true,
  //         VariableDeclarator: true,
  //         ImportDeclaration: true,
  //       }
  //     }
  //   ],
  //   "no-multi-str":                 "error",        // Disallow Multiline Strings
  //   "no-new":                       "error",        // Disallow new For Side Effects
  //   "no-new-func":                  "error",        // Disallow Function Constructor
  //   "no-new-wrappers":              "error",        // Disallow Primitive Wrapper Instances (`new Number("42")` → `Number("42")`)
  //   "no-octal":                     "error",        // Disallow octal literals 071 = 57
  //   "no-octal-escape":              "error",        // disallow octal escape sequences in string literals
  //   "no-param-reassign":            "error",        // Disallow Reassignment of Function Parameters
  //   "no-proto":                     "error",        // Disallow Use of __proto__
  //   "no-redeclare":                 "error",        // disallow variable redeclaration
  //   "no-restricted-properties":     "error",        // disallow certain object properties
  //   "no-return-assign": ["error", "always"],        // Disallow Assignment in return Statement
  //   "no-return-await":              "error",        // Disallows unnecessary return await
  //   "no-script-url":                "error",        // Disallow Script URLs
  //   "no-self-assign":               "error",        // Disallow Self Assignment (foo = foo)
  //   "no-self-compare":              "error",        // Disallow Self Compare (a === a)
  //   "no-sequences":                 "error",        // Disallow Use of the Comma Operator
  //   "no-throw-literal":             "error",        // Restrict what can be thrown as an exception (only Error)
  //   "no-unmodified-loop-condition": "error",        // Disallow unmodified conditions of loops
  //   "no-unused-expressions":        "error",        // Disallow Unused Expressions
  //   //"no-unused-labels":           "error",        // no-unused-labels
  //   "no-useless-call":              "error",        // Disallow unnecessary .call() and .apply()
  //   "no-useless-catch":             "error",        // Disallow unnecessary catch clauses
  //   "no-useless-concat":            "error",        // Disallow unnecessary concatenation of strings
  //   "no-useless-escape":            "error",        // Disallow unnecessary escape usage
  //   "no-useless-return":            "error",        // Disallow redundant return statements
  //   "no-void":                      "error",        // Disallow use of the void operator
  //   "no-warning-comments": ["warn", {terms: ["@todo", "@fixme"], location: "anywhere"}], // Disallow Warning Comments
  //   //"no-with":                    "error",        //disallow with statements 
  //   //"prefer-named-capture-group":   "warn",       // Suggest using named capture group in regular expression
  //   "prefer-promise-reject-errors": "error",        // require using Error objects as Promise rejection reasons
  //   "prefer-regex-literals":        "error",        // Disallow use of the RegExp constructor in favor of regular expression literals
  //   "radix":                        "error",        // Require Radix Parameter
  //   "require-await":                "error",        // Disallow async functions which have no await expression
  //   "require-unicode-regexp":       "error",        // Enforce the use of u flag on RegExp `/^[👍]$/.test("👍")` → false | `/^[👍]$/u.test("👍")` → true
  //   "vars-on-top":                  "error",        // Require Variable Declarations to be at the top of their scope
  //   //"wrap-iife":                  "error",        // Require IIFEs to be Wrapped
  //   "yoda": ["error", "never", { "onlyEquality": true }], // Require or disallow Yoda Conditions
  //   //#endregion

  //   //#region Variables
  //   //"init-declarations": ["error", "never", { "ignoreForLoopInit": true }], // require or disallow initialization in variable declarations
  //   //"no-delete-var":              "error",        // disallow deleting variables
  //   "no-label-var":                 "error",        // Disallow Labels That Are Variables Names
  //   //"no-restricted-globals":      "error",        // Disallow specific global variables
  //   "no-shadow":                    "error",        // disallow variable declarations from shadowing variables declared in the outer scope
  //   "no-shadow-restricted-names":   "error",        // Disallow Shadowing of Restricted Names
  //   //"no-undef":                   "error",        // Disallow Undeclared Variables
  //   "no-undef-init":                "error",        // Disallow Initializing to undefined
  //   "no-undefined":                 "error",        // Disallow Use of undefined Variable
  //   //"no-unused-vars":             "error",        // Disallow Unused Variables
  //   "no-use-before-define":         "error",        // Disallow Early Use
  //   //#endregion

  //   //#region NodeJS & CommonJS
  //   "callback-return": ["error", ["done", "cb", "callback", "next", "done"]], // Enforce Return After Callback
  //   "global-require":               "error",        // Enforce require() on the top-level module scope
  //   "handle-callback-err":          "error",        // Enforce Callback Error Handling
  //   "no-buffer-constructor":        "error",        // disallow use of the Buffer() constructor
  //   "no-mixed-requires": ["error", {grouping: true, allowCall: true}], // disallow require calls to be mixed with regular variable declarations
  //   "no-new-require":               "error",        // Disallow new require
  //   "no-path-concat":               "error",        // Disallow string concatenation when using __dirname and __filename (path.join)
  //   "no-process-env":               "error",        // Disallow process.env
  //   "no-process-exit":              "error",        // Disallow process.exit()
  //   //no-restricted-modules: ["error", "fs", "cluster"], // Disallow Node.js modules
  //   "no-sync":                      "warn",         // Disallow Synchronous Methods (e.g. fs.existsSync())
  //   //#endregion

  //   //#region Style
  //   "array-bracket-newline": ["error", "consistent"], // enforce line breaks after opening and before closing array brackets
  //   "array-bracket-spacing": ["error", "always", {    // Disallow or enforce spaces inside of brackets
  //     singleValue: false,
  //     objectsInArrays: false,
  //     arraysInArrays: false,
  //   }],
  //   "array-element-newline": ["error", "consistent"], // enforce line breaks between array elements
  //   //"block-spacing": ["error", "always"],             // Disallow or enforce spaces inside of blocks after opening block and before closing block
  //   "brace-style": ["error", "stroustrup", {allowSingleLine: true}], // Require Brace Style
  //   "camelcase": ["error", {properties: "always", ignoreDestructuring: true}], // Require CamelCase
  //   //"capitalized-comments":       "error",        // enforce or disallow capitalization of the first letter of a comment
  //   "comma-dangle": ["error", "always-multiline"],  // require or disallow trailing commas
  //   "comma-spacing": ["error", {before: false, after: true}], // Enforces spacing around commas
  //   "comma-style": ["error", "last"],               // Comma style
  //   "computed-property-spacing": ["error", "never"], // Disallow or enforce spaces inside of computed properties
  //   //"consistent-this": ["error", "self"],         // Require Consistent This
  //   "eol-last":                     "error",        // require or disallow newline at the end of files
  //   "func-call-spacing": ["error", "never"],        // require or disallow spacing between function identifiers and their invocations
  //   //"func-name-matching": ["error", "always"],    // require function names to match the name of the variable or property to which they are assigned
  //   "func-names": ["error", "as-needed"],           // Require or disallow named function expressions
  //   "func-style": ["error", "expression"],          // enforce the consistent use of either function declarations or expressions
  //   "function-call-argument-newline": ["error", "consistent"], // enforce line breaks between arguments of a function call
  //   "function-paren-newline": ["error", "consistent"], // enforce consistent line breaks inside function parentheses
  //   //"id-blacklist": ["error", "data"],            // disallow specified identifiers
  //   //"id-length": ["error", {min: 2, exceptions: ["i", "n", "e", "k", "c"]}], // enforce minimum and maximum identifier lengths
  //   //"id-match": ["error", "^[a-z]+([A-Z][a-z]+)*$"], // require identifiers to match a specified regular expression
  //   "implicit-arrow-linebreak": ["error", "beside"], // Enforce the location of arrow function bodies with implicit returns
  //   "indent": ["error", 2],                         // enforce consistent indentation
  //   "key-spacing": ["error", {                      // enforce consistent spacing between keys and values in object literal properties
  //     beforeColon: false,
  //     afterColon: true,
  //     mode: "minimum",
  //     align: "value"
  //   }],
  //   "keyword-spacing": ["error", {                  // enforce consistent spacing before and after keywords
  //     before: true,
  //     after: true
  //   }],
  //   //"line-comment-position": ["error", "beside"], // enforce position of line comments
  //   "linebreak-style": ["error", "unix"],           // enforce consistent linebreak style
  //   "lines-around-comment": ["error", {
  //     beforeBlockComment: true,                     // requires an empty line before block comments
  //     allowBlockStart: true,                        // allows comments to appear at the start of block statements
  //   }],
  //   "lines-between-class-members": ["error", "always", {exceptAfterSingleLine: true}], // require or disallow an empty line between class members
  //   //"max-depth": ["error", 4],                    // enforce a maximum depth that blocks can be nested
  //   "max-len": ["error", {                          // enforces a maximum line length
  //     code:                   80,                   // enforces a maximum line length
  //     tabWidth:               2,                    // specifies the character width for tab characters
  //     ignoreTrailingComments: true,                 // ignores only trailing comments,
  //     ignoreUrls:             true,                 // ignores lines that contain a URL
  //     ignoreStrings:          true,                 // ignores lines that contain a double-quoted or single-quoted string
  //     ignoreTemplateLiterals: true,                 // ignores lines that contain a template literal
  //     ignoreRegExpLiterals:   true,                 // ignores lines that contain a RegExp literal                               
  //   }],
  //   //"max-lines": ["error", {max: 200, skipComments: true, skipBlankLines: true}], // enforce a maximum file length
  //   "max-lines-per-function": ["error", 50],        // enforce a maximum function length
  //   "max-nested-callbacks": ["error", 5],           // enforce a maximum depth that callbacks can be nested
  //   "max-params": ["error", 5],                     // enforce a maximum number of parameters in function definitions,
  //   "max-statements": ["error", 25],                // enforce a maximum number of statements allowed in function blocks
  //   "max-statements-per-line": ["error", {max: 2}], // enforce a maximum number of statements allowed per line
  //   //"multiline-comment-style": ["error", "starred-block"], // enforce a particular style for multiline comments
  //   //"multiline-ternary": ["error", "never"],        // Enforce or disallow newlines between operands of ternary expressions
  //   "new-cap": ["error", {                          // require constructor names to begin with a capital letter
  //     newIsCap: true,                               // requires all new operators to be called with uppercase-started functions
  //     capIsNew: true,                               // requires all uppercase-started functions to be called with new operators.
  //     properties: true,                             // enables checks on object properties
  //   }],
  //   "new-parens": ["error", "always"],              // require parentheses when invoking a constructor with no arguments
  //   "newline-per-chained-call": ["error", {ignoreChainWithDepth: 3}], // require a newline after each call in a method chain
  //   "no-array-constructor":         "error",        // disallow Array constructors
  //   //"no-bitwise":                 "error",        // disallow bitwise operators
  //   //"no-continue":                "error",        // disallow continue statements
  //   //"no-inline-comments":         "error",        // disallow inline comments after code
  //   //"no-lonely-if":               "error",        // disallow if statements as the only statement in else blocks
  //   //"no-mixed-operators":         "error",        // Disallow mixes of different operators
  //   "no-mixed-spaces-and-tabs":     "error",        // disallow mixed spaces and tabs for indentation
  //   "no-multi-assign":              "error",        // Disallow Use of Chained Assignment Expressions
  //   "no-multiple-empty-lines": ["error", {max:1}],  // disallow multiple empty lines
  //   "no-negated-condition":         "error",        // disallow negated conditions
  //   //"no-nested-ternary":          "error",        // disallow nested ternary expressions
  //   "no-new-object":                "error",        // disallow Object constructors
  //   //"no-plusplus":                "error",        // disallow the unary operators ++ and --
  //   //"no-restricted-syntax": ["error", [...]],     // disallow specified syntax
  //   "no-tabs":                      "error",        // disallow all tabs
  //   //"no-ternary":                 "error",        // disallow ternary operators 
  //   "no-trailing-spaces":           "error",        // disallow trailing whitespace at the end of lines
  //   "no-underscore-dangle": ["error", {             // disallow dangling underscores in identifiers
  //     allowAfterThis: true,                         // disallows dangling underscores in members of the this object
  //     enforceInMethodNames: true,                   // allows dangling underscores in method names
  //     allow: ["_id"],
  //   }],
  //   "no-unneeded-ternary":          "error",        // disallow ternary operators when simpler alternatives exist
  //   "no-whitespace-before-property": "error",       // disallow whitespace before properties
  //   //"nonblock-statement-body-position": ["error", "beside", {overrides: {while: "below"}}], // enforce the location of single-line statements
  //   "object-curly-newline": ["error", {consistent: true}], // enforce consistent line breaks inside brace
  //   "object-curly-spacing": ["error", "always", {   // enforce consistent spacing inside braces
  //     arraysInObjects: false,                       // disallows spacing inside of braces of objects beginning and/or ending with an array element (applies when the first option is set to always)
  //     objectsInObjects: false,                      // disallows spacing inside of braces of objects beginning and/or ending with an object element (applies when the first option is set to always)
  //   }],
  //   "object-property-newline": ["error", {allowAllPropertiesOnSameLine: true}], // enforce placing object properties on separate lines
  //   "one-var": ["error", "never"],                  // enforce variables to be declared either together or separately in functions
  //   "one-var-declaration-per-line": ["error", "always"], // require or disallow newlines around variable declarations
  //   //"operator-assignment": ["error", "always"],   // require or disallow assignment operator shorthand where possible
  //   "operator-linebreak": ["error", "before"],      // enforce consistent linebreak style for operators
  //   "padded-blocks": ["error", "never"],            // require or disallow padding within blocks
  //   //"padding-line-between-statements": ["error", ...], // Require or disallow padding lines between statements
  //   "prefer-object-spread":         "error",        // Prefer use of an object spread over Object.assign
  //   "quote-props": ["error", "consistent-as-needed"], // require quotes around object literal property names
  //   "quotes": ["error", "double", {                 // enforce the consistent use of either backticks, double, or single quotes
  //     avoidEscape: true,                            // alows strings to use single-quotes or double-quotes so long as the string contains a quote that would have to be escaped otherwise
  //     allowTemplateLiterals: false,                 // allows strings to use backticks
  //   }],
  //   "semi": ["error", "never"],                     // require or disallow semicolons instead of ASI
  //   "semi-spacing": ["error", {before: false, after: true}], // Enforce spacing before and after semicolons
  //   "semi-style": ["error", "first"],               // Enforce location of semicolons
  //   //"sort-keys":                  "error",        // require object keys to be sorted
  //   "sort-vars": ["error", {ignoreCase: true }],    // Variable Sorting
  //   //"space-before-blocks": ["error", "never", { functions: "always"}], // Require Or Disallow Space Before Blocks
  //   "space-before-function-paren": ["error", {      // Require or disallow a space before function parenthesis
  //     anonymous:  "always",                         // is for anonymous function expressions (e.g. function () {}).
  //     named:      "never",                          // is for named function expressions (e.g. function foo () {}).
  //     asyncArrow: "always",                         // is for async arrow function expressions (e.g. async () => {}).
  //   }], 
  //   "space-in-parens": ["error", "never"],          // Disallow or enforce spaces inside of parentheses
  //   "space-infix-ops":              "error",        // require spacing around infix operators
  //   "space-unary-ops":              "error",        // Require or disallow spaces before/after unary operators
  //   "spaced-comment": ["error", "always", {         // Requires or disallows a whitespace (space or tab) beginning a comment
  //     markers: ["#region", "#endregion"]
  //   }],
  //   "switch-colon-spacing": ["error", {before: false, after: true}], // Enforce spacing around colons of switch statements
  //   "template-tag-spacing": ["error", "never"],     // Require or disallow spacing between template tags and their literals
  //   "unicode-bom": ["error", "never"],              // Require or disallow the Unicode Byte Order Mark (BOM)
  //   // "wrap-regex": "error",                       // Require Regex Literals to be Wrapped
  //   //#endregion

  //   //#region es6
  //   "arrow-body-style": ["error", "as-needed"],     // Require braces in arrow function body
  //   "arrow-parens": ["error", "as-needed"],         // Require parens in arrow function arguments
  //   "arrow-spacing": ["error", {before: true, after: true}], // Require space before/after arrow function’s arrow
  //   "constructor-super":            "error",        // Verify calls of super() in constructors
  //   "generator-star-spacing": ["error", {before: true, after: false}], // Enforce spacing around the * in generator functions,
  //   "no-class-assign":              "error",        // Disallow modifying variables of class declarations
  //   "no-confusing-arrow": ["error", {allowParens: true}], // Disallow arrow functions where they could be confused with comparisons
  //   "no-const-assign":              "error",        // Disallow modifying variables that are declared using const
  //   "no-dupe-class-members":        "error",        // Disallow duplicate name in class members
  //   "no-duplicate-imports":         "error",        // Disallow duplicate imports
  //   "no-new-symbol":                "error",        // Disallow Symbol Constructor
  //   //"no-restricted-imports": ["error", ...],      // Disallow specific imports
  //   "no-this-before-super":         "error",        // Disallow use of this/super before calling super() in constructors.
  //   "no-useless-computed-key":      "error",        // Disallow unnecessary computed property keys on objects 
  //   "no-useless-constructor":       "error",        // Disallow unnecessary constructor
  //   "no-useless-rename":            "error",        // Disallow renaming import, export, and destructured assignments to the same name
  //   "no-var":                       "error",        // require let or const instead of var
  //   "object-shorthand":             "error",        // Require Object Literal Shorthand Syntax
  //   "prefer-arrow-callback":        "error",        // Require using arrow functions for callbacks
  //   "prefer-const":                 "error",        // Suggest using const
  //   "prefer-destructuring":         "error",        // Prefer destructuring from arrays and objects
  //   "prefer-numeric-literals":      "error",        // disallow parseInt() and Number.parseInt() in favor of binary, octal, and hexadecimal literals
  //   "prefer-rest-params":           "error",        // Suggest using the rest parameters instead of arguments
  //   "prefer-spread":                "error",        // Suggest using spread syntax instead of .apply()
  //   "prefer-template":              "error",        // Suggest using template literals instead of string concatenation.
  //   "require-yield":                "error",        // Disallow generator functions that do not have yield
  //   "rest-spread-spacing": ["error", "never"],      // Enforce spacing between rest and spread operators and their expressions
  //   "sort-imports":                 "error",        // Import Sorting
  //   "symbol-description":           "error",        // require symbol description
  //   "template-curly-spacing":       "error",        // template-curly-spacing
  //   "yield-star-spacing": ["error", "before"],      // Enforce spacing around the * in yield* expressions
  //   //#endregion

  //   //#region deprecated
  //   "require-jsdoc": ["error", {                    // require JSDoc comments
  //     require: {
  //       FunctionDeclaration: true,
  //       MethodDefinition: true,
  //       ClassDeclaration: true,
  //       ArrowFunctionExpression: true,
  //       FunctionExpression: true
  //     }
  //   }],
  //   "valid-jsdoc": ["error", {                      // enforce valid JSDoc comments
  //     prefer: {
  //       return: "returns",
  //       arg: "param",
  //       argument: "param",
  //       constructor: "class"
  //     },
  //     preferType: {
  //       object: "Object",
  //       string: "String",
  //       number: "Number",
  //       boolean: "Boolean",
  //     },
  //     requireReturn: false,
  //     requireReturnType: true,
  //     requireParamDescription: true,
  //     requireReturnDescription: true,
  //     requireParamType: true
  //   }],
  //   //#endregion

  //   //#region jest
  //   "jest/no-disabled-tests": "warn",
  //   "jest/no-focused-tests": "error",
  //   "jest/no-identical-title": "error",
  //   "jest/prefer-to-have-length": "warn",
  //   "jest/valid-expect": "error",
  //   //#endregion
  // }
}