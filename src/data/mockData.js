// Companies
export const companies = [
  { id: 1, name: 'Acme Corporation', domain: 'acme.com', industry: 'Technology', employees: 500, revenue: 50000000, address: '123 Tech Park, San Francisco, CA', createdAt: '2024-01-15' },
  { id: 2, name: 'Globex Industries', domain: 'globex.com', industry: 'Manufacturing', employees: 1200, revenue: 120000000, address: '456 Industrial Ave, Chicago, IL', createdAt: '2024-02-01' },
  { id: 3, name: 'Initech Solutions', domain: 'initech.com', industry: 'Software', employees: 200, revenue: 25000000, address: '789 Innovation Blvd, Austin, TX', createdAt: '2024-02-10' },
  { id: 4, name: 'Umbrella Corp', domain: 'umbrella.com', industry: 'Pharmaceuticals', employees: 3000, revenue: 500000000, address: '321 Research Dr, Boston, MA', createdAt: '2024-02-20' },
  { id: 5, name: 'Stark Industries', domain: 'stark.com', industry: 'Technology', employees: 8000, revenue: 1000000000, address: '555 Hero Lane, Los Angeles, CA', createdAt: '2024-03-01' },
  { id: 6, name: 'Wayne Enterprises', domain: 'wayne.com', industry: 'Conglomerate', employees: 15000, revenue: 2000000000, address: '777 Gotham Plaza, New York, NY', createdAt: '2024-03-05' },
  { id: 7, name: 'Cyberdyne Systems', domain: 'cyberdyne.com', industry: 'Robotics', employees: 600, revenue: 80000000, address: '888 Future Way, Seattle, WA', createdAt: '2024-03-10' },
  { id: 8, name: 'Soylent Corp', domain: 'soylent.com', industry: 'Food & Beverage', employees: 400, revenue: 45000000, address: '999 Nutrition Ave, Denver, CO', createdAt: '2024-03-15' },
  { id: 9, name: 'Massive Dynamic', domain: 'massivedynamic.com', industry: 'Diversified', employees: 2500, revenue: 300000000, address: '111 Enterprise Blvd, Miami, FL', createdAt: '2024-03-20' },
  { id: 10, name: 'Pied Piper', domain: 'piedpiper.com', industry: 'Software', employees: 50, revenue: 15000000, address: '222 Startup St, Palo Alto, CA', createdAt: '2024-03-25' },
];

// Contacts
export const contacts = [
  { id: 1, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@acme.com', phone: '+1 (555) 123-4567', companyId: 1, title: 'VP of Engineering', lifecycleStage: 'customer', leadStatus: 'won', tags: ['decision-maker', 'technical'], createdAt: '2024-01-20' },
  { id: 2, firstName: 'Michael', lastName: 'Chen', email: 'michael.chen@globex.com', phone: '+1 (555) 234-5678', companyId: 2, title: 'CTO', lifecycleStage: 'lead', leadStatus: 'new', tags: ['enterprise'], createdAt: '2024-02-05' },
  { id: 3, firstName: 'Emily', lastName: 'Rodriguez', email: 'emily.r@initech.com', phone: '+1 (555) 345-6789', companyId: 3, title: 'Director of Operations', lifecycleStage: 'opportunity', leadStatus: 'open', tags: ['budget-holder'], createdAt: '2024-02-15' },
  { id: 4, firstName: 'James', lastName: 'Wilson', email: 'james.wilson@umbrella.com', phone: '+1 (555) 456-7890', companyId: 4, title: 'Head of Procurement', lifecycleStage: 'customer', leadStatus: 'won', tags: ['decision-maker'], createdAt: '2024-02-25' },
  { id: 5, firstName: 'Lisa', lastName: 'Anderson', email: 'lisa.anderson@stark.com', phone: '+1 (555) 567-8901', companyId: 5, title: 'Chief Innovation Officer', lifecycleStage: 'customer', leadStatus: 'won', tags: ['influencer', 'executive'], createdAt: '2024-03-05' },
  { id: 6, firstName: 'Robert', lastName: 'Martinez', email: 'r.martinez@wayne.com', phone: '+1 (555) 678-9012', companyId: 6, title: 'VP of Strategy', lifecycleStage: 'lead', leadStatus: 'contacted', tags: ['enterprise', 'executive'], createdAt: '2024-03-10' },
  { id: 7, firstName: 'Jennifer', lastName: 'Taylor', email: 'jennifer.t@cyberdyne.com', phone: '+1 (555) 789-0123', companyId: 7, title: 'Director of IT', lifecycleStage: 'opportunity', leadStatus: 'open', tags: ['technical'], createdAt: '2024-03-15' },
  { id: 8, firstName: 'David', lastName: 'Brown', email: 'david.brown@soylent.com', phone: '+1 (555) 890-1234', companyId: 8, title: 'COO', lifecycleStage: 'lead', leadStatus: 'new', tags: ['decision-maker'], createdAt: '2024-03-20' },
  { id: 9, firstName: 'Amanda', lastName: 'Garcia', email: 'amanda.g@massivedynamic.com', phone: '+1 (555) 901-2345', companyId: 9, title: 'VP of Sales', lifecycleStage: 'opportunity', leadStatus: 'open', tags: ['budget-holder'], createdAt: '2024-03-25' },
  { id: 10, firstName: 'Richard', lastName: 'Lee', email: 'richard.lee@piedpiper.com', phone: '+1 (555) 012-3456', companyId: 10, title: 'CEO', lifecycleStage: 'lead', leadStatus: 'new', tags: ['decision-maker', 'executive'], createdAt: '2024-03-30' },
  { id: 11, firstName: 'Michelle', lastName: 'Thompson', email: 'michelle.t@acme.com', phone: '+1 (555) 111-2222', companyId: 1, title: 'Product Manager', lifecycleStage: 'customer', leadStatus: 'won', tags: ['influencer'], createdAt: '2024-04-01' },
  { id: 12, firstName: 'Kevin', lastName: 'White', email: 'kevin.white@globex.com', phone: '+1 (555) 222-3333', companyId: 2, title: 'Engineering Manager', lifecycleStage: 'opportunity', leadStatus: 'open', tags: ['technical'], createdAt: '2024-04-05' },
  { id: 13, firstName: 'Rachel', lastName: 'Kim', email: 'rachel.kim@initech.com', phone: '+1 (555) 333-4444', companyId: 3, title: 'HR Director', lifecycleStage: 'lead', leadStatus: 'contacted', tags: ['budget-holder'], createdAt: '2024-04-10' },
  { id: 14, firstName: 'Thomas', lastName: 'Harris', email: 'thomas.h@stark.com', phone: '+1 (555) 444-5555', companyId: 5, title: 'Security Director', lifecycleStage: 'customer', leadStatus: 'won', tags: ['decision-maker', 'technical'], createdAt: '2024-04-15' },
  { id: 15, firstName: 'Stephanie', lastName: 'Clark', email: 'stephanie.c@wayne.com', phone: '+1 (555) 555-6666', companyId: 6, title: 'Finance Director', lifecycleStage: 'opportunity', leadStatus: 'open', tags: ['budget-holder'], createdAt: '2024-04-20' },
];

// Deal Pipeline Stages
export const dealStages = [
  { id: 'appointmentScheduled', name: 'Appointment Scheduled', color: '#8F87F5', order: 1 },
  { id: 'qualifiedToBuy', name: 'Qualified to Buy', color: '#00A78E', order: 2 },
  { id: 'presentationScheduled', name: 'Presentation Scheduled', color: '#3B86F0', order: 3 },
  { id: 'decisionMakerBoughtIn', name: 'Decision Maker Bought-In', color: '#F5A623', order: 4 },
  { id: 'contractSent', name: 'Contract Sent', color: '#FF7A59', order: 5 },
  { id: 'closedWon', name: 'Closed Won', color: '#00C853', order: 6 },
  { id: 'closedLost', name: 'Closed Lost', color: '#9E9E9E', order: 7 },
];

// Deals
export const deals = [
  { id: 1, title: 'Acme Enterprise License', amount: 125000, stage: 'closedWon', contactId: 1, companyId: 1, probability: 100, closeDate: '2024-02-15', owner: 'John Doe', createdAt: '2024-01-25' },
  { id: 2, title: 'Globex Platform Migration', amount: 250000, stage: 'contractSent', contactId: 2, companyId: 2, probability: 80, closeDate: '2024-04-30', owner: 'John Doe', createdAt: '2024-02-10' },
  { id: 3, title: 'Initech Cloud Setup', amount: 45000, stage: 'qualifiedToBuy', contactId: 3, companyId: 3, probability: 50, closeDate: '2024-05-15', owner: 'Sarah Smith', createdAt: '2024-02-20' },
  { id: 4, title: 'Umbrella Research Suite', amount: 500000, stage: 'closedWon', contactId: 4, companyId: 4, probability: 100, closeDate: '2024-03-01', owner: 'John Doe', createdAt: '2024-02-28' },
  { id: 5, title: 'Stark Innovation Platform', amount: 750000, stage: 'presentationScheduled', contactId: 5, companyId: 5, probability: 60, closeDate: '2024-06-30', owner: 'Mike Johnson', createdAt: '2024-03-10' },
  { id: 6, title: 'Wayne Strategy Dashboard', amount: 180000, stage: 'decisionMakerBoughtIn', contactId: 6, companyId: 6, probability: 70, closeDate: '2024-05-20', owner: 'John Doe', createdAt: '2024-03-15' },
  { id: 7, title: 'Cyberdyne Automation Tools', amount: 95000, stage: 'qualifiedToBuy', contactId: 7, companyId: 7, probability: 50, closeDate: '2024-06-15', owner: 'Sarah Smith', createdAt: '2024-03-20' },
  { id: 8, title: 'Soylent Product Line', amount: 35000, stage: 'appointmentScheduled', contactId: 8, companyId: 8, probability: 30, closeDate: '2024-07-01', owner: 'Mike Johnson', createdAt: '2024-03-25' },
  { id: 9, title: 'Massive Dynamic Integration', amount: 320000, stage: 'presentationScheduled', contactId: 9, companyId: 9, probability: 60, closeDate: '2024-06-20', owner: 'John Doe', createdAt: '2024-04-01' },
  { id: 10, title: 'Pied Piper Seed Round', amount: 25000, stage: 'closedWon', contactId: 10, companyId: 10, probability: 100, closeDate: '2024-04-05', owner: 'Sarah Smith', createdAt: '2024-03-30' },
  { id: 11, title: 'Acme Phase 2 Expansion', amount: 85000, stage: 'contractSent', contactId: 11, companyId: 1, probability: 85, closeDate: '2024-05-10', owner: 'John Doe', createdAt: '2024-04-10' },
  { id: 12, title: 'Globex Security Suite', amount: 150000, stage: 'closedLost', contactId: 12, companyId: 2, probability: 0, closeDate: '2024-03-15', owner: 'Mike Johnson', createdAt: '2024-02-15' },
  { id: 13, title: 'Initech Team Expansion', amount: 28000, stage: 'appointmentScheduled', contactId: 13, companyId: 3, probability: 25, closeDate: '2024-07-15', owner: 'Sarah Smith', createdAt: '2024-04-20' },
  { id: 14, title: 'Stark Enterprise Agreement', amount: 1200000, stage: 'decisionMakerBoughtIn', contactId: 14, companyId: 5, probability: 75, closeDate: '2024-06-30', owner: 'John Doe', createdAt: '2024-04-15' },
  { id: 15, title: 'Wayne Financial Module', amount: 220000, stage: 'qualifiedToBuy', contactId: 15, companyId: 6, probability: 55, closeDate: '2024-07-30', owner: 'Mike Johnson', createdAt: '2024-05-01' },
];

// Tasks
export const tasks = [
  { id: 1, title: 'Follow up with Acme about Phase 2', description: 'Schedule a call to discuss expansion options', dueDate: '2024-05-15', priority: 'high', status: 'not_started', owner: 'John Doe', associatedContactId: 1, associatedDealId: 11, createdAt: '2024-05-10' },
  { id: 2, title: 'Prepare Globex proposal', description: 'Create detailed proposal for platform migration', dueDate: '2024-05-12', priority: 'high', status: 'in_progress', owner: 'John Doe', associatedContactId: 2, associatedDealId: 2, createdAt: '2024-05-08' },
  { id: 3, title: 'Initech demo presentation', description: 'Schedule and conduct product demo', dueDate: '2024-05-18', priority: 'medium', status: 'not_started', owner: 'Sarah Smith', associatedContactId: 3, associatedDealId: 3, createdAt: '2024-05-12' },
  { id: 4, title: 'Review Stark contract', description: 'Final review before sending to legal', dueDate: '2024-05-14', priority: 'high', status: 'in_progress', owner: 'Mike Johnson', associatedContactId: 5, associatedDealId: 5, createdAt: '2024-05-11' },
  { id: 5, title: 'Wayne executive meeting', description: 'Present dashboard proposal to Wayne board', dueDate: '2024-05-20', priority: 'high', status: 'not_started', owner: 'John Doe', associatedContactId: 6, associatedDealId: 6, createdAt: '2024-05-15' },
  { id: 6, title: 'Cyberdyne technical review', description: 'Review technical requirements with IT team', dueDate: '2024-05-22', priority: 'medium', status: 'not_started', owner: 'Sarah Smith', associatedContactId: 7, associatedDealId: 7, createdAt: '2024-05-18' },
  { id: 7, title: 'Prepare Q2 sales report', description: 'Compile Q2 sales metrics and forecast', dueDate: '2024-06-30', priority: 'low', status: 'not_started', owner: 'Mike Johnson', createdAt: '2024-05-01' },
  { id: 8, title: 'Contact Massive Dynamic for meeting', description: 'Schedule discovery call with Amanda', dueDate: '2024-05-16', priority: 'medium', status: 'completed', owner: 'John Doe', associatedContactId: 9, associatedDealId: 9, createdAt: '2024-05-14' },
  { id: 9, title: 'Update product documentation', description: 'Add new features to help center', dueDate: '2024-05-25', priority: 'low', status: 'in_progress', owner: 'Sarah Smith', createdAt: '2024-05-20' },
  { id: 10, title: 'Team training session', description: 'Train new features to sales team', dueDate: '2024-05-28', priority: 'medium', status: 'not_started', owner: 'Mike Johnson', createdAt: '2024-05-22' },
  { id: 11, title: 'Review security compliance', description: 'Ensure all clients meet security standards', dueDate: '2024-06-01', priority: 'high', status: 'deferred', owner: 'John Doe', associatedContactId: 14, associatedDealId: 14, createdAt: '2024-05-15' },
  { id: 12, title: 'Update CRM data', description: 'Clean up duplicate contacts and companies', dueDate: '2024-05-30', priority: 'low', status: 'not_started', owner: 'Sarah Smith', createdAt: '2024-05-25' },
];

// Calls
export const calls = [
  { id: 1, contactId: 1, subject: 'Q1 Review Call', duration: 1800, outcome: 'connected', date: '2024-05-10', notes: 'Discussed Phase 2 expansion options. Customer is interested.', owner: 'John Doe' },
  { id: 2, contactId: 2, subject: 'Technical Requirements', duration: 2700, outcome: 'connected', date: '2024-05-08', notes: 'Reviewed technical specs for migration project.', owner: 'John Doe' },
  { id: 3, contactId: 3, subject: 'Product Demo Follow-up', duration: 1200, outcome: 'connected', date: '2024-05-12', notes: 'Customer wants to see specific features.', owner: 'Sarah Smith' },
  { id: 4, contactId: 5, subject: 'Contract Discussion', duration: 3600, outcome: 'connected', date: '2024-05-05', notes: 'Detailed contract review with legal team.', owner: 'Mike Johnson' },
  { id: 5, contactId: 6, subject: 'Executive Briefing', duration: 2400, outcome: 'missed', date: '2024-05-11', notes: 'Scheduled follow-up for next week.', owner: 'John Doe' },
  { id: 6, contactId: 7, subject: 'Technical Deep Dive', duration: 3000, outcome: 'connected', date: '2024-05-09', notes: 'IT team approved technical approach.', owner: 'Sarah Smith' },
  { id: 7, contactId: 9, subject: 'Discovery Call', duration: 1500, outcome: 'connected', date: '2024-05-14', notes: 'Initial conversation about integration needs.', owner: 'John Doe' },
  { id: 8, contactId: 15, subject: 'Financial Module Review', duration: 2100, outcome: 'voicemail', date: '2024-05-13', notes: 'Left voicemail, will try again tomorrow.', owner: 'Mike Johnson' },
];

// Emails
export const emails = [
  { id: 1, contactId: 1, subject: 'Phase 2 Expansion Proposal', sentAt: '2024-05-10', status: 'replied', owner: 'John Doe', body: 'Hi Sarah, Attached is the proposal for Phase 2 expansion...' },
  { id: 2, contactId: 2, subject: 'Technical Documentation', sentAt: '2024-05-08', status: 'opened', owner: 'John Doe', body: 'Hi Michael, Please find attached the technical documentation...' },
  { id: 3, contactId: 3, subject: 'Demo Recording', sentAt: '2024-05-12', status: 'sent', owner: 'Sarah Smith', body: 'Hi Emily, As discussed, here is the recording from today\'s demo...' },
  { id: 4, contactId: 5, subject: 'Contract Attachment', sentAt: '2024-05-05', status: 'replied', owner: 'Mike Johnson', body: 'Hi Lisa, Attached please find the final contract for review...' },
  { id: 5, contactId: 6, subject: 'Meeting Request', sentAt: '2024-05-11', status: 'sent', owner: 'John Doe', body: 'Hi Robert, I would like to schedule a meeting to present...' },
  { id: 6, contactId: 7, subject: 'Technical Requirements', sentAt: '2024-05-09', status: 'opened', owner: 'Sarah Smith', body: 'Hi Jennifer, Following up on our call, please find the technical requirements...' },
  { id: 7, contactId: 9, subject: 'Welcome Email', sentAt: '2024-05-14', status: 'opened', owner: 'John Doe', body: 'Hi Amanda, Welcome to Nexus CRM! We\'re excited to have you...' },
];

// Quotes
export const quotes = [
  { id: 1, number: 'Q-2024-001', contactId: 1, companyId: 1, dealId: 1, status: 'sent', total: 125000, validUntil: '2024-06-30', createdAt: '2024-02-01' },
  { id: 2, number: 'Q-2024-002', contactId: 2, companyId: 2, dealId: 2, status: 'draft', total: 250000, validUntil: '2024-07-15', createdAt: '2024-04-15' },
  { id: 3, number: 'Q-2024-003', contactId: 3, companyId: 3, dealId: 3, status: 'sent', total: 45000, validUntil: '2024-06-20', createdAt: '2024-04-20' },
  { id: 4, number: 'Q-2024-004', contactId: 5, companyId: 5, dealId: 5, status: 'draft', total: 750000, validUntil: '2024-08-01', createdAt: '2024-05-01' },
  { id: 5, number: 'Q-2024-005', contactId: 6, companyId: 6, dealId: 6, status: 'accepted', total: 180000, validUntil: '2024-06-15', createdAt: '2024-04-25' },
];

// Calendar Events
export const calendarEvents = [
  { id: 1, title: 'Acme Q1 Review', date: '2024-05-15', time: '10:00', duration: 60, type: 'meeting', contactId: 1, owner: 'John Doe' },
  { id: 2, title: 'Globex Proposal Review', date: '2024-05-16', time: '14:00', duration: 90, type: 'meeting', contactId: 2, owner: 'John Doe' },
  { id: 3, title: 'Initech Demo', date: '2024-05-18', time: '11:00', duration: 60, type: 'meeting', contactId: 3, owner: 'Sarah Smith' },
  { id: 4, title: 'Team Standup', date: '2024-05-15', time: '09:00', duration: 15, type: 'meeting', owner: 'John Doe' },
  { id: 5, title: 'Call: Robert Martinez', date: '2024-05-17', time: '15:00', duration: 30, type: 'call', contactId: 6, owner: 'John Doe' },
  { id: 6, title: 'Stark Contract Review', date: '2024-05-19', time: '10:30', duration: 120, type: 'meeting', contactId: 5, owner: 'Mike Johnson' },
  { id: 7, title: 'Sales Training', date: '2024-05-28', time: '14:00', duration: 180, type: 'meeting', owner: 'Mike Johnson' },
];

// Activities (for timeline)
export const activities = [
  { id: 1, type: 'email', contactId: 1, dealId: 11, title: 'Email sent to Sarah Johnson', description: 'Phase 2 Expansion Proposal', timestamp: '2024-05-10T14:30:00' },
  { id: 2, type: 'call', contactId: 1, dealId: 11, title: 'Call with Sarah Johnson', description: 'Q1 Review Call - 30 min', timestamp: '2024-05-10T10:00:00' },
  { id: 3, type: 'meeting', dealId: 2, title: 'Meeting scheduled', description: 'Globex Proposal Review', timestamp: '2024-05-09T16:00:00' },
  { id: 4, type: 'deal', dealId: 11, title: 'Deal updated', description: 'Stage changed to Contract Sent', timestamp: '2024-05-08T11:00:00' },
  { id: 5, type: 'task', title: 'Task completed', description: 'Contact Massive Dynamic for meeting', timestamp: '2024-05-14T09:30:00' },
  { id: 6, type: 'note', contactId: 3, title: 'Note added', description: 'Customer interested in automation features', timestamp: '2024-05-12T15:45:00' },
  { id: 7, type: 'deal', dealId: 14, title: 'Deal created', description: 'Stark Enterprise Agreement', timestamp: '2024-04-15T10:00:00' },
];

// Dashboard Metrics
export const dashboardMetrics = {
  totalContacts: 15,
  newContactsThisMonth: 8,
  contactsChange: 15,
  totalCompanies: 10,
  newCompaniesThisMonth: 4,
  companiesChange: 10,
  openDeals: 10,
  dealsValue: 2345000,
  dealsChange: 8,
  tasksDueToday: 3,
  tasksCompleted: 42,
  tasksChange: 12,
  revenue: 875000,
  revenueChange: 23,
  averageDealSize: 117250,
  dealWinRate: 68,
};

// Pipeline Stats
export const pipelineStats = dealStages.map(stage => ({
  ...stage,
  deals: deals.filter(d => d.stage === stage.id),
  totalValue: deals.filter(d => d.stage === stage.id).reduce((sum, d) => sum + d.amount, 0),
}));

// Helper functions
export const getContactById = (id) => contacts.find(c => c.id === id);
export const getCompanyById = (id) => companies.find(c => c.id === id);
export const getDealById = (id) => deals.find(d => d.id === id);
export const getDealsByContact = (contactId) => deals.filter(d => d.contactId === contactId);
export const getDealsByCompany = (companyId) => deals.filter(d => d.companyId === companyId);
export const getContactsByCompany = (companyId) => contacts.filter(c => c.companyId === companyId);
