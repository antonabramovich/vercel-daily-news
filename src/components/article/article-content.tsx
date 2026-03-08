import Image from 'next/image';
import {ContentBlock} from '@/lib/api/client';

interface ArticleContentProps {
  blocks: ContentBlock[];
}

export function ArticleContent({ blocks }: ArticleContentProps) {
  return (
    <article>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={i}>{block.text}</p>
          case 'heading':
            return block.level === 2
              ? <h2 key={i}>{block.text}</h2>
              : <h3 key={i}>{block.text}</h3>
          case 'blockquote':
            return <blockquote key={i}>{block.text}</blockquote>
          case 'unordered-list':
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )
          case 'ordered-list':
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            )
          case 'image':
            return (
              <figure key={i}>
                <Image src={block.src} alt={block.alt} />
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            )
        }
      })}
    </article>
  );
}
