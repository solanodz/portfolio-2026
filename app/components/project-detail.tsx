import type { ProjectDetailBlock } from "../data";

export function ProjectDetail({
  detail,
}: {
  detail: string | ProjectDetailBlock[];
}) {
  if (typeof detail === "string") {
    return <p className="text-sm leading-relaxed text-muted">{detail}</p>;
  }

  return (
    <div className="space-y-3 text-sm leading-relaxed text-muted">
      {detail.map((block, index) => {
        switch (block.type) {
          case "p":
            return <p key={index}>{block.text}</p>;
          case "ul":
            return (
              <ul key={index} className="list-disc space-y-1.5 pl-4">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index} className="list-decimal space-y-1.5 pl-4">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
