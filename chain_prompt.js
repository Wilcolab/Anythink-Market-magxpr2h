/**
 * Converts a given string to kebab-case.
 * Handles basic cases: spaces and underscores to dashes, all lowercase.
 * Handles edge cases: multiple consecutive separators, camelCase, PascalCase, snake_case, kebab-case.
 * Returns an empty string for non-string or empty inputs.....
 *
 * @param {string} input - The string to convert.
 * @returns {string} The kebab-case version of the input string.
 */
function toKebabCase(input) {
    // Step 1: Error handling for non-string or empty input
    if (typeof input !== 'string') return '';
    let str = input.trim();
    if (!str) return '';

    // Step 2: Insert space before uppercase letters (for camelCase/PascalCase)
    str = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

    // Step 3: Replace all separators (spaces, underscores, dashes) with a single dash
    str = str.replace(/[\s_-]+/g, '-');

    // Step 4: Convert to lowercase
    str = str.toLowerCase();

    // Step 5: Remove leading/trailing dashes
    str = str.replace(/^-+|-+$/g, '');

    return str;
}

// Example usage:
// console.log(toKebabCase('Hello World')); // 'hello-world'
// console.log(toKebabCase('snake_case_example')); // 'snake-case-example'
// console.log(toKebabCase('PascalCaseString')); // 'pascal-case-string'
// console.log(toKebabCase('alreadyKebab-Case')); // 'already-kebab-case'
// console.log(toKebabCase('  multiple   spaces---and__underscores ')); // 'multiple-spaces-and-underscores'
// console.log(toKebabCase('')); // ''
// console.log(toKebabCase(123)); // ''
