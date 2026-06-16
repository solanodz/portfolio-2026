import { additional } from "../data";

export function AdditionalWork() {
  return (
    <ul className="space-y-4">
      {additional.map((item) => (
        <li key={item.lead} className="border-l border-line pl-4">
          <p className="text-sm leading-relaxed text-secondary">
            <span className="font-medium text-text">{item.lead}.</span>{" "}
            {item.detail}
          </p>
        </li>
      ))}
    </ul>
  );
}
