// mock companies

export interface Company {
  id: string;
  name: string;
  industry: string;
  employees: number;
  intentScore: number;
  website: string;
  location: string;
  lastActivity: string;
  description: string;
  logo?: string;
}

export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Acme Corporation",
    industry: "Software",
    employees: 250,
    intentScore: 87,
    website: "acme.com",
    location: "San Francisco, CA",
    lastActivity: "2 hours ago",
    description: "Leading software solutions for enterprise customers",
  },
  {
    id: "2",
    name: "TechFlow Inc",
    industry: "SaaS",
    employees: 120,
    intentScore: 73,
    website: "techflow.io",
    location: "Austin, TX",
    lastActivity: "1 day ago",
    description: "Workflow automation platform for modern teams",
  },
  {
    id: "3",
    name: "DataDriven Corp",
    industry: "Analytics",
    employees: 85,
    intentScore: 91,
    website: "datadriven.com",
    location: "Seattle, WA",
    lastActivity: "3 hours ago",
    description: "Advanced analytics and business intelligence tools",
  },
  {
    id: "4",
    name: "CloudVenture LLC",
    industry: "Cloud Services",
    employees: 45,
    intentScore: 62,
    website: "cloudventure.com",
    location: "Denver, CO",
    lastActivity: "2 days ago",
    description: "Cloud infrastructure solutions for growing businesses",
  },
  {
    id: "5",
    name: "InnovateTech Solutions",
    industry: "AI/ML",
    employees: 180,
    intentScore: 89,
    website: "innovatetech.ai",
    location: "Boston, MA",
    lastActivity: "4 hours ago",
    description: "AI-powered solutions for business automation",
  },
  {
    id: "6",
    name: "SecureNet Systems",
    industry: "Cybersecurity",
    employees: 95,
    intentScore: 78,
    website: "securenet.com",
    location: "Washington, DC",
    lastActivity: "6 hours ago",
    description: "Enterprise cybersecurity and threat detection",
  },
  {
    id: "7",
    name: "FinTech Dynamics",
    industry: "Fintech",
    employees: 320,
    intentScore: 84,
    website: "fintechdynamics.com",
    location: "New York, NY",
    lastActivity: "1 hour ago",
    description: "Digital banking and payment solutions",
  },
  {
    id: "8",
    name: "HealthTech Partners",
    industry: "Healthcare",
    employees: 75,
    intentScore: 56,
    website: "healthtechpartners.com",
    location: "Chicago, IL",
    lastActivity: "3 days ago",
    description: "Healthcare management software and services",
  },
  {
    id: "9",
    name: "EduSoft Solutions",
    industry: "Education",
    employees: 110,
    intentScore: 67,
    website: "edusoft.edu",
    location: "Atlanta, GA",
    lastActivity: "1 day ago",
    description: "Educational technology and learning management systems",
  },
  {
    id: "10",
    name: "RetailMax Systems",
    industry: "Retail",
    employees: 200,
    intentScore: 71,
    website: "retailmax.com",
    location: "Los Angeles, CA",
    lastActivity: "5 hours ago",
    description: "Point-of-sale and inventory management for retailers",
  },
];

export const fetchCompanies = async (): Promise<Company[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockCompanies;
};

export const industries = [
  "Software",
  "SaaS",
  "Analytics",
  "Cloud Services",
  "AI/ML",
  "Cybersecurity",
  "Fintech",
  "Healthcare",
  "Education",
  "Retail",
];

export const companySizes = [
  { label: "Startup (1-10)", value: "startup", min: 1, max: 10 },
  { label: "Small (11-50)", value: "small", min: 11, max: 50 },
  { label: "Medium (51-200)", value: "medium", min: 51, max: 200 },
  { label: "Large (201-1000)", value: "large", min: 201, max: 1000 },
  { label: "Enterprise (1000+)", value: "enterprise", min: 1000, max: 999999 },
];
