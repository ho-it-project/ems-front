import { cn } from "@/lib/utils";
import { BrandColor, FontSize } from "@/type";

interface ProgressTrackerProps {
  steps: string[];
  currentStep: number;
  progressColor?: BrandColor;
  defaultColor?: BrandColor;
  fontSize?: FontSize;
}

type GradientColor = {
  [key in BrandColor]: `from-${key}`;
};

export const ProgressTracker = ({
  steps,
  currentStep,
  progressColor = "main",
  defaultColor = "lgrey",
  fontSize = "small-l",
}: ProgressTrackerProps) => {
  const gradient: GradientColor = {
    main: "from-main",
    main30: "from-main30",
    bg: "from-bg",
    white: "from-white",
    black: "from-black",
    grey: "from-grey",
    lgrey: "from-lgrey",
    red: "from-red",
    yellow: "from-yellow",
    transparent: "from-transparent",
  };
  const currentStepIndex = currentStep - 1;

  const currentStepColor = `bg-${progressColor}`;
  const defaultStepColor = `bg-${defaultColor}`;

  const currentBorderColor = `border-${progressColor}`;
  const defaultBorderColor = `border-${defaultColor}`;

  const gradientColor = cn(`bg-gradient-to-l`, gradient[progressColor]);
  const defaultGradientColor = cn(`bg-gradient-to-l`, gradient[defaultColor]);

  const currentTextColor = `text-${progressColor}`;
  const defaultTextColor = `text-${defaultColor}`;
  return (
    <div>
      <div
        className={cn("relative flex flex-row items-center justify-between")}
      >
        {steps.map((step, index) => {
          return (
            <div
              className="relative flex flex-[1] items-center"
              key={`progree-${step}`}
            >
              <div className="absolute inset-0 -top-[100%] flex items-center justify-end px-[2rem]">
                <span
                  className={cn(
                    `fontSize-${fontSize}`,
                    index <= currentStepIndex
                      ? currentTextColor
                      : defaultTextColor
                  )}
                >
                  {step}
                </span>
              </div>
              <div
                className={cn(
                  "bg-backgroundImage-gradient h-[0.1rem] w-full",
                  index === 0 && currentStepIndex >= index
                    ? gradientColor
                    : index === 0 && currentStepIndex < index
                    ? defaultGradientColor
                    : "",
                  index <= currentStepIndex && index !== 0
                    ? currentStepColor
                    : index !== 0
                    ? defaultStepColor
                    : ""
                )}
              ></div>
              <div
                className={cn(
                  `flex h-[1.5rem] min-h-[1.5rem] w-[1.5rem] min-w-[1.5rem] rounded-full border`,
                  index <= currentStepIndex
                    ? currentBorderColor
                    : defaultBorderColor
                )}
              >
                <div
                  className={cn(
                    "inset-0 h-[1rem] min-h-[1rem] w-[1rem] min-w-[1rem] translate-x-[0.15rem] translate-y-[0.15rem] rounded-full",
                    index <= currentStepIndex
                      ? currentStepColor
                      : defaultStepColor
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
