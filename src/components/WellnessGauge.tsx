interface WellnessGaugeProps {
  label: string;
  value: number;
  max?: number;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  icon: React.ReactNode;
}

export default function WellnessGauge({ label, value, max = 100, color, icon }: WellnessGaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; ring: string }> = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', ring: 'ring-blue-200' },
      green: { bg: 'bg-green-500', text: 'text-green-600', ring: 'ring-green-200' },
      yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', ring: 'ring-yellow-200' },
      red: { bg: 'bg-red-500', text: 'text-red-600', ring: 'ring-red-200' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-600', ring: 'ring-purple-200' },
    };
    return colors[color] || colors.blue;
  };

  const colors = getColorClasses(color);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 mb-3">
        <svg className="transform -rotate-90 w-24 h-24">
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
            className={colors.bg.replace('bg-', 'text-')}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${colors.text}`}>{Math.round(value)}</span>
        </div>
      </div>
      <div className={`w-10 h-10 ${colors.bg.replace('-500', '-100')} rounded-xl flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <p className="text-sm font-semibold text-gray-700 text-center">{label}</p>
    </div>
  );
}
