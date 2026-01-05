declare module 'react-phone-input-2' {
  import * as React from 'react';
  
  export interface PhoneInputProps {
    country?: string;
    value?: string;
    onChange?: (value: string, data: any, event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>, data: any) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>, data: any) => void;
    inputClass?: string;
    containerClass?: string;
    dropdownClass?: string;
    placeholder?: string;
    disabled?: boolean;
    [key: string]: any;
  }
  
  const PhoneInput: React.FC<PhoneInputProps>;
  
  export default PhoneInput;
} 