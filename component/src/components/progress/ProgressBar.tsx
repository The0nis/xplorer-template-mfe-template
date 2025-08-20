import React from 'react';
import styled from 'styled-components';

interface Section {
    color: string;
    percentage?: number;
    value?: number;
    maxValue?: number;
}

interface ProgressBarProps {
    sections: Section[];
    usePercentage?: boolean;
    maxValue?: number;
    defaultColor?: string;
    height?: 'small' | 'medium';
}

const heightStyles = {
    small: '8px',
    medium: '14px',
};

const ProgressBarContainer = styled.div<{ height: string }>`
  display: flex;
  width: 100%;
  height: ${(props) => props.height};
  background-color: #e0e0e0; /* Default background color */
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressItem = styled.span<{ color: string; width: string }>`
  height: 100%;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
`;

const ProgressBar: React.FC<ProgressBarProps> = ({
    sections,
    usePercentage = true,
    maxValue = 100,
    defaultColor = '#e0e0e0',
    height = 'small',
}) => {
    const totalFilled = usePercentage
        ? 100
        : sections.reduce((acc, section) => acc + (section.value ?? 0), 0);

    return (
        <ProgressBarContainer height={heightStyles[height]}>
            {sections.map((section, index) => (
                <ProgressItem
                    key={index}
                    color={section.color}
                    width={
                        usePercentage
                            ? `${section.percentage ?? 0}%`
                            : `${((section.value ?? 0) / maxValue) * 100}%`
                    }
                />
            ))}
            {!usePercentage && totalFilled < maxValue && (
                <ProgressItem
                    color={defaultColor}
                    width={`${((maxValue - totalFilled) / maxValue) * 100}%`}
                />
            )}
        </ProgressBarContainer>
    );
};

export default ProgressBar;
