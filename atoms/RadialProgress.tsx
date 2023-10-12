import React from "react";

type RadialProgressProps = {
  strokeWidth: number;
  radius: number;
  percent: number;
  stat: string;
  caption: string;
  classes: {
    text: string;
  };
};

const RadialProgress: React.FC<RadialProgressProps> = ({ strokeWidth, radius, percent, stat, caption, classes }) => {
  const normalizedR = radius - strokeWidth * 2;
  const circumference = 2 * Math.PI * normalizedR;
  return (
    <div className="text-center">
      <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full">
        <span className={`${classes.text} absolute text-lg font-black`}>{stat}</span>
        <svg height={radius * 2} width={radius * 2} className="-rotate-90">
          <circle
            className="text-gray-300"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={normalizedR}
            cx={radius}
            cy={radius}
          />
          <circle
            className={classes.text}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (percent / 100) * circumference}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={normalizedR}
            cx={radius}
            cy={radius}
          />
        </svg>
      </div>
      <p className="-mt-4 text-base">{caption}</p>
    </div>
  );
};

export default RadialProgress;
