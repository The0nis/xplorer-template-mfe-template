import React from 'react';

interface PieChartProps {
  data: { value: number; color: string }[];
  size: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, size }) => {
  const total = data.reduce((sum, segment) => sum + segment.value, 0);

  const radius = size / 2;
  const strokeWidth = size; 
  const center = size / 2;

  const calculateArc = (startAngle: number, endAngle: number) => {
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  let startAngle = 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className="block mx-auto"
    >
      {data.map((segment, index) => {
        const endAngle = startAngle + (2 * Math.PI * (segment.value / total));
        const pathData = calculateArc(startAngle, endAngle);

        startAngle = endAngle;

        return (
          <path
            key={index}
            d={pathData}
            fill={segment.color}
          />
        );
      })}
    </svg>
  );
};

export default PieChart;
