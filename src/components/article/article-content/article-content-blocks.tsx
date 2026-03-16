import Image from 'next/image';
import Markdown from 'react-markdown';
import {getArticleContent} from "@/lib/data-access/articles";

export interface ArticleContentBlocksProps {
  slug: string;
}

export async function ArticleContentBlocks({ slug }: ArticleContentBlocksProps) {
  const blocks = await getArticleContent(slug);

  return (
    <article className={'prose md:prose-xl max-w-4xl mx-auto'}>
      {blocks?.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return <Markdown key={i}>{block.text}</Markdown>
          case 'heading':
            return block.level === 2
              ? <h2 key={i}>
                <Markdown>{block.text}</Markdown>
              </h2>
              : <h3 key={i}>
                <Markdown>{block.text}</Markdown>
              </h3>
          case 'blockquote':
            return <blockquote key={i}>
              <Markdown>{block.text}</Markdown>
            </blockquote>
          case 'unordered-list':
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Markdown>{item}</Markdown>
                  </li>
                ))}
              </ul>
            )
          case 'ordered-list':
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Markdown>{item}</Markdown>
                  </li>
                ))}
              </ol>
            )
          case 'image':
            return block.src ? (
              <figure key={i}>
                <Image src={block.src} alt={block.alt} />
                {block.caption && <figcaption>
                  <Markdown>{block.caption}</Markdown>
                </figcaption>}
              </figure>
            ) : null
        }
      })}
    </article>
  );
}
