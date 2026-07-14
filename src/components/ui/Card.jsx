import { classNames } from '../../utils/helpers';

export function Card({ children, className, hover, ...props }) {
  return (
    <div
      className={classNames(
        'bg-white rounded-xl border border-[#E2E8F0] shadow-sm',
        hover && 'transition-all duration-150 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={classNames('px-5 py-4 border-b border-[#E2E8F0]', className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className }) {
  return (
    <div className={classNames('p-5', className)}>
      {children}
    </div>
  );
}

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-[#F1F5F9] text-[#64748B]',
    primary: 'bg-[#EFF6FF] text-[#2563EB]',
    success: 'bg-[#DCFCE7] text-[#16A34A]',
    warning: 'bg-[#FEF3C7] text-[#D97706]',
    danger: 'bg-[#FEE2E2] text-[#DC2626]',
  };

  return (
    <span className={classNames(
      'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
