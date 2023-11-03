interface SymptomLabeledProps {
  title: string;
  description: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

export const SymptomLabel = ({
  title,
  description,
  children,
}: SymptomLabeledProps) => {
  return (
    <div className="flex h-[6.5rem] w-full items-center gap-[7rem]">
      <div className="flex min-w-[11rem] max-w-[11rem] flex-col justify-center">
        <span className="text-main">{title}</span>
        <span className="fontSize-small text-lgrey">{description}</span>
      </div>
      <div className="flex h-full w-full flex-col justify-center rounded-lg bg-white">
        {children}
      </div>
    </div>
  );
};
