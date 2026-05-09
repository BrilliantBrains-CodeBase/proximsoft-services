import { useState, useId } from 'react'

const DIAL_CODES = [
  { code: '+1',   flag: '🇺🇸', label: 'US +1' },
  { code: '+1',   flag: '🇨🇦', label: 'CA +1' },
  { code: '+44',  flag: '🇬🇧', label: 'GB +44' },
  { code: '+91',  flag: '🇮🇳', label: 'IN +91' },
  { code: '+61',  flag: '🇦🇺', label: 'AU +61' },
  { code: '+49',  flag: '🇩🇪', label: 'DE +49' },
  { code: '+33',  flag: '🇫🇷', label: 'FR +33' },
  { code: '+971', flag: '🇦🇪', label: 'AE +971' },
  { code: '+65',  flag: '🇸🇬', label: 'SG +65' },
  { code: '+81',  flag: '🇯🇵', label: 'JP +81' },
  { code: '+86',  flag: '🇨🇳', label: 'CN +86' },
  { code: '+55',  flag: '🇧🇷', label: 'BR +55' },
  { code: '+52',  flag: '🇲🇽', label: 'MX +52' },
  { code: '+27',  flag: '🇿🇦', label: 'ZA +27' },
  { code: '+82',  flag: '🇰🇷', label: 'KR +82' },
  { code: '+39',  flag: '🇮🇹', label: 'IT +39' },
  { code: '+34',  flag: '🇪🇸', label: 'ES +34' },
  { code: '+31',  flag: '🇳🇱', label: 'NL +31' },
  { code: '+7',   flag: '🇷🇺', label: 'RU +7' },
  { code: '+966', flag: '🇸🇦', label: 'SA +966' },
  { code: '+60',  flag: '🇲🇾', label: 'MY +60' },
  { code: '+63',  flag: '🇵🇭', label: 'PH +63' },
  { code: '+62',  flag: '🇮🇩', label: 'ID +62' },
  { code: '+92',  flag: '🇵🇰', label: 'PK +92' },
  { code: '+880', flag: '🇧🇩', label: 'BD +880' },
  { code: '+20',  flag: '🇪🇬', label: 'EG +20' },
  { code: '+234', flag: '🇳🇬', label: 'NG +234' },
  { code: '+254', flag: '🇰🇪', label: 'KE +254' },
  { code: '+41',  flag: '🇨🇭', label: 'CH +41' },
  { code: '+46',  flag: '🇸🇪', label: 'SE +46' },
] as const

interface PhoneInputProps {
  name: string
  value: string
  onChange: (combined: string) => void
  required?: boolean
  placeholder?: string
  className?: string
}

export function PhoneInput({
  name,
  value,
  onChange,
  required,
  placeholder = 'Phone number',
  className = '',
}: PhoneInputProps) {
  const id = useId()
  const [dialCode, setDialCode] = useState('+1')

  // Derive the number portion from the full combined value
  const numberPart = value.startsWith(dialCode + ' ')
    ? value.slice(dialCode.length + 1)
    : value.startsWith('+')
    ? value.replace(/^\+\d+\s?/, '')
    : value

  const handleDialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDialCode(e.target.value)
    onChange(e.target.value + ' ' + numberPart)
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(dialCode + ' ' + e.target.value)
  }

  const currentEntry = DIAL_CODES.find(d => d.code === dialCode) ?? DIAL_CODES[0]

  return (
    <div className={`phone-input-wrap ${className}`}>
      {/* Hidden input carries the combined value for native form validation */}
      <input
        type="hidden"
        name={name}
        value={dialCode + ' ' + numberPart}
      />

      {/* Country code selector */}
      <div className="phone-dial-selector" title="Country code">
        <span className="phone-flag" aria-hidden="true">{currentEntry.flag}</span>
        <select
          value={dialCode}
          onChange={handleDialChange}
          aria-label="Country dial code"
        >
          {DIAL_CODES.map((d, i) => (
            <option key={`${d.code}-${i}`} value={d.code}>
              {d.flag} {d.label}
            </option>
          ))}
        </select>
        <span className="phone-code-text">{dialCode}</span>
        <ChevronIcon />
      </div>

      <div className="phone-divider" aria-hidden="true" />

      {/* Number input */}
      <input
        id={id}
        type="tel"
        className="phone-number-input"
        placeholder={placeholder}
        value={numberPart}
        onChange={handleNumberChange}
        required={required}
        autoComplete="tel-national"
      />
    </div>
  )
}

function ChevronIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
