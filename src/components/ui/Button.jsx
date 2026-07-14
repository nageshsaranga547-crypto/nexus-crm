import { classNames } from '../../utils/helpers';

export function Button({ children, variant = 'primary', size = 'md', className, disabled, ...props }) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] focus:ring-[#2563EB] shadow-sm hover:shadow-md',
    secondary: 'bg-white text-[#2563EB] border-2 border-[#2563EB] hover:bg-[#EFF6FF] focus:ring-[#2563EB]',
    ghost: 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B] focus:ring-[#E2E8F0]',
    danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626] focus:ring-[#EF4444]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
