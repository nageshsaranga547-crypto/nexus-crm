export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getPriorityColor(priority) {
  switch (priority) {
    case 'high': return '#EF4444';
    case 'medium': return '#F59E0B';
    case 'low': return '#22C55E';
    default: return '#64748B';
  }
}

export function getStageColor(stage) {
  switch (stage) {
    case 'Lead': return '#94A3B8';
    case 'Qualified': return '#3B82F6';
    case 'Proposal': return '#8B5CF6';
    case 'Negotiation': return '#F59E0B';
    case 'Won': return '#22C55E';
    case 'Lost': return '#EF4444';
    default: return '#64748B';
  }
}

export function getActivityIcon(type) {
  switch (type) {
    case 'deal_won': return '🏆';
    case 'deal_created': return '📈';
    case 'deal_updated': return '🔄';
    case 'deal_lost': return '📉';
    case 'contact_created': return '👤';
    case 'email_sent': return '✉️';
    case 'email_opened': return '📬';
    case 'call_completed': return '📞';
    case 'meeting_scheduled': return '📅';
    case 'task_completed': return '✅';
    default: return '📌';
  }
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
