export function formatFileNameAsTitle(fileName: string): string {
  // 1 Remove file extension (.pdf, .txt, etc.)
  const withoutExtension = fileName.replace(/\.[^/.]+$/, '');

  // 2  Replace special characters:
  // - Replace dashes (-) and underscores (_) with spaces
  // - Add a space between camelCase words
  const withSpaces = withoutExtension
    .replace(/[-_]+/g, ' ') // turns "my-file_name" → "my file name"
    .replace(/([a-z])([A-Z])/g, '$1 $2'); // turns "myFileName" → "my File Name"

  // 3 Convert each word to Title Case (first letter uppercase, rest lowercase)
  return withSpaces
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}
