import { useState, ChangeEvent, FocusEvent } from 'react'

const CURRENCY_FORMATS = {
  NGN: { symbol: "₦ ", position: "before" },
  USD: { symbol: "$", position: "before" },
  EUR: { symbol: " €", position: "after" },
}

interface CurrencyInputProps {
  value: string | number
  onChange: (value: string) => void
  option?: {
    currency: keyof typeof CURRENCY_FORMATS
    locale: string
  }
}

export default function CurrencyInput({ 
  value, 
  onChange, 
  option = { currency: "NGN", locale: "en" } 
}: CurrencyInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [lastValidValue, setLastValidValue] = useState(value.toString())

  const formatValue = () => {
    if (isFocused) return value

    const { currency } = option
    const { symbol, position } = CURRENCY_FORMATS[currency] || {}

    const formattedValue = parseFloat(value.toString()).toLocaleString(option.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    return position === "before" ? `${symbol}${formattedValue}` : `${formattedValue}${symbol}`
  }

  const handleInput = (newValue: string) => {
    newValue = removeLeadingZeros(newValue)

    if (isValidNumber(newValue)) {
      setLastValidValue(newValue)
      onChange(newValue)
    } else {
      onChange(lastValidValue)
    }
  }

  const isValidNumber = (value: string) => {
    const regex = /^\d+(\.\d{1,2})?$/
    return !isNaN(Number(value)) && value.trim() !== "" && regex.test(value)
  }

  const removeLeadingZeros = (value: string) => {
    return value.replace(/^0+(?!\.)/, "")
  }

  return (
    <div>
      <input
        value={formatValue()}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false)
          if (!isValidNumber(value.toString())) {
            onChange(lastValidValue)
          }
        }}
        className="form-input w-full lg:w-3/5"
      />
    </div>
  )
}