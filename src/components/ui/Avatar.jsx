import { classNames } from '../../utils/helpers';

export function Avatar({ name, size = 'md', className }) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  return (
    <div className={classNames(
      'flex items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white font-semibold',
      sizes[size],
      className
    )}>
      {getInitials(name)}
    </div>
  );
}

export function AvatarGroup({ users, max = 4 }) {
  const visibleUsers = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="flex -space-x-2">
      {visibleUsers.map((user, index) => (
        <div
          key={index}
          className="ring-2 ring-white rounded-full"
          title={user.name}
        >
          <Avatar name={user.name} size="sm" />
        </div>
      ))}
      {remaining > 0 && (
        <div className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] text-xs font-medium flex items-center justify-center ring-2 ring-white">
          +{remaining}
        </div>
      )}
    </div>
  );
}
