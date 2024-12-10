/* eslint-disable */

import { TutorialStep } from "./types";

interface TutorialContentProps {
  step: TutorialStep;
}

export default function TutorialContent({ step }: TutorialContentProps) {
  return (
    <div className="mb-20">
      <h3 className="text-20-500 mb-10 font-semibold text-gray-800">
        {step.title}
      </h3>

      <div className="space-y-20">
        {step.content.map((item, idx) => (
          <div key={`${step.title}-content-${idx}`}>
            <h4 className="text-16-600 text-gray-700 mb-10">{item.subtitle}</h4>
            <p className="text-14-500 text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
