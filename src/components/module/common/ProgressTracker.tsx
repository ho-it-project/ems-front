import { cn } from "@/lib/utils";
import { BrandColor } from "@/type";

interface ProgressTrackerProps {
  steps: string[];
  currentStep: number;
  progressColor?: BrandColor;
  defaultColor?: BrandColor;
}

export const ProgressTracker = ({
  steps,
  currentStep,
  progressColor = "main",
  defaultColor = "lgrey",
}: ProgressTrackerProps) => {
  const currentStepIndex = currentStep - 1;

  const currentStepColor = `bg-${progressColor}`;
  const defaultStepColor = `bg-${defaultColor}`;

  const currentBorderColor = `border-${progressColor}`;
  const defaultBorderColor = `border-${defaultColor}`;

  const gradientColor = `bg-gradient-to-l from-${progressColor}`;
  const defaultGradientColor = `bg-gradient-to-l from-${defaultColor}`;

  const currentTextColor = `text-${progressColor}`;
  const defaultTextColor = `text-${defaultColor}`;
  return (
    <div>
      <div className="relative flex flex-row items-center justify-between">
        {steps.map((step, index) => {
          return (
            <div
              className="relative flex flex-[1] items-center"
              key={`progree-${step}`}
            >
              <div className="absolute inset-0 -top-[100%] flex items-center justify-end px-[2rem]">
                <span
                  className={cn(
                    `fontSize-small`,
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
                  index === 0 && currentStep >= index
                    ? gradientColor
                    : index === 0 && currentStep < index
                    ? defaultGradientColor
                    : "",
                  index <= currentStepIndex && index !== 0
                    ? currentStepColor
                    : defaultStepColor
                )}
              ></div>
              <div
                className={cn(
                  `flex  min-h-[1.5rem] min-w-[1.5rem] items-center justify-center rounded-full border`,
                  index <= currentStepIndex
                    ? currentBorderColor
                    : defaultBorderColor
                )}
              >
                <div
                  className={cn(
                    "h-[1rem] w-[1rem] rounded-full",
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
