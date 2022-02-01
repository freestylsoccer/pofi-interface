import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import styled from 'styled-components'

interface SliderProps {
  name: string
  min: number
  max: number
  value: number
  step?: number | 'any'
  onValueChanged: (newValue: number) => void
  valueLabel?: string
  disabled?: boolean
}

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isMax: boolean
}

interface SliderLabelProps {
  progress: string
}

interface DisabledProp {
  disabled?: boolean
}

const getCursorStyle = ({ disabled = false }: DisabledProp) => {
  return disabled ? 'not-allowed' : 'cursor'
}

const getBaseThumbStyles = ({ isMax, disabled }: StyledInputProps) => `
  -webkit-appearance: none;
  background-image: url("https://objectstorage.us-phoenix-1.oraclecloud.com/n/axdbiqmjmklf/b/bucket-20211203-1943/o/svg%2Fcircle.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  border: 0;
  cursor: ${getCursorStyle};
  width: 24px;
  height: 24px;
  bottom: 0px;
  filter: ${disabled ? 'grayscale(100%)' : 'none'};
  
  
`

export const BunnyButt = styled.div<DisabledProp>`
  height: 32px;
  filter: ${({ disabled }) => (disabled ? 'grayscale(100%)' : 'none')};
  position: absolute;
  width: 15px;
  display: none;
`

export const BunnySlider = styled.div`
  position: absolute;
  max-width: 830px;
  max-height: 450px;
  width: 100%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`

export const BarBackground = styled.div<DisabledProp>`
  height: 2px;
  position: absolute;
  bottom: 15px;
  width: 99%;
`

export const BarProgress = styled.div<DisabledProp>`
  filter: ${({ disabled }) => (disabled ? 'grayscale(100%)' : 'none')};
  height: 10px;
  position: absolute;
  bottom: 11.5px;
`

export const StyledInput = styled.input<StyledInputProps>`
  cursor: ${getCursorStyle};
  height: 32px;
  position: relative;
  width: 88%;
  ::-webkit-slider-thumb {
    ${getBaseThumbStyles}
  }

  ::-moz-range-thumb {
    ${getBaseThumbStyles}
  }

  ::-ms-thumb {
    ${getBaseThumbStyles}
  }
`

export const SliderLabelContainer = styled.div`
  bottom: 0;
  position: absolute;
  left: 0px;
`

const Slider: React.FC<SliderProps> = ({
  name,
  min,
  max,
  value,
  onValueChanged,
  valueLabel,
  step = 'any',
  disabled = false,
  ...props
}) => {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onValueChanged(parseFloat(target.value))
  }

  const progressPercentage = (value / max) * 100
  const isMax = value === max
  let progressWidth: string
  if (progressPercentage < 60 && value > 28) {
    progressWidth = `${progressPercentage + 0.5}%`
  } else if (progressPercentage >= 90) {
    progressWidth = `${progressPercentage - 1}%`
  } else if (progressPercentage >= 60) {
    progressWidth = `${progressPercentage - 1}%`
  } else {
    progressWidth = `${progressPercentage - 1}%`
  }
  const labelProgress = isMax ? 'calc(100% - 12px)' : `${progressPercentage}%`
  const displayValueLabel = isMax ? 'MAX' : valueLabel
  return (
    <div className="pb-4 text-center">
      <BunnyButt disabled={disabled} />
      <BunnySlider>
        <BarBackground disabled={disabled} />
        <BarProgress style={{ width: progressWidth }} disabled={disabled} />
        <StyledInput
          name={name}
          type="range"
          min={min}
          max={max}
          value={value}
          step={step}
          onChange={handleChange}
          isMax={isMax}
          disabled={disabled}
        />
      </BunnySlider>
      {valueLabel && (
        <SliderLabelContainer>
          <div>{displayValueLabel}</div>
        </SliderLabelContainer>
      )}
    </div>
  )
}

export default Slider
/*
const ProgressBar = ({ progressPercentage }) => {
	return (
		<div className='w-full h-2 overflow-hidden bg-gray-300 rounded'>
			<div
				style={{ width: `${progressPercentage}%` }}
				className={`h-full ${
					progressPercentage < 70 ? 'bg-red-600' : 'bg-green-600'
				}`}
			></div>
		</div>
	);
};

export default ProgressBar;
*/
