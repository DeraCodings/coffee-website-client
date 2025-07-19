"use client";

import { lato } from "@/utils/font-config";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

export function BlockRendererClient({
  content,
}: {
  readonly content: BlocksContent;
}) {
  if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => (
          <p className={`w-[30ch] text-left leading-relaxed md:w-[75ch] my-4 ${lato.className}`}>
            {children}
          </p>
        ),
      }}
    />
  );
}
