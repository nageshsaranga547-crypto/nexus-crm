import { classNames } from '../../utils/helpers';

export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && (
        <div className="w-16 h-16 rounded-full bg-[#F1F5F9] flex items-center justify-center mb-4 text-2xl">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#1E293B] mb-2">{title}</h3>
      {description && (
        <p className="text-[#64748B] text-sm max-w-sm mb-6">{description}</p>
      )}
      {action}
    </div>
  );
}

export function LoadingSkeleton({ className }) {
  return (
    <div className={classNames('animate-pulse bg-[#E2E8F0] rounded', className)} />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 space-y-3">
      <LoadingSkeleton className="h-4 w-1/3" />
      <LoadingSkeleton className="h-6 w-2/3" />
      <LoadingSkeleton className="h-4 w-1/2" />
    </div>
  );
}
