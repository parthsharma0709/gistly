export const parseSection = (section: string): { title: string; points: string[] } => {
  const [title, ...content] = section.split('\n');
  const cleanTitle = title.startsWith('#') ? title.substring(1).trim() : title.trim();

  const points: string[] = [];
  let currentPoint = '';

  console.log('hewy', section.length);
  console.log('content is ', content);
  const emojiRegex = /^[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('•') || emojiRegex.test(trimmedLine)) {
      // treat emoji like a new bullet
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = '';
    } else {
      currentPoint += ' ' + trimmedLine;
    }
  });

  if (currentPoint) {
    points.push(currentPoint.trim());
  }

  return {
    title: cleanTitle,
    points: points.filter(
      (point) => point && !point.startsWith('#') && !point.startsWith('[choose'),
    ),
  };
};
