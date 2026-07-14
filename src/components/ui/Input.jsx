import { classNames } from '../../utils/helpers';

export function Input({ label, error, className, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <input
        className={classNames(
          'w-full h-10 px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#1E293B] text-sm placeholder-[#94A3B8] transition-all duration-150',
          'focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20',
          error && 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-[#EF4444]">{error}</p>
      )}
    </div>
  );
}

export function Textarea({ label, error, className, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <textarea
        className={classNames(
          'w-full px-3 py-2.5 rounded-lg border border-[#E2E8F0] bg-white text-[#1E293B] text-sm placeholder-[#94A3B8] transition-all duration-150 resize-none',
          'focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20',
          error && 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-[#EF4444]">{error}</p>
      )}
    </div>
  );
}

export function Select({ label, error, children, className, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <select
        className={classNames(
          'w-full h-10 px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#1E293B] text-sm transition-all duration-150 appearance-none cursor-pointer',
          'focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20',
          error && 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20',
          className
        )}
        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1 text-xs text-[#EF4444]">{error}</p>
      )}
    </div>
  );
}
