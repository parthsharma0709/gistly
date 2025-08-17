export function splitSections(summary: string): string[] {
  const lines = summary.split('\n');
  const sections: string[] = [];
  let current: string[] = [];

  const headerRegex = /^(#.*|[\p{Emoji_Presentation}\p{Extended_Pictographic}].*)$/u;

  for (const line of lines) {
    if (headerRegex.test(line.trim())) {
      if (current.length) sections.push(current.join('\n'));
      current = [line.trim()];
    } else {
      current.push(line);
    }
  }

  if (current.length) sections.push(current.join('\n'));

  return sections;
}
