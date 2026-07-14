export const contacts = [
  { id: 1, name: 'Sarah Mitchell', email: 'sarah.mitchell@techcorp.com', phone: '+1 (555) 234-5678', company: 'TechCorp Industries', tags: ['enterprise', 'hot-lead'], notes: 'Interested in enterprise plan', createdAt: '2025-06-15' },
  { id: 2, name: 'James Chen', email: 'j.chen@innovate.io', phone: '+1 (555) 345-6789', company: 'Innovate.io', tags: ['startup', 'demo-scheduled'], notes: 'Met at SaaStr conference', createdAt: '2025-06-18' },
  { id: 3, name: 'Emily Rodriguez', email: 'emily.r@globalretail.com', phone: '+1 (555) 456-7890', company: 'Global Retail Co', tags: ['retail', 'decision-maker'], notes: 'CFO, budget approved for Q3', createdAt: '2025-06-20' },
  { id: 4, name: 'Michael Park', email: 'm.park@fintech.com', phone: '+1 (555) 567-8901', company: 'FinTech Solutions', tags: ['finance', 'qualified'], notes: 'Referred by James Chen', createdAt: '2025-06-22' },
  { id: 5, name: 'Amanda Foster', email: 'afoster@cloudservices.net', phone: '+1 (555) 678-9012', company: 'CloudServices Net', tags: ['saas', 'nurturing'], notes: 'Following up on pricing proposal', createdAt: '2025-06-25' },
  { id: 6, name: 'David Kim', email: 'dkim@meditech.org', phone: '+1 (555) 789-0123', company: 'MediTech Solutions', tags: ['healthcare', 'hot-lead'], notes: 'Urgent need for compliance features', createdAt: '2025-07-01' },
  { id: 7, name: 'Lisa Thompson', email: 'l.thompson@edustart.edu', phone: '+1 (555) 890-1234', company: 'EduStart', tags: ['education', 'startup'], notes: 'Early stage startup, growth potential', createdAt: '2025-07-03' },
  { id: 8, name: 'Robert Garcia', email: 'rgarcia@logisticsplus.com', phone: '+1 (555) 901-2345', company: 'Logistics Plus', tags: ['logistics', 'enterprise'], notes: 'Large team, needs custom integration', createdAt: '2025-07-05' },
  { id: 9, name: 'Jennifer Walsh', email: 'jwalsh@mediagroup.agency', phone: '+1 (555) 012-3456', company: 'MediaGroup Agency', tags: ['agency', 'qualified'], notes: 'Managing multiple client accounts', createdAt: '2025-07-08' },
  { id: 10, name: 'Christopher Lee', email: 'c.lee@retailtech.com', phone: '+1 (555) 123-4567', company: 'RetailTech', tags: ['retail', 'proposal-sent'], notes: 'Comparing with competitors', createdAt: '2025-07-10' },
  { id: 11, name: 'Michelle Brown', email: 'mbrown@greenergy.com', phone: '+1 (555) 234-5679', company: 'GreenEnergy Corp', tags: ['energy', 'sustainable'], notes: 'Interested in ESG reporting features', createdAt: '2025-07-12' },
  { id: 12, name: 'Andrew Davis', email: 'adavis@autotech.mobi', phone: '+1 (555) 345-6780', company: 'AutoTech Mobi', tags: ['automotive', 'enterprise'], notes: 'Fleet management use case', createdAt: '2025-07-14' },
  { id: 13, name: 'Nicole Martinez', email: 'nmartinez@foodservice.co', phone: '+1 (555) 456-7891', company: 'FoodService Co', tags: ['food', 'hot-lead'], notes: 'Expanding operations, needs scalability', createdAt: '2025-07-15' },
  { id: 14, name: 'Thomas Wilson', email: 'twilson@securityfirst.io', phone: '+1 (555) 567-8902', company: 'SecurityFirst.io', tags: ['security', 'enterprise'], notes: 'SOC 2 compliance required', createdAt: '2025-07-16' },
  { id: 15, name: 'Rachel Taylor', email: 'rtaylor@wellnessplus.health', phone: '+1 (555) 678-9013', company: 'WellnessPlus Health', tags: ['healthcare', 'nurturing'], notes: 'Referred by David Kim', createdAt: '2025-07-17' },
];

export const dealStages = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];

export const deals = [
  { id: 1, title: 'TechCorp Enterprise License', value: 125000, stage: 'Negotiation', contactId: 1, probability: 75, expectedClose: '2025-08-15' },
  { id: 2, title: 'Innovate.io Starter Package', value: 24000, stage: 'Proposal', contactId: 2, probability: 50, expectedClose: '2025-08-30' },
  { id: 3, title: 'Global Retail Annual Contract', value: 85000, stage: 'Qualified', contactId: 3, probability: 40, expectedClose: '2025-09-15' },
  { id: 4, title: 'FinTech Solutions Integration', value: 45000, stage: 'Lead', contactId: 4, probability: 20, expectedClose: '2025-10-01' },
  { id: 5, title: 'CloudServices Net Migration', value: 32000, stage: 'Proposal', contactId: 5, probability: 60, expectedClose: '2025-08-20' },
  { id: 6, title: 'MediTech Compliance Suite', value: 156000, stage: 'Negotiation', contactId: 6, probability: 80, expectedClose: '2025-08-10' },
  { id: 7, title: 'EduStart Education Plan', value: 12000, stage: 'Lead', contactId: 7, probability: 15, expectedClose: '2025-10-15' },
  { id: 8, title: 'Logistics Plus Enterprise', value: 210000, stage: 'Qualified', contactId: 8, probability: 45, expectedClose: '2025-09-30' },
  { id: 9, title: 'MediaGroup Agency Multi-seat', value: 28000, stage: 'Won', contactId: 9, probability: 100, expectedClose: '2025-07-01' },
  { id: 10, title: 'RetailTech POS Integration', value: 67000, stage: 'Lost', contactId: 10, probability: 0, expectedClose: '2025-07-15' },
  { id: 11, title: 'GreenEnergy ESG Module', value: 38000, stage: 'Lead', contactId: 11, probability: 25, expectedClose: '2025-10-30' },
  { id: 12, title: 'AutoTech Fleet Dashboard', value: 175000, stage: 'Proposal', contactId: 12, probability: 55, expectedClose: '2025-09-01' },
  { id: 13, title: 'FoodService Scale Package', value: 92000, stage: 'Negotiation', contactId: 13, probability: 70, expectedClose: '2025-08-25' },
  { id: 14, title: 'SecurityFirst SOC2 Bundle', value: 198000, stage: 'Qualified', contactId: 14, probability: 35, expectedClose: '2025-11-15' },
  { id: 15, title: 'WellnessPlus Patient Portal', value: 55000, stage: 'Lead', contactId: 15, probability: 20, expectedClose: '2025-10-20' },
  { id: 16, title: 'TechCorp Support Add-on', value: 35000, stage: 'Won', contactId: 1, probability: 100, expectedClose: '2025-06-30' },
  { id: 17, title: 'Innovate.io Analytics Add-on', value: 15000, stage: 'Qualified', contactId: 2, probability: 40, expectedClose: '2025-09-10' },
  { id: 18, title: 'Global Retail Training', value: 18000, stage: 'Won', contactId: 3, probability: 100, expectedClose: '2025-07-05' },
  { id: 19, title: 'CloudServices API Access', value: 22000, stage: 'Lost', contactId: 5, probability: 0, expectedClose: '2025-07-20' },
  { id: 20, title: 'MediTech Reporting Module', value: 42000, stage: 'Proposal', contactId: 6, probability: 50, expectedClose: '2025-08-28' },
];

export const tasks = [
  { id: 1, title: 'Prepare demo for TechCorp', description: 'Customize demo with enterprise features', dueDate: '2025-07-15', priority: 'high', status: 'pending', assigneeId: 1 },
  { id: 2, title: 'Send proposal to Innovate.io', description: 'Include startup discount pricing', dueDate: '2025-07-16', priority: 'high', status: 'pending', assigneeId: 1 },
  { id: 3, title: 'Schedule call with Global Retail CFO', description: 'Discuss budget and timeline', dueDate: '2025-07-14', priority: 'medium', status: 'completed', assigneeId: 1 },
  { id: 4, title: 'Review FinTech security requirements', description: 'Check compliance documentation', dueDate: '2025-07-18', priority: 'medium', status: 'pending', assigneeId: 2 },
  { id: 5, title: 'Update CloudServices pricing', description: 'Apply Q3 promotional rates', dueDate: '2025-07-15', priority: 'low', status: 'completed', assigneeId: 2 },
  { id: 6, title: 'Prepare MediTech compliance docs', description: 'SOC 2 and HIPAA documentation', dueDate: '2025-07-14', priority: 'high', status: 'pending', assigneeId: 1 },
  { id: 7, title: 'Onboarding call with MediaGroup', description: 'Welcome new customer', dueDate: '2025-07-16', priority: 'medium', status: 'pending', assigneeId: 2 },
  { id: 8, title: 'Follow up with RetailTech', description: 'Address competitor concerns', dueDate: '2025-07-20', priority: 'low', status: 'pending', assigneeId: 1 },
  { id: 9, title: 'Prepare GreenEnergy proposal', description: 'Include ESG reporting module', dueDate: '2025-07-22', priority: 'medium', status: 'pending', assigneeId: 1 },
  { id: 10, title: 'AutoTech technical review', description: 'Review API integration requirements', dueDate: '2025-07-17', priority: 'high', status: 'pending', assigneeId: 2 },
  { id: 11, title: 'Send FoodService contract', description: 'Final contract with legal review', dueDate: '2025-07-15', priority: 'high', status: 'completed', assigneeId: 1 },
  { id: 12, title: 'SecurityFirst audit prep', description: 'Prepare for SOC 2 audit', dueDate: '2025-07-25', priority: 'medium', status: 'pending', assigneeId: 1 },
  { id: 13, title: 'EduStart product tour', description: 'Show education-specific features', dueDate: '2025-07-19', priority: 'low', status: 'pending', assigneeId: 2 },
  { id: 14, title: 'Logistics Plus demo', description: 'Fleet management integration demo', dueDate: '2025-07-18', priority: 'high', status: 'pending', assigneeId: 1 },
  { id: 15, title: 'WellnessPlus introduction call', description: 'Welcome and needs assessment', dueDate: '2025-07-21', priority: 'low', status: 'pending', assigneeId: 2 },
  { id: 16, title: 'Update competitor analysis', description: 'Q3 competitive landscape review', dueDate: '2025-07-28', priority: 'low', status: 'pending', assigneeId: 2 },
  { id: 17, title: 'Review sales enablement content', description: 'New case studies for TechCorp', dueDate: '2025-07-17', priority: 'medium', status: 'completed', assigneeId: 1 },
  { id: 18, title: 'Team training on AI features', description: 'New AI-powered analytics demo', dueDate: '2025-07-24', priority: 'medium', status: 'pending', assigneeId: 1 },
  { id: 19, title: 'Prepare monthly sales report', description: 'June sales performance review', dueDate: '2025-07-20', priority: 'high', status: 'completed', assigneeId: 1 },
  { id: 20, title: 'Quarterly business review prep', description: 'Prepare Q3 strategy deck', dueDate: '2025-07-30', priority: 'medium', status: 'pending', assigneeId: 1 },
  { id: 21, title: 'Partner integration meeting', description: 'Discuss Zapier integration updates', dueDate: '2025-07-23', priority: 'low', status: 'pending', assigneeId: 2 },
  { id: 22, title: 'Customer feedback review', description: 'Analyze NPS survey results', dueDate: '2025-07-26', priority: 'medium', status: 'pending', assigneeId: 1 },
  { id: 23, title: 'Update pricing page', description: 'Reflect Q3 promotions', dueDate: '2025-07-15', priority: 'high', status: 'pending', assigneeId: 2 },
  { id: 24, title: 'Review support tickets', description: 'Escalated cases from last week', dueDate: '2025-07-14', priority: 'medium', status: 'completed', assigneeId: 1 },
  { id: 25, title: 'Product feedback session', description: 'Share customer insights with product team', dueDate: '2025-07-29', priority: 'low', status: 'pending', assigneeId: 1 },
];

export const activities = [
  { id: 1, type: 'deal_won', description: 'MediaGroup Agency signed annual contract', amount: 28000, timestamp: '2025-07-18T10:30:00' },
  { id: 2, type: 'task_completed', description: 'Scheduled call with Global Retail CFO', timestamp: '2025-07-18T09:15:00' },
  { id: 3, type: 'email_sent', description: 'Sent proposal to Innovate.io', timestamp: '2025-07-17T16:45:00' },
  { id: 4, type: 'deal_created', description: 'New deal: SecurityFirst SOC2 Bundle ($198K)', timestamp: '2025-07-17T14:20:00' },
  { id: 5, type: 'contact_created', description: 'Added Rachel Taylor from WellnessPlus', timestamp: '2025-07-17T11:00:00' },
  { id: 6, type: 'call_completed', description: 'Discovery call with AutoTech Mobi', timestamp: '2025-07-16T15:30:00' },
  { id: 7, type: 'deal_updated', description: 'MediTech moved to Negotiation stage', timestamp: '2025-07-16T13:15:00' },
  { id: 8, type: 'meeting_scheduled', description: 'AutoTech technical review scheduled', timestamp: '2025-07-16T10:00:00' },
  { id: 9, type: 'email_opened', description: 'FoodService opened contract email', timestamp: '2025-07-15T17:30:00' },
  { id: 10, type: 'deal_won', description: 'TechCorp added support add-on', amount: 35000, timestamp: '2025-07-15T14:00:00' },
];

export const users = [
  { id: 1, name: 'Alex Morgan', email: 'alex@nexuscrm.io', role: 'admin', avatar: 'AM' },
  { id: 2, name: 'Jordan Lee', email: 'jordan@nexuscrm.io', role: 'member', avatar: 'JL' },
];

export const workspace = {
  id: 1,
  name: 'Nexus Sales Team',
  plan: 'Professional',
  createdAt: '2025-01-15',
};
