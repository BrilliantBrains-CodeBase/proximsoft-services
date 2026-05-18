import { useState, useEffect, useId } from 'react'

// ── Timezone → country map (covers all DIAL_CODES entries) ───────────────────
const TIMEZONE_COUNTRY: Record<string, string> = {
  'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN',
  'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
  'America/Los_Angeles': 'US', 'America/Phoenix': 'US', 'America/Anchorage': 'US',
  'Pacific/Honolulu': 'US',
  'America/Toronto': 'CA', 'America/Vancouver': 'CA', 'America/Winnipeg': 'CA',
  'America/Halifax': 'CA', 'America/St_Johns': 'CA',
  'Europe/London': 'GB',
  'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU', 'Australia/Brisbane': 'AU',
  'Australia/Perth': 'AU', 'Australia/Adelaide': 'AU',
  'Europe/Berlin': 'DE',
  'Europe/Paris': 'FR',
  'Asia/Dubai': 'AE',
  'Asia/Singapore': 'SG',
  'Asia/Tokyo': 'JP',
  'Asia/Shanghai': 'CN', 'Asia/Hong_Kong': 'CN',
  'America/Sao_Paulo': 'BR', 'America/Manaus': 'BR',
  'America/Mexico_City': 'MX',
  'Africa/Johannesburg': 'ZA',
  'Asia/Seoul': 'KR',
  'Europe/Rome': 'IT',
  'Europe/Madrid': 'ES',
  'Europe/Amsterdam': 'NL',
  'Europe/Moscow': 'RU',
  'Asia/Riyadh': 'SA',
  'Asia/Kuala_Lumpur': 'MY',
  'Asia/Manila': 'PH',
  'Asia/Jakarta': 'ID',
  'Asia/Karachi': 'PK',
  'Asia/Dhaka': 'BD',
  'Africa/Cairo': 'EG',
  'Africa/Lagos': 'NG',
  'Africa/Nairobi': 'KE',
  'Europe/Zurich': 'CH',
  'Europe/Stockholm': 'SE',
}

function timezoneCountryIdx(): number {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    const country = TIMEZONE_COUNTRY[tz]
    if (country) {
      const idx = DIAL_CODES.findIndex((d) => d.country === country)
      if (idx !== -1) return idx
    }
  } catch { /* ignore */ }
  return DEFAULT_IDX
}

// ── Module-level geo cache — one fetch per browser session, shared by all instances ──
let _cachedIdx: number | null = null
let _ipPending: Promise<void> | null = null

function prefetchIpCountry(): void {
  if (_cachedIdx !== null || _ipPending) return
  _ipPending = fetch('https://ipapi.co/json/')
    .then((r) => r.json())
    .then((data: { country_code?: string }) => {
      const idx = DIAL_CODES.findIndex((d) => d.country === data.country_code)
      if (idx !== -1) _cachedIdx = idx
    })
    .catch(() => { _ipPending = null })
}

const DIAL_CODES = [
  { country: 'US', code: '+1',   flag: '🇺🇸', label: 'US +1' },
  { country: 'CA', code: '+1',   flag: '🇨🇦', label: 'CA +1' },
  { country: 'GB', code: '+44',  flag: '🇬🇧', label: 'GB +44' },
  { country: 'IN', code: '+91',  flag: '🇮🇳', label: 'IN +91' },
  { country: 'AU', code: '+61',  flag: '🇦🇺', label: 'AU +61' },
  { country: 'DE', code: '+49',  flag: '🇩🇪', label: 'DE +49' },
  { country: 'FR', code: '+33',  flag: '🇫🇷', label: 'FR +33' },
  { country: 'AE', code: '+971', flag: '🇦🇪', label: 'AE +971' },
  { country: 'SG', code: '+65',  flag: '🇸🇬', label: 'SG +65' },
  { country: 'JP', code: '+81',  flag: '🇯🇵', label: 'JP +81' },
  { country: 'CN', code: '+86',  flag: '🇨🇳', label: 'CN +86' },
  { country: 'BR', code: '+55',  flag: '🇧🇷', label: 'BR +55' },
  { country: 'MX', code: '+52',  flag: '🇲🇽', label: 'MX +52' },
  { country: 'ZA', code: '+27',  flag: '🇿🇦', label: 'ZA +27' },
  { country: 'KR', code: '+82',  flag: '🇰🇷', label: 'KR +82' },
  { country: 'IT', code: '+39',  flag: '🇮🇹', label: 'IT +39' },
  { country: 'ES', code: '+34',  flag: '🇪🇸', label: 'ES +34' },
  { country: 'NL', code: '+31',  flag: '🇳🇱', label: 'NL +31' },
  { country: 'RU', code: '+7',   flag: '🇷🇺', label: 'RU +7' },
  { country: 'SA', code: '+966', flag: '🇸🇦', label: 'SA +966' },
  { country: 'MY', code: '+60',  flag: '🇲🇾', label: 'MY +60' },
  { country: 'PH', code: '+63',  flag: '🇵🇭', label: 'PH +63' },
  { country: 'ID', code: '+62',  flag: '🇮🇩', label: 'ID +62' },
  { country: 'PK', code: '+92',  flag: '🇵🇰', label: 'PK +92' },
  { country: 'BD', code: '+880', flag: '🇧🇩', label: 'BD +880' },
  { country: 'EG', code: '+20',  flag: '🇪🇬', label: 'EG +20' },
  { country: 'NG', code: '+234', flag: '🇳🇬', label: 'NG +234' },
  { country: 'KE', code: '+254', flag: '🇰🇪', label: 'KE +254' },
  { country: 'CH', code: '+41',  flag: '🇨🇭', label: 'CH +41' },
  { country: 'SE', code: '+46',  flag: '🇸🇪', label: 'SE +46' },
]

const DEFAULT_IDX = 0 // US +1

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
  const [selectedIdx, setSelectedIdx] = useState(() => timezoneCountryIdx())

  useEffect(() => {
    let cancelled = false
    const tzIdx = timezoneCountryIdx()

    // Sync the initial dial code into parent form state
    onChange(DIAL_CODES[tzIdx].code + ' ')

    // Background IP refinement — may update if IP country differs from timezone country
    if (_cachedIdx !== null) {
      if (_cachedIdx !== tzIdx) {
        setSelectedIdx(_cachedIdx)
        onChange(DIAL_CODES[_cachedIdx].code + ' ')
      }
      return () => { cancelled = true }
    }

    prefetchIpCountry()
    const timer = setTimeout(() => {
      if (!cancelled && _cachedIdx !== null && _cachedIdx !== tzIdx) {
        setSelectedIdx(_cachedIdx)
        onChange(DIAL_CODES[_cachedIdx].code + ' ')
      }
    }, 1500)
    return () => { cancelled = true; clearTimeout(timer) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const current = DIAL_CODES[selectedIdx]

  // Derive the number portion from the full combined value
  const numberPart = value.startsWith(current.code + ' ')
    ? value.slice(current.code.length + 1)
    : value.startsWith('+')
    ? value.replace(/^\+\d+\s?/, '')
    : value

  const handleDialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = Number(e.target.value)
    setSelectedIdx(idx)
    onChange(DIAL_CODES[idx].code + ' ' + numberPart)
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(current.code + ' ' + e.target.value)
  }

  return (
    <div className={`phone-input-wrap ${className}`}>
      {/* Hidden input carries the combined value for native form validation */}
      <input
        type="hidden"
        name={name}
        value={current.code + ' ' + numberPart}
      />

      {/* Country code selector */}
      <div className="phone-dial-selector" title="Country code">
        <span className="phone-flag" aria-hidden="true">{current.flag}</span>
        <select
          value={selectedIdx}
          onChange={handleDialChange}
          aria-label="Country dial code"
        >
          {DIAL_CODES.map((d, i) => (
            <option key={`${d.country}-${i}`} value={i}>
              {d.flag} {d.label}
            </option>
          ))}
        </select>
        <span className="phone-code-text">{current.code}</span>
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
