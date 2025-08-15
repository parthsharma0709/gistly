function parsePoint(point: string) {
    const isNumbered = /^\d+\./.test(point);
    const isMainPoint = /^\*/.test(point);

    // Replace the Unicode property escape with a simpler emoji detection
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u2600-\u26FF]/u;
    const hasEmoji = emojiRegex.test(point);
    const isEmpty = point.trim() === '';

    return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/[^\p{Emoji}\p{L}\p{N}\s.,!?-]/gu, '').trim();

  const matches = cleanContent.match(/(\p{Emoji})(.+)$/u);
  if (!matches) return null;

  const [, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}




export default function ContentSection({title,points}:{title:string;
    points:string[];
}){


        return <div className="space-y-4">
             {points.map((point,index)=>{
                const { isNumbered, isMainPoint, hasEmoji, isEmpty }=parsePoint(point);
                const {emoji,text}=parseEmojiPoint(point);
                if(hasEmoji || isMainPoint){
                   return (
  <div
    key={`point-${index}`}
    className="group relative bg-gradient-to-br from-gray-200/80 to-gray-400/80 p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

    <div className="relative flex items-start gap-3">
      <span className="text-lg lg:text-xl shrink-0">
        {emoji}
      </span>

      <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
        {text}
      </p>
    </div>
  </div>
);

                }
              return  <div
    key={`point-${index}`}
    className="group relative bg-gradient-to-br from-gray-200/80 to-gray-400/80 p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

    <div className="relative flex items-start gap-3">
      <span className="text-lg lg:text-xl shrink-0">
        {emoji}
      </span>

      <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
        {text}
      </p>
    </div>
  </div>
})}
        </div>
}