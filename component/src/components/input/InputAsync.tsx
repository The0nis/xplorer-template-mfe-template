import React, {
    FC,
    InputHTMLAttributes,
    useState,
    useEffect,
    useRef,
  } from "react";
  import styled from "styled-components";
  import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
  import SelectDropdown, { Option } from "../dropdown/SelectDropdown";
  import { RiUser3Fill } from "react-icons/ri";
  
  // Define types for the component props
  interface InputAsyncProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name?: string;
    error?: string;
    variant?: "default" | "outlined" | "filled";
    type?: string;
    className?: string;
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
    options?: Option[];
    onChange?: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
    width?: string;
    height?: string;
    iconSize?: number;
    placeholder?: string;
    value?: string;
    listContainerWidth?: string;
    autocompleteData?: Option[];
    maxLengthTextVal?: number;
    filterField?: string;
    dropdownIcon?: React.ReactNode;
  }
  
  // Styled components for different input variants
  const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
  `;
  
  const Label = styled.label`
    font-size: 0.875rem;
    color: #333;
  `;
  
  const StyledInput = styled.input<{
    $variant: string;
    $error?: boolean;
    $width?: string;
    $isFocused?: boolean;
  }>`
    padding: 0.6rem 0.75rem;
    font-size: 14px;
    border: 1px solid ${({ $error }) => ($error ? "#C4C4C4" : "#C4C4C4")};
    border-radius: 10px;
    background-color: ${({ $variant }) =>
      $variant === "filled" ? "#f9f9f9" : "transparent"};
    outline: none;
    transition: border-color 0.3s ease;
    width: ${({ $width }) => $width || "100%"};
    border-color: ${({ $isFocused }) => ($isFocused ? "#C4C4C4" : "#C4C4C4")};
  
    &:focus {
      border-color: ${({ $isFocused }) => ($isFocused ? "#C4C4C4" : "black")};
    }
  
    &:disabled {
      background-color: #e0e0e0;
      cursor: not-allowed;
    }
  `;
  
  const ErrorMessage = styled.span`
    font-size: 0.75rem;
    color: red;
    margin-top: 0.25rem;
  `;
  
  const ToggleButton = styled.button`
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: black;
    font-size: 1.25rem;
  `;
  
  const DropdownWrapper = styled.div`
    position: relative;
  `;
  
  const DropdownList = styled.ul<{
    $width?: string;
  }>`
    position: absolute;
    z-index: 10;
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #fff;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #fafafa;
    border-radius: 5px;
    width: ${({ $width }) => $width || "100%"};
    max-height: 150px;
    overflow-y: auto;
  `;
  
  const DropdownItem = styled.li`
    padding: 0.5rem;
    cursor: pointer;
    color: #212529;
    font-size: 14px;
    display: flex;
    align-items: center;
  
    &:hover {
      background-color: #f0f0f0;
    }
  `;
  
  // Reusable Input Component
  const InputAsync: FC<InputAsyncProps> = ({
    label,
    name,
    error,
    variant = "default",
    type = "text",
    className,
    icon,
    iconPosition = "start",
    onChange,
    width,
    height,
    iconSize,
    placeholder,
    value,
    listContainerWidth,
    autocompleteData = [],
    maxLengthTextVal,
    filterField = "label",
    dropdownIcon,
    ...props
  }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [autocompleteResults, setAutocompleteResults] =
      useState<Option[]>(autocompleteData);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    // Toggle password visibility
    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev);
    };
  
    // Handle autocomplete input change
    const handleAutocompleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
  
      const filteredOptions = autocompleteData.filter((option) => {
        const fieldValue = option[filterField as keyof Option];
        return fieldValue
          ?.toString()
          .toLowerCase()
          .includes(inputValue.toLowerCase());
      });
  
      setAutocompleteResults(filteredOptions);
      setShowDropdown(true);
      if (onChange) onChange(e);
    };
  
    // Handle focus and blur events
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
  
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setShowDropdown(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dropdownRef]);
  
    // Determine the actual type for the input
    const inputType = type === "password" && !showPassword ? "password" : "text";
  
    // Reset filtered options when autocompleteData changes
    useEffect(() => {
      setAutocompleteResults(autocompleteData);
    }, [autocompleteData]);
  
    return (
      <InputWrapper className={className} ref={dropdownRef}>
        <div>{label && <Label htmlFor={props.id}>{label}</Label>}</div>
  
        <div style={{ position: "relative" }}>
          {icon && iconPosition === "start" && (
            <span
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                marginRight: "5px",
              }}
            >
              {icon}
            </span>
          )}
          {type === "select" ? (
            <SelectDropdown
              options={props.options || []} // Use options only for select type
              onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
              width={width}
              height={height}
              iconSize={iconSize}
              placeholder={placeholder}
              value={value}
              listContainerWidth={listContainerWidth}
              maxLengthTextVal={maxLengthTextVal}
              name={name}
              {...props}
            />
          ) : type === "autocomplete" ? (
            <DropdownWrapper>
              <StyledInput
                name={name}
                $variant={variant}
                $error={!!error}
                $width={width}
                $isFocused={isFocused}
                type="text"
                value={value}
                onChange={handleAutocompleteChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                style={{
                  paddingLeft: icon && iconPosition === "start" ? "2.5rem" : "", // Add padding if icon is at start
                  paddingRight: icon && iconPosition === "end" ? "2.5rem" : "", // Add padding if icon is at end
                }}
                {...props}
              />
              {showDropdown && autocompleteResults.length > 0 && (
                <DropdownList $width={width}>
                  {autocompleteResults.map((option, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => {
                        if (onChange) {
                          const event = {
                            target: { value: option[filterField] },
                          } as unknown as React.ChangeEvent<HTMLInputElement>;
                          onChange(event);
                        }
                        setShowDropdown(false);
                      }}
                    >
                      {dropdownIcon && (
                        <span className="mr-3">{dropdownIcon}</span>
                      )}
                      {option[filterField]}
                    </DropdownItem>
                  ))}
                </DropdownList>
              )}
            </DropdownWrapper>
          ) : (
            <StyledInput
              name={name}
              $variant={variant}
              $error={!!error}
              $width={width}
              type={inputType}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              style={{
                paddingLeft: icon && iconPosition === "start" ? "2.5rem" : "", // Add padding if icon is at start
                paddingRight: icon && iconPosition === "end" ? "2.5rem" : "", // Add padding if icon is at end
              }}
              {...props}
            />
          )}
          {type === "password" && (
            <ToggleButton onClick={handleTogglePassword}>
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </ToggleButton>
          )}
          {icon && iconPosition === "end" && (
            <span
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {icon}
            </span>
          )}
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputWrapper>
    );
  };
  
  export default InputAsync;
  