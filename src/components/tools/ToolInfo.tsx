interface ToolInfoSection {
  title: string;
  content: string | React.ReactNode;
}

interface ToolInfoProps {
  sections: ToolInfoSection[];
}

export default function ToolInfo({ sections }: ToolInfoProps) {
  return (
    <div className="mt-12 space-y-8 border-t border-gray-200 pt-8 dark:border-gray-800">
      {sections.map((section, i) => (
        <section key={i}>
          <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            {section.title}
          </h2>
          <div className="prose prose-sm prose-gray max-w-none text-gray-600 dark:prose-invert dark:text-gray-400">
            {typeof section.content === "string" ? (
              <p>{section.content}</p>
            ) : (
              section.content
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
