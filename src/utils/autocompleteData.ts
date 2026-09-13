/**
 * Dual-Engine Single-Page Resume Builder
 * Autocomplete Datasets & Fast-Entry Helpers (Phase 3)
 * Comprehensive Directory of 350+ Indian Colleges, Universities, B-Schools & Global Institutes
 */

export interface InstitutionDetail {
  name: string;
  shortName: string;
  aliases: string[];
  city: string;
  state: string;
  country: string;
  category:
    | 'IIT'
    | 'NIT'
    | 'IIIT'
    | 'BITS'
    | 'State Govt / Autonomous'
    | 'Top Private / Deemed'
    | 'Central & State University'
    | 'IIM & B-School'
    | 'Science & Medical'
    | 'Global';
  tier?: string;
}

export const INDIAN_INSTITUTIONS_DIRECTORY: InstitutionDetail[] = [
  // ==========================================
  // 1. ALL 23 INDIAN INSTITUTES OF TECHNOLOGY (IITs) & IISc
  // ==========================================
  {
    name: 'Indian Institute of Technology (IIT) Bombay',
    shortName: 'IIT Bombay',
    aliases: ['IITB', 'IIT Bombay', 'Powai', 'IIT Mumbai'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Delhi',
    shortName: 'IIT Delhi',
    aliases: ['IITD', 'IIT Delhi', 'Hauz Khas'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Madras',
    shortName: 'IIT Madras',
    aliases: ['IITM', 'IIT Madras', 'IIT Chennai', 'Adyar'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Kanpur',
    shortName: 'IIT Kanpur',
    aliases: ['IITK', 'IIT Kanpur', 'IITK UP', 'Kalyanpur'],
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Kharagpur',
    shortName: 'IIT Kharagpur',
    aliases: ['IITKGP', 'IIT Kharagpur', 'IIT KGP'],
    city: 'Kharagpur',
    state: 'West Bengal',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Roorkee',
    shortName: 'IIT Roorkee',
    aliases: ['IITR', 'IIT Roorkee', 'Thomason College'],
    city: 'Roorkee',
    state: 'Uttarakhand',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Guwahati',
    shortName: 'IIT Guwahati',
    aliases: ['IITG', 'IIT Guwahati', 'IIT Assam', 'Amingaon'],
    city: 'Guwahati',
    state: 'Assam',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Hyderabad',
    shortName: 'IIT Hyderabad',
    aliases: ['IITH', 'IIT Hyderabad', 'Kandi Sangareddy'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT BHU) Varanasi',
    shortName: 'IIT BHU Varanasi',
    aliases: ['IIT BHU', 'IIT Varanasi', 'IT BHU'],
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Indore',
    shortName: 'IIT Indore',
    aliases: ['IITI', 'IIT Indore', 'Simrol'],
    city: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Gandhinagar',
    shortName: 'IIT Gandhinagar',
    aliases: ['IITGN', 'IIT Gandhinagar', 'IIT Gujarat', 'Palaj'],
    city: 'Gandhinagar',
    state: 'Gujarat',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Ropar',
    shortName: 'IIT Ropar',
    aliases: ['IIT RPR', 'IIT Ropar', 'IIT Punjab'],
    city: 'Rupnagar (Ropar)',
    state: 'Punjab',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Patna',
    shortName: 'IIT Patna',
    aliases: ['IITP', 'IIT Patna', 'Bihta'],
    city: 'Patna',
    state: 'Bihar',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Mandi',
    shortName: 'IIT Mandi',
    aliases: ['IIT Mandi', 'IIT HP', 'Kamand'],
    city: 'Mandi',
    state: 'Himachal Pradesh',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Jodhpur',
    shortName: 'IIT Jodhpur',
    aliases: ['IITJ', 'IIT Jodhpur', 'IIT Rajasthan', 'Karwar'],
    city: 'Jodhpur',
    state: 'Rajasthan',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Bhubaneswar',
    shortName: 'IIT Bhubaneswar',
    aliases: ['IIT BBS', 'IIT Bhubaneswar', 'IIT Odisha', 'Argul'],
    city: 'Bhubaneswar',
    state: 'Odisha',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT ISM) Dhanbad',
    shortName: 'IIT ISM Dhanbad',
    aliases: ['IIT ISM', 'ISM Dhanbad', 'IIT Dhanbad', 'Sardar Patel Nagar'],
    city: 'Dhanbad',
    state: 'Jharkhand',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Tirupati',
    shortName: 'IIT Tirupati',
    aliases: ['IITTP', 'IIT Tirupati', 'IIT AP', 'Yerpedu'],
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Palakkad',
    shortName: 'IIT Palakkad',
    aliases: ['IIT PKD', 'IIT Palakkad', 'IIT Kerala', 'Kanjikode'],
    city: 'Palakkad',
    state: 'Kerala',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Goa',
    shortName: 'IIT Goa',
    aliases: ['IIT Goa', 'Farmagudi GEC Campus'],
    city: 'Ponda',
    state: 'Goa',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Dharwad',
    shortName: 'IIT Dharwad',
    aliases: ['IIT DH', 'IIT Dharwad', 'IIT Karnataka', 'WALMI'],
    city: 'Dharwad',
    state: 'Karnataka',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Bhilai',
    shortName: 'IIT Bhilai',
    aliases: ['IIT Bhilai', 'IIT Chhattisgarh', 'Kutelabhata Durg'],
    city: 'Bhilai',
    state: 'Chhattisgarh',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Technology (IIT) Jammu',
    shortName: 'IIT Jammu',
    aliases: ['IIT Jammu', 'IIT JK', 'Jagti Nagrota'],
    city: 'Jammu',
    state: 'Jammu and Kashmir',
    country: 'India',
    category: 'IIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Science (IISc) Bangalore',
    shortName: 'IISc Bangalore',
    aliases: ['IISc', 'IISc Bangalore', 'Tata Institute Bangalore', 'CV Raman Road'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'Science & Medical',
    tier: 'Tier 1'
  },

  // ==========================================
  // 2. NATIONAL INSTITUTES OF TECHNOLOGY (NITs)
  // ==========================================
  {
    name: 'National Institute of Technology (NIT) Trichy',
    shortName: 'NIT Trichy',
    aliases: ['NITT', 'NIT Trichy', 'NIT Tiruchirappalli', 'REC Trichy', 'Thuvakudi'],
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology Karnataka (NITK) Surathkal',
    shortName: 'NITK Surathkal',
    aliases: ['NITK', 'NIT Surathkal', 'KREC Surathkal', 'NITK Mangalore', 'Srinivasnagar'],
    city: 'Surathkal, Mangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Warangal',
    shortName: 'NIT Warangal',
    aliases: ['NITW', 'NIT Warangal', 'REC Warangal', 'Kazipet'],
    city: 'Warangal',
    state: 'Telangana',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Rourkela',
    shortName: 'NIT Rourkela',
    aliases: ['NITR', 'NIT Rourkela', 'REC Rourkela'],
    city: 'Rourkela',
    state: 'Odisha',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Calicut',
    shortName: 'NIT Calicut',
    aliases: ['NITC', 'NIT Calicut', 'REC Calicut', 'NIT Kozhikode', 'Chathamangalam'],
    city: 'Kozhikode (Calicut)',
    state: 'Kerala',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'Visvesvaraya National Institute of Technology (VNIT) Nagpur',
    shortName: 'VNIT Nagpur',
    aliases: ['VNIT', 'VNIT Nagpur', 'VRCE Nagpur', 'South Ambazari Road'],
    city: 'Nagpur',
    state: 'Maharashtra',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'Malaviya National Institute of Technology (MNIT) Jaipur',
    shortName: 'MNIT Jaipur',
    aliases: ['MNIT', 'MNIT Jaipur', 'REC Jaipur', 'JLN Marg'],
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'Motilal Nehru National Institute of Technology (MNNIT) Allahabad',
    shortName: 'MNNIT Allahabad',
    aliases: ['MNNIT', 'MNNIT Allahabad', 'MNNIT Prayagraj', 'MNREC Teliarganj'],
    city: 'Prayagraj (Allahabad)',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'Sardar Vallabhbhai National Institute of Technology (SVNIT) Surat',
    shortName: 'SVNIT Surat',
    aliases: ['SVNIT', 'SVNIT Surat', 'SVRCET Ichchhanath'],
    city: 'Surat',
    state: 'Gujarat',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Kurukshetra',
    shortName: 'NIT Kurukshetra',
    aliases: ['NITKKR', 'NIT Kurukshetra', 'REC Kurukshetra', 'Thanesar'],
    city: 'Kurukshetra',
    state: 'Haryana',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Durgapur',
    shortName: 'NIT Durgapur',
    aliases: ['NITDGP', 'NIT Durgapur', 'REC Durgapur', 'Mahatma Gandhi Avenue'],
    city: 'Durgapur',
    state: 'West Bengal',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Silchar',
    shortName: 'NIT Silchar',
    aliases: ['NITS', 'NIT Silchar', 'REC Silchar'],
    city: 'Silchar',
    state: 'Assam',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'Dr. B.R. Ambedkar National Institute of Technology (NIT) Jalandhar',
    shortName: 'NIT Jalandhar',
    aliases: ['NITJ', 'NIT Jalandhar', 'REC Jalandhar', 'GT Road Amritsar Bypass'],
    city: 'Jalandhar',
    state: 'Punjab',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Delhi',
    shortName: 'NIT Delhi',
    aliases: ['NITD', 'NIT Delhi', 'Plot No FA7 Zone P1 Narela'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Jamshedpur',
    shortName: 'NIT Jamshedpur',
    aliases: ['NITJSR', 'NIT Jamshedpur', 'RIT Jamshedpur', 'Adityapur'],
    city: 'Jamshedpur',
    state: 'Jharkhand',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Patna',
    shortName: 'NIT Patna',
    aliases: ['NITP', 'NIT Patna', 'BCE Patna', 'Ashok Rajpath'],
    city: 'Patna',
    state: 'Bihar',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Raipur',
    shortName: 'NIT Raipur',
    aliases: ['NITRR', 'NIT Raipur', 'GEC Raipur', 'GE Road'],
    city: 'Raipur',
    state: 'Chhattisgarh',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'Maulana Azad National Institute of Technology (MANIT) Bhopal',
    shortName: 'MANIT Bhopal',
    aliases: ['MANIT', 'MANIT Bhopal', 'MACT Bhopal', 'NIT Bhopal', 'Link Road Number 3'],
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Hamirpur',
    shortName: 'NIT Hamirpur',
    aliases: ['NITH', 'NIT Hamirpur', 'REC Hamirpur', 'Anu'],
    city: 'Hamirpur',
    state: 'Himachal Pradesh',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Goa',
    shortName: 'NIT Goa',
    aliases: ['NITG', 'NIT Goa', 'Cuncolim South Goa'],
    city: 'Cuncolim',
    state: 'Goa',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Andhra Pradesh',
    shortName: 'NIT Andhra Pradesh',
    aliases: ['NIT AP', 'NIT Tadepalligudem', 'NIT West Godavari'],
    city: 'Tadepalligudem',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Meghalaya',
    shortName: 'NIT Meghalaya',
    aliases: ['NITM', 'NIT Meghalaya', 'NIT Shillong', 'Sohra Cherrapunjee'],
    city: 'Shillong / Sohra',
    state: 'Meghalaya',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Agartala',
    shortName: 'NIT Agartala',
    aliases: ['NITA', 'NIT Agartala', 'TEC Tripura', 'Jirania'],
    city: 'Agartala',
    state: 'Tripura',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Srinagar',
    shortName: 'NIT Srinagar',
    aliases: ['NIT Srinagar', 'REC Srinagar', 'Hazratbal'],
    city: 'Srinagar',
    state: 'Jammu and Kashmir',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Uttarakhand',
    shortName: 'NIT Uttarakhand',
    aliases: ['NITUK', 'NIT Srinagar Garhwal'],
    city: 'Srinagar Garhwal',
    state: 'Uttarakhand',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Technology (NIT) Puducherry',
    shortName: 'NIT Puducherry',
    aliases: ['NITPY', 'NIT Karaikal', 'NIT Pondicherry'],
    city: 'Karaikal',
    state: 'Puducherry',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Engineering Science and Technology (IIEST) Shibpur',
    shortName: 'IIEST Shibpur',
    aliases: ['IIEST', 'IIEST Shibpur', 'BESU Shibpur', 'Bengal Engineering College'],
    city: 'Howrah',
    state: 'West Bengal',
    country: 'India',
    category: 'NIT',
    tier: 'Tier 1'
  },

  // ==========================================
  // 3. INDIAN INSTITUTES OF INFORMATION TECHNOLOGY (IIITs)
  // ==========================================
  {
    name: 'International Institute of Information Technology (IIIT) Hyderabad',
    shortName: 'IIIT Hyderabad',
    aliases: ['IIITH', 'IIIT Hyderabad', 'IIIT-H', 'Gachibowli'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'International Institute of Information Technology (IIIT) Bangalore',
    shortName: 'IIIT Bangalore',
    aliases: ['IIITB', 'IIIT Bangalore', 'IIIT-B', 'Electronic City'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indraprastha Institute of Information Technology (IIIT) Delhi',
    shortName: 'IIIT Delhi',
    aliases: ['IIITD', 'IIIT Delhi', 'IIIT-D', 'Okhla Phase 3'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Information Technology (IIIT) Allahabad',
    shortName: 'IIIT Allahabad',
    aliases: ['IIITA', 'IIIT Allahabad', 'IIIT Prayagraj', 'Jhalwa'],
    city: 'Prayagraj (Allahabad)',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'ABV - Indian Institute of Information Technology and Management (IIITM) Gwalior',
    shortName: 'IIITM Gwalior',
    aliases: ['IIITM', 'IIIT Gwalior', 'ABV-IIITM'],
    city: 'Gwalior',
    state: 'Madhya Pradesh',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Information Technology (IIIT) Lucknow',
    shortName: 'IIIT Lucknow',
    aliases: ['IIITL', 'IIIT Lucknow', 'IIIT-L', 'Ahmamau'],
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Information Technology (IIIT) Pune',
    shortName: 'IIIT Pune',
    aliases: ['IIITP', 'IIIT Pune', 'Ambegaon'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Information Technology Design and Manufacturing (IIITDM) Jabalpur',
    shortName: 'IIITDM Jabalpur',
    aliases: ['IIITDMJ', 'IIIT Jabalpur', 'PDPM IIITDM'],
    city: 'Jabalpur',
    state: 'Madhya Pradesh',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Information Technology Design and Manufacturing (IIITDM) Kancheepuram',
    shortName: 'IIITDM Kancheepuram',
    aliases: ['IIITDM Chennai', 'IIIT Kancheepuram', 'Vandalur-Kelambakkam'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Information Technology (IIIT) Sri City',
    shortName: 'IIIT Sri City',
    aliases: ['IIITS', 'IIIT Sri City', 'IIIT Chittoor', 'Tada'],
    city: 'Sri City (Chittoor)',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Information Technology (IIIT) Guwahati',
    shortName: 'IIIT Guwahati',
    aliases: ['IIITG', 'IIIT Guwahati', 'Bongora'],
    city: 'Guwahati',
    state: 'Assam',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Information Technology (IIIT) Vadodara',
    shortName: 'IIIT Vadodara',
    aliases: ['IIITV', 'IIIT Vadodara', 'IIIT Gandhinagar Campus'],
    city: 'Gandhinagar / Vadodara',
    state: 'Gujarat',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Information Technology (IIIT) Nagpur',
    shortName: 'IIIT Nagpur',
    aliases: ['IIITN', 'IIIT Nagpur', 'Waranga'],
    city: 'Nagpur',
    state: 'Maharashtra',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Information Technology (IIIT) Surat',
    shortName: 'IIIT Surat',
    aliases: ['IIIT Surat', 'Kamrej'],
    city: 'Surat',
    state: 'Gujarat',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Information Technology (IIIT) Kota',
    shortName: 'IIIT Kota',
    aliases: ['IIIT Kota', 'MNIT Campus', 'Ranpur'],
    city: 'Kota / Jaipur',
    state: 'Rajasthan',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Information Technology (IIIT) Bhopal',
    shortName: 'IIIT Bhopal',
    aliases: ['IIIT Bhopal', 'MANIT Campus'],
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    country: 'India',
    category: 'IIIT',
    tier: 'Tier 1'
  },

  // ==========================================
  // 4. BITS PILANI CAMPUSES
  // ==========================================
  {
    name: 'Birla Institute of Technology and Science (BITS Pilani)',
    shortName: 'BITS Pilani',
    aliases: ['BITS', 'BITS Pilani', 'Pilani', 'Vidya Vihar'],
    city: 'Pilani',
    state: 'Rajasthan',
    country: 'India',
    category: 'BITS',
    tier: 'Tier 1'
  },
  {
    name: 'BITS Pilani, K.K. Birla Goa Campus',
    shortName: 'BITS Goa',
    aliases: ['BITS Goa', 'BITS Pilani Goa', 'Zuarinagar', 'Sancoale'],
    city: 'Zuarinagar',
    state: 'Goa',
    country: 'India',
    category: 'BITS',
    tier: 'Tier 1'
  },
  {
    name: 'BITS Pilani, Hyderabad Campus',
    shortName: 'BITS Hyderabad',
    aliases: ['BITS Hyderabad', 'BITS Pilani Hyderabad', 'Shamirpet', 'Jawahar Nagar'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'BITS',
    tier: 'Tier 1'
  },

  // ==========================================
  // 5. TELANGANA UNIVERSITIES & ENGINEERING COLLEGES (WOXSEN, MAHINDRA, CBIT, VNR, ETC.)
  // ==========================================
  {
    name: 'Woxsen University (School of Technology / Business)',
    shortName: 'Woxsen University Hyderabad',
    aliases: ['Woxsen', 'Woxsen University', 'Woxsen Hyderabad', 'Woxsen Sadasivpet', 'Woxsen School of Technology', 'Woxsen BTech', 'Woxsen MBA', 'Woxsen Campus'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Mahindra University (École Centrale School of Engineering)',
    shortName: 'Mahindra University Hyderabad',
    aliases: ['Mahindra University', 'Mahindra Ecole Centrale', 'MEC Hyderabad', 'Bahadurpally', 'Tech Mahindra'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Chaitanya Bharathi Institute of Technology (CBIT Hyderabad)',
    shortName: 'CBIT Hyderabad',
    aliases: ['CBIT', 'CBIT Hyderabad', 'Gandipet', 'Chaitanya Bharathi'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET)',
    shortName: 'VNR VJIET Hyderabad',
    aliases: ['VNR', 'VNRVJIET', 'VNR VJIET', 'Bachupally', 'Vignana Jyothi'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Vasavi College of Engineering (VCE Hyderabad)',
    shortName: 'Vasavi College Hyderabad',
    aliases: ['Vasavi', 'VCE Hyderabad', 'Ibrahimbagh', 'Vasavi Engineering'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'G. Narayanamma Institute of Technology and Science for Women (GNITS)',
    shortName: 'GNITS Hyderabad',
    aliases: ['GNITS', 'Narayanamma College', 'Shaikpet', 'GNITS Hyderabad'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'CVR College of Engineering (CVR Hyderabad)',
    shortName: 'CVR College Hyderabad',
    aliases: ['CVR', 'CVRCE', 'Vastunagar', 'Ibrahimpatnam'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Vardhaman College of Engineering (VCE Shamshabad)',
    shortName: 'Vardhaman College Hyderabad',
    aliases: ['Vardhaman', 'Vardhaman College', 'Shamshabad', 'Kacharam'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'B.V. Raju Institute of Technology (BVRIT Narsapur / Hyderabad)',
    shortName: 'BVRIT Narsapur',
    aliases: ['BVRIT', 'BVRIT Narsapur', 'Sri Vishnu Educational Society', 'Medak'],
    city: 'Hyderabad / Narsapur',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'BVRIT Hyderabad College of Engineering for Women (Nizampet)',
    shortName: 'BVRIT Hyderabad (Women)',
    aliases: ['BVRITH', 'BVRIT Nizampet', 'BVRIT Women', 'Bachupally Nizampet'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Gokaraju Rangaraju Institute of Engineering and Technology (GRIET)',
    shortName: 'GRIET Hyderabad',
    aliases: ['GRIET', 'Gokaraju Rangaraju', 'Bachupally', 'Miyapur'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Sreenidhi Institute of Science and Technology (SNIST Hyderabad)',
    shortName: 'SNIST Hyderabad',
    aliases: ['SNIST', 'Sreenidhi', 'Ghatkesar', 'Yamnampet'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Mahatma Gandhi Institute of Technology (MGIT Hyderabad)',
    shortName: 'MGIT Hyderabad',
    aliases: ['MGIT', 'Gandipet MGIT', 'Chaitanya Seva'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Keshav Memorial Institute of Technology (KMIT Hyderabad)',
    shortName: 'KMIT Hyderabad',
    aliases: ['KMIT', 'Keshav Memorial', 'Narayanguda'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Neil Gogte Institute of Technology (NGIT Hyderabad)',
    shortName: 'NGIT Hyderabad',
    aliases: ['NGIT', 'Neil Gogte', 'Peerzadiguda', 'Uppal'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Kakatiya Institute of Technology and Science (KITS Warangal)',
    shortName: 'KITS Warangal',
    aliases: ['KITSW', 'KITS Warangal', 'Yerragattu Hillock'],
    city: 'Warangal',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Anurag University (CVSR College of Engineering Hyderabad)',
    shortName: 'Anurag University Hyderabad',
    aliases: ['Anurag', 'Anurag University', 'CVSR', 'Venkatapur Ghatkesar'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Malla Reddy University / Malla Reddy College of Engineering (MRCET)',
    shortName: 'Malla Reddy University Hyderabad',
    aliases: ['Malla Reddy', 'MRCET', 'MRUH', 'Maisammaguda', 'Dhulapally', 'MRCE'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Institute of Aeronautical Engineering (IARE Dundigal Hyderabad)',
    shortName: 'IARE Hyderabad',
    aliases: ['IARE', 'IARE Dundigal', 'Aeronautical Engineering Hyderabad'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },
  {
    name: 'CMR College of Engineering & Technology (CMRCET / CMRIT Hyderabad)',
    shortName: 'CMR Group Hyderabad',
    aliases: ['CMRCET', 'CMRIT Hyderabad', 'CMRGI', 'Kandlakoya Medchal'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'MLR Institute of Technology (MLRIT Dundigal Hyderabad)',
    shortName: 'MLRIT Hyderabad',
    aliases: ['MLRIT', 'MLR Institute', 'Dundigal Police Academy'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Geethanjali College of Engineering and Technology (GCET Cheeryal)',
    shortName: 'GCET Hyderabad',
    aliases: ['GCET', 'Geethanjali College', 'Cheeryal Keesara'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Vignan Institute of Technology and Science (VITS Deshmukhi)',
    shortName: 'VITS Hyderabad',
    aliases: ['VITS', 'Vignan Hyderabad', 'Deshmukhi Pochampally'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'GITAM Deemed University (Hyderabad Campus)',
    shortName: 'GITAM Hyderabad',
    aliases: ['GITAM', 'GITAM Hyderabad', 'Rudraram Patancheru'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'KL University (Hyderabad Campus)',
    shortName: 'KL University Hyderabad',
    aliases: ['KLU', 'KL University Hyderabad', 'Aziznagar Bowrampet'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Maturi Venkata Subba Rao (MVSR Engineering College Nadergul)',
    shortName: 'MVSR Hyderabad',
    aliases: ['MVSR', 'MVSR Engineering', 'Nadergul Saroornagar'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },
  {
    name: 'Muffakham Jah College of Engineering and Technology (MJCET)',
    shortName: 'MJCET Hyderabad',
    aliases: ['MJCET', 'Muffakham Jah', 'Banjara Hills Sultan-ul-Uloom'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },
  {
    name: 'Stanley College of Engineering and Technology for Women (Abids)',
    shortName: 'Stanley College Hyderabad',
    aliases: ['Stanley', 'Stanley College', 'Abids Hyderabad'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'St. Martin\'s Engineering College (SMEC Secunderabad)',
    shortName: 'St. Martin\'s College Hyderabad',
    aliases: ['SMEC', 'St Martins', 'Dhulapally Kompally'],
    city: 'Secunderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'JB Institute of Engineering and Technology (JBIET Yenkapally)',
    shortName: 'JBIET Hyderabad',
    aliases: ['JBIET', 'JB Institute', 'Yenkapally Moinabad'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Vidya Jyothi Institute of Technology (VJIT Aziznagar)',
    shortName: 'VJIT Hyderabad',
    aliases: ['VJIT', 'Vidya Jyothi', 'Aziznagar Gate Himayatnagar'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Rajiv Gandhi University of Knowledge Technologies (RGUKT Basar IIIT)',
    shortName: 'RGUKT Basar',
    aliases: ['RGUKT Basar', 'IIIT Basar', 'Nirmal Telangana'],
    city: 'Basar',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'University of Hyderabad (UoH / HCU Hyderabad)',
    shortName: 'University of Hyderabad',
    aliases: ['HCU', 'UoH', 'Hyderabad Central University', 'Gachibowli'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'English and Foreign Languages University (EFLU Hyderabad)',
    shortName: 'EFLU Hyderabad',
    aliases: ['EFLU', 'CIEFL', 'Tarnaka Osmania Campus'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'University College of Engineering, Osmania University (UCE OU)',
    shortName: 'UCE Osmania University Hyderabad',
    aliases: ['UCE OU', 'Osmania Engineering', 'OU Hyderabad', 'Amberpet'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'JNTUH University College of Engineering Hyderabad',
    shortName: 'JNTU Hyderabad',
    aliases: ['JNTUH', 'JNTU Hyderabad', 'Kukatpally UCEH'],
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },

  // ==========================================
  // 6. ANDHRA PRADESH COLLEGES & UNIVERSITIES
  // ==========================================
  {
    name: 'Andhra University College of Engineering (AUCE Visakhapatnam)',
    shortName: 'AUCE Visakhapatnam',
    aliases: ['AUCE', 'AU Vizag', 'Andhra University Engineering', 'Waltair'],
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'JNTUK University College of Engineering Kakinada',
    shortName: 'JNTU Kakinada',
    aliases: ['JNTUK', 'JNTU Kakinada', 'UCEK Kakinada'],
    city: 'Kakinada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'JNTUA University College of Engineering Anantapur',
    shortName: 'JNTU Anantapur',
    aliases: ['JNTUA', 'JNTU Anantapur', 'CEA Anantapur'],
    city: 'Ananthapuramu',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Sri Venkateswara University College of Engineering (SVUCE Tirupati)',
    shortName: 'SVUCE Tirupati',
    aliases: ['SVUCE', 'SV University Tirupati', 'SVU Engineering'],
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Gayatri Vidya Parishad College of Engineering (GVPCE Visakhapatnam)',
    shortName: 'GVPCE Visakhapatnam',
    aliases: ['GVP', 'GVPCE', 'Gayatri College', 'Madhurawada'],
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Anil Neerukonda Institute of Technology and Sciences (ANITS Vizag)',
    shortName: 'ANITS Visakhapatnam',
    aliases: ['ANITS', 'Anil Neerukonda', 'Sangivalasa Bheemunipatnam'],
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Koneru Lakshmaiah Education Foundation (KL University Vaddeswaram)',
    shortName: 'KL University Vijayawada',
    aliases: ['KLU', 'KL University', 'KLEF', 'Vaddeswaram Guntur'],
    city: 'Vijayawada / Guntur',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'GITAM Deemed to be University (Visakhapatnam Main Campus)',
    shortName: 'GITAM University Vizag',
    aliases: ['GITAM', 'GITAM Vizag', 'Gandhi Institute of Technology Rushikonda'],
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Vignan\'s Foundation for Science, Technology & Research (VFSTR / Vignan University)',
    shortName: 'Vignan University Guntur',
    aliases: ['VFSTR', 'Vignan Guntur', 'Vignan University', 'Vadlamudi'],
    city: 'Guntur',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'SRM University AP (Amaravati)',
    shortName: 'SRM University AP',
    aliases: ['SRM AP', 'SRM Amaravati', 'Neerukonda Mangalagiri'],
    city: 'Amaravati',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'VIT-AP University (Amaravati)',
    shortName: 'VIT-AP Amaravati',
    aliases: ['VIT AP', 'VIT Amaravati', 'Inavolu Beside Secretariat'],
    city: 'Amaravati',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Sree Vidyanikethan Engineering College (Mohan Babu University Tirupati)',
    shortName: 'Sree Vidyanikethan Tirupati',
    aliases: ['SVEC', 'Mohan Babu University', 'Vidyanikethan', 'A.Rangampet'],
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'R.V.R. & J.C. College of Engineering (RVR&JC Guntur)',
    shortName: 'RVR & JC College Guntur',
    aliases: ['RVRJC', 'RVR & JC', 'Chowdavaram Guntur'],
    city: 'Guntur',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Velagapudi Ramakrishna Siddhartha Engineering College (VRSEC Vijayawada)',
    shortName: 'VR Siddhartha Vijayawada',
    aliases: ['VRSEC', 'Siddhartha Engineering', 'Kanuru Vijayawada'],
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Prasad V. Potluri Siddhartha Institute of Technology (PVPSIT Vijayawada)',
    shortName: 'PVPSIT Vijayawada',
    aliases: ['PVPSIT', 'PVP Siddhartha', 'Kanuru'],
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },
  {
    name: 'G. Pulla Reddy Engineering College (GPREC Kurnool)',
    shortName: 'GPREC Kurnool',
    aliases: ['GPREC', 'G Pulla Reddy', 'Kurnool Engineering'],
    city: 'Kurnool',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Maharaj Vijayaram Gajapathi Raj College of Engineering (MVGRCE Vizianagaram)',
    shortName: 'MVGR College Vizianagaram',
    aliases: ['MVGR', 'MVGRCE', 'Chintalavalasa'],
    city: 'Vizianagaram',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Shri Vishnu Engineering College for Women (SVECW Bhimavaram)',
    shortName: 'SVECW Bhimavaram',
    aliases: ['SVECW', 'Vishnu Women Bhimavaram', 'Vishnupur'],
    city: 'Bhimavaram',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Vishnu Institute of Technology (VIT Bhimavaram)',
    shortName: 'Vishnu Institute Bhimavaram',
    aliases: ['VITB', 'Vishnu Bhimavaram', 'Vishnupur Kovvada'],
    city: 'Bhimavaram',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Sagi Rama Krishnam Raju Engineering College (SRKR Bhimavaram)',
    shortName: 'SRKR Engineering Bhimavaram',
    aliases: ['SRKR', 'SRKR Bhimavaram', 'Chinna Amiram'],
    city: 'Bhimavaram',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'GMR Institute of Technology (GMRIT Rajam)',
    shortName: 'GMRIT Rajam',
    aliases: ['GMRIT', 'GMR Rajam', 'Srikakulam GMR'],
    city: 'Rajam',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Pragati Engineering College (Surampalem / Kakinada)',
    shortName: 'Pragati Engineering Surampalem',
    aliases: ['Pragati', 'Pragati Engineering', 'Surampalem Peddapuram'],
    city: 'Surampalem / Kakinada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },
  {
    name: 'Aditya Engineering College (AEC Surampalem)',
    shortName: 'Aditya Engineering College Surampalem',
    aliases: ['Aditya', 'AEC Surampalem', 'Aditya Academy'],
    city: 'Surampalem / Kakinada',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },
  {
    name: 'Madanapalle Institute of Technology & Science (MITS Madanapalle)',
    shortName: 'MITS Madanapalle',
    aliases: ['MITS', 'MITS Madanapalle', 'Kurabalakota Chittoor'],
    city: 'Madanapalle',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },
  {
    name: 'Vasireddy Venkatadri Institute of Technology (VVIT Nambur)',
    shortName: 'VVIT Guntur',
    aliases: ['VVIT', 'Vasireddy Venkatadri', 'Nambur Pedakakani'],
    city: 'Guntur',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },
  {
    name: 'Rajiv Gandhi University of Knowledge Technologies (RGUKT Nuzvid / RK Valley)',
    shortName: 'RGUKT IIIT AP',
    aliases: ['RGUKT Nuzvid', 'RGUKT RK Valley', 'IIIT Nuzvid', 'IIIT Idupulapaya'],
    city: 'Nuzvid / Kadapa',
    state: 'Andhra Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },

  // ==========================================
  // 7. KARNATAKA COLLEGES & UNIVERSITIES (RVCE, BMS, MSRIT, PES, ETC.)
  // ==========================================
  {
    name: 'RV College of Engineering (RVCE Bangalore)',
    shortName: 'RVCE Bangalore',
    aliases: ['RVCE', 'RV College', 'RV Bangalore', 'Mysore Road'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'BMS College of Engineering (BMSCE Bangalore)',
    shortName: 'BMSCE Bangalore',
    aliases: ['BMSCE', 'BMS College', 'Basavanagudi Bull Temple Road'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'M.S. Ramaiah Institute of Technology (MSRIT Bangalore)',
    shortName: 'MSRIT Bangalore',
    aliases: ['MSRIT', 'Ramaiah Tech', 'MSRIT Mathikere', 'Ramaiah University'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'PES University (PESIT / PESU Bangalore)',
    shortName: 'PES University Bangalore',
    aliases: ['PESU', 'PESIT', 'PES Bangalore', 'Ring Road Campus', 'Electronic City Campus'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Manipal Institute of Technology (MAHE Manipal)',
    shortName: 'MIT Manipal',
    aliases: ['MIT Manipal', 'MAHE', 'Manipal University', 'Manipal Academy'],
    city: 'Manipal',
    state: 'Karnataka',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Manipal Institute of Technology Bengaluru (MAHE Bengaluru)',
    shortName: 'MIT Bengaluru',
    aliases: ['MIT Bangalore', 'MAHE Bengaluru', 'Yelahanka'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Dayananda Sagar College of Engineering (DSCE Bangalore)',
    shortName: 'DSCE Bangalore',
    aliases: ['DSCE', 'Dayananda Sagar', 'Kumaraswamy Layout'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'BMS Institute of Technology and Management (BMSIT Bangalore)',
    shortName: 'BMSIT Bangalore',
    aliases: ['BMSIT', 'BMSIT&M', 'Yelahanka Avalahalli'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Bangalore Institute of Technology (BIT Bangalore)',
    shortName: 'BIT Bangalore',
    aliases: ['BIT', 'BIT Bangalore', 'K.R. Road V.V. Puram'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Sir M. Visvesvaraya Institute of Technology (Sir MVIT Bangalore)',
    shortName: 'Sir MVIT Bangalore',
    aliases: ['Sir MVIT', 'MVIT Bangalore', 'Hunasamaranahalli'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Nitte Meenakshi Institute of Technology (NMIT Bangalore)',
    shortName: 'NMIT Bangalore',
    aliases: ['NMIT', 'Nitte Meenakshi', 'Yelahanka Govindapura'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'New Horizon College of Engineering (NHCE Bangalore)',
    shortName: 'NHCE Bangalore',
    aliases: ['NHCE', 'New Horizon', 'Outer Ring Road Marathahalli'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'RNS Institute of Technology (RNSIT Bangalore)',
    shortName: 'RNSIT Bangalore',
    aliases: ['RNSIT', 'RNS Tech', 'Channasandra Rajarajeshwarinagar'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'CMR Institute of Technology (CMRIT Bangalore)',
    shortName: 'CMRIT Bangalore',
    aliases: ['CMRIT', 'CMRIT Bangalore', 'ITPL Main Road Kundalahalli'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'University Visvesvaraya College of Engineering (UVCE Bangalore)',
    shortName: 'UVCE Bangalore',
    aliases: ['UVCE', 'UVCE Bangalore', 'K.R. Circle'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'JSS Science and Technology University (SJCE Mysore)',
    shortName: 'SJCE Mysore',
    aliases: ['SJCE', 'JSS STU', 'Jayachamarajendra College of Engineering', 'Manasagangothri'],
    city: 'Mysore',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'The National Institute of Engineering (NIE Mysore)',
    shortName: 'NIE Mysore',
    aliases: ['NIE', 'NIE Mysore', 'Manandavadi Road'],
    city: 'Mysore',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Siddaganga Institute of Technology (SIT Tumkur)',
    shortName: 'SIT Tumkur',
    aliases: ['SIT', 'SIT Tumkur', 'Siddaganga Math'],
    city: 'Tumkur',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'KLE Technological University (BVBCET Hubli)',
    shortName: 'KLE Tech Hubli',
    aliases: ['KLE Tech', 'BVBCET', 'B.V. Bhoomaraddi', 'Vidyanagar Hubballi'],
    city: 'Hubballi (Hubli)',
    state: 'Karnataka',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'NMAM Institute of Technology (NITTE Nitte / Karkala)',
    shortName: 'NMAMIT Nitte',
    aliases: ['NMAMIT', 'NITTE University', 'Karkala Udupi'],
    city: 'Nitte (Udupi)',
    state: 'Karnataka',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Christ University (Bangalore Main / Kengeri / Yeshwanthpur)',
    shortName: 'Christ University Bangalore',
    aliases: ['Christ', 'Christ University', 'Hosur Road', 'Dairy Circle', 'Kengeri'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'Reva University (Bangalore)',
    shortName: 'Reva University Bangalore',
    aliases: ['Reva', 'Reva University', 'Kattigenahalli Yelahanka'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Presidency University (Bangalore)',
    shortName: 'Presidency University Bangalore',
    aliases: ['Presidency', 'Presidency University', 'Itgalpur Rajanakunte'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Alliance University (Bangalore)',
    shortName: 'Alliance University Bangalore',
    aliases: ['Alliance', 'Alliance University', 'Chandapura Anekal'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Jain University (Faculty of Engineering and Technology - JU FET)',
    shortName: 'Jain University Bangalore',
    aliases: ['Jain', 'Jain University', 'JGI', 'Kanakapura Road Ramanagara'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },

  // ==========================================
  // 8. MAHARASHTRA COLLEGES & UNIVERSITIES (COEP, VJTI, SPIT, PICT, ETC.)
  // ==========================================
  {
    name: 'College of Engineering, Pune (COEP Technological University)',
    shortName: 'COEP Pune',
    aliases: ['COEP', 'COEP Pune', 'College of Engineering Pune', 'Shivajinagar'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Veermata Jijabai Technological Institute (VJTI Mumbai)',
    shortName: 'VJTI Mumbai',
    aliases: ['VJTI', 'VJTI Mumbai', 'Matunga'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Institute of Chemical Technology (ICT Mumbai)',
    shortName: 'ICT Mumbai',
    aliases: ['ICT', 'ICT Mumbai', 'UDCT Mumbai', 'Matunga East'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Sardar Patel Institute of Technology (SPIT Mumbai)',
    shortName: 'SPIT Mumbai',
    aliases: ['SPIT', 'SPIT Mumbai', 'Bhavans Campus Andheri West'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Sardar Patel College of Engineering (SPCE Mumbai)',
    shortName: 'SPCE Mumbai',
    aliases: ['SPCE', 'SPCE Mumbai', 'Andheri West'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Pune Institute of Computer Technology (PICT Pune)',
    shortName: 'PICT Pune',
    aliases: ['PICT', 'PICT Pune', 'Dhankawadi'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Walchand College of Engineering (WCE Sangli)',
    shortName: 'Walchand College Sangli',
    aliases: ['WCE', 'Walchand Sangli', 'Vishrambag'],
    city: 'Sangli',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Vishwakarma Institute of Technology (VIT Pune)',
    shortName: 'VIT Pune',
    aliases: ['VIT Pune', 'Vishwakarma Tech', 'Bibwewadi Upper Indira Nagar'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Vishwakarma Institute of Information Technology (VIIT Pune)',
    shortName: 'VIIT Pune',
    aliases: ['VIIT', 'VIIT Pune', 'Kondhwa'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },
  {
    name: 'Maharashtra Institute of Technology (MIT World Peace University - MIT-WPU)',
    shortName: 'MIT-WPU Pune',
    aliases: ['MIT Pune', 'MIT-WPU', 'Kothrud Paud Road', 'World Peace University'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'MIT Academy of Engineering (MITAOE Alandi Pune)',
    shortName: 'MITAOE Alandi',
    aliases: ['MITAOE', 'MIT Alandi', 'Alandi Pune'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },
  {
    name: 'MKSSS\'s Cummins College of Engineering for Women (CCOEW Pune)',
    shortName: 'Cummins College Pune',
    aliases: ['CCOEW', 'Cummins Pune', 'Karve Nagar Maharshee Karve'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Pimpri Chinchwad College of Engineering (PCCOE Pune)',
    shortName: 'PCCOE Pune',
    aliases: ['PCCOE', 'PCCOE Nigdi', 'Pradhikaran Akurdi'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Dwarkadas J. Sanghvi College of Engineering (DJSCE Mumbai)',
    shortName: 'DJSCE Mumbai',
    aliases: ['DJSCE', 'DJ Sanghvi', 'Vile Parle West SVKM'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'K. J. Somaiya College of Engineering (KJSCE Mumbai)',
    shortName: 'KJSCE Mumbai',
    aliases: ['KJSCE', 'KJ Somaiya', 'Vidyavihar East Somaiya Vidyavihar'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Thadomal Shahani Engineering College (TSEC Bandra Mumbai)',
    shortName: 'TSEC Mumbai',
    aliases: ['TSEC', 'Thadomal Shahani', 'Bandra West National College'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Vivekanand Education Society\'s Institute of Technology (VESIT Chembur Mumbai)',
    shortName: 'VESIT Mumbai',
    aliases: ['VESIT', 'VESIT Chembur', 'Sindhi Society Collector Colony'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Fr. Conceicao Rodrigues College of Engineering (CRCE Bandra Mumbai)',
    shortName: 'Fr. Agnel CRCE Bandra',
    aliases: ['CRCE', 'Fr Agnel Bandra', 'Bandstand'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },
  {
    name: 'Army Institute of Technology (AIT Dighi Pune)',
    shortName: 'AIT Pune',
    aliases: ['AIT', 'AIT Pune', 'Dighi Alandi Road'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Shri Guru Gobind Singhji Institute of Engineering and Technology (SGGSIE&T Nanded)',
    shortName: 'SGGS Nanded',
    aliases: ['SGGS', 'SGGSIE&T', 'Vishnupuri Nanded'],
    city: 'Nanded',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Shri Ramdeobaba College of Engineering and Management (RCOEM Nagpur)',
    shortName: 'RCOEM Nagpur',
    aliases: ['RCOEM', 'Ramdeobaba College', 'Gittikhadan Katol Road', 'Ramdeobaba University'],
    city: 'Nagpur',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Yashwantrao Chavan College of Engineering (YCCE Nagpur)',
    shortName: 'YCCE Nagpur',
    aliases: ['YCCE', 'Yashwantrao Chavan', 'Hingna Road Wanadongri'],
    city: 'Nagpur',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'K. K. Wagh Institute of Engineering Education and Research (KKWIEER Nashik)',
    shortName: 'KK Wagh Nashik',
    aliases: ['KK Wagh', 'KKWIEER', 'Amrutdham Panchavati'],
    city: 'Nashik',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Government College of Engineering, Aurangabad (GECA / GCOEA)',
    shortName: 'GCE Aurangabad',
    aliases: ['GECA', 'GCOEA', 'Osmanpura Aurangabad'],
    city: 'Chhatrapati Sambhajinagar (Aurangabad)',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Government College of Engineering, Karad (GCEK)',
    shortName: 'GCE Karad',
    aliases: ['GCEK', 'Vidyanagar Karad Satara'],
    city: 'Karad',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Government College of Engineering, Amravati (GCOEA)',
    shortName: 'GCE Amravati',
    aliases: ['GCOEA', 'VMV Road Amravati'],
    city: 'Amravati',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Walchand Institute of Technology (WIT Solapur)',
    shortName: 'WIT Solapur',
    aliases: ['WIT Solapur', 'Walchand Solapur', 'Ashok Chowk'],
    city: 'Solapur',
    state: 'Maharashtra',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },

  // ==========================================
  // 9. TAMIL NADU COLLEGES & UNIVERSITIES (PSG, SSN, CIT, SASTRA, SRM, VIT, ETC.)
  // ==========================================
  {
    name: 'Vellore Institute of Technology (VIT Vellore)',
    shortName: 'VIT Vellore',
    aliases: ['VIT', 'VIT Vellore', 'Katpadi Vellore Tech'],
    city: 'Vellore',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Vellore Institute of Technology (VIT Chennai)',
    shortName: 'VIT Chennai',
    aliases: ['VIT Chennai', 'Vandalur Kelambakkam Road'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'PSG College of Technology (PSG Tech Coimbatore)',
    shortName: 'PSG Tech Coimbatore',
    aliases: ['PSG', 'PSG Tech', 'Peelamedu Coimbatore', 'PSG College'],
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'PSG Institute of Technology and Applied Research (PSG iTech Coimbatore)',
    shortName: 'PSG iTech Coimbatore',
    aliases: ['PSG iTech', 'Neelambur Coimbatore'],
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Sri Sivasubramaniya Nadar College of Engineering (SSN Chennai)',
    shortName: 'SSN College Chennai',
    aliases: ['SSN', 'SSNCE', 'Shiv Nadar Chennai', 'Kalavakkam OMR'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Coimbatore Institute of Technology (CIT Coimbatore)',
    shortName: 'CIT Coimbatore',
    aliases: ['CIT', 'CIT Coimbatore', 'Civil Aerodrome Post Peelamedu'],
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Government College of Technology (GCT Coimbatore)',
    shortName: 'GCT Coimbatore',
    aliases: ['GCT', 'GCT Coimbatore', 'Thadagam Road'],
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Kumaraguru College of Technology (KCT Coimbatore)',
    shortName: 'KCT Coimbatore',
    aliases: ['KCT', 'Kumaraguru', 'Saravanampatti Coimbatore'],
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Sri Krishna College of Engineering and Technology (SKCET Coimbatore)',
    shortName: 'SKCET Coimbatore',
    aliases: ['SKCET', 'Sri Krishna Tech', 'Kuniamuthur'],
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'SASTRA Deemed to be University (SASTRA Thanjavur)',
    shortName: 'SASTRA University Thanjavur',
    aliases: ['SASTRA', 'SASTRA Thanjavur', 'Tirumalaisamudram'],
    city: 'Thanjavur',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Amrita Vishwa Vidyapeetham (Amrita Coimbatore Main Campus)',
    shortName: 'Amrita University Coimbatore',
    aliases: ['Amrita', 'Amrita Vishwa Vidyapeetham', 'Ettimadai Coimbatore'],
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'SRM Institute of Science and Technology (SRM Kattankulathur Chennai)',
    shortName: 'SRM University Chennai',
    aliases: ['SRM', 'SRMIST', 'SRM Chennai', 'KTR Campus Potheri'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Anna University (College of Engineering Guindy - CEG Campus)',
    shortName: 'CEG Anna University Chennai',
    aliases: ['CEG', 'Anna University', 'CEG Guindy', 'Sardar Patel Road'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Madras Institute of Technology (MIT Anna University Chromepet)',
    shortName: 'MIT Chromepet Chennai',
    aliases: ['MIT Chennai', 'MIT Chromepet', 'Anna University MIT'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Rajalakshmi Engineering College (REC Thandalam Chennai)',
    shortName: 'Rajalakshmi College Chennai',
    aliases: ['REC', 'Rajalakshmi', 'Thandalam Sriperumbudur'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Sri Venkateswara College of Engineering (SVCE Sriperumbudur)',
    shortName: 'SVCE Chennai',
    aliases: ['SVCE', 'SVCE Sriperumbudur', 'Pennalur'],
    city: 'Chennai / Sriperumbudur',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Chennai Institute of Technology (CIT Sarathy Nagar Chennai)',
    shortName: 'CIT Chennai',
    aliases: ['CIT Chennai', 'Chennai Institute of Technology', 'Kundrathur'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Thiagarajar College of Engineering (TCE Madurai)',
    shortName: 'TCE Madurai',
    aliases: ['TCE', 'Thiagarajar Madurai', 'Thiruparankundram'],
    city: 'Madurai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Mepco Schlenk Engineering College (Sivakasi)',
    shortName: 'Mepco Schlenk Sivakasi',
    aliases: ['Mepco', 'Mepco Schlenk', 'Mepco Nagar Virudhunagar'],
    city: 'Sivakasi',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Bannari Amman Institute of Technology (BIT Sathyamangalam)',
    shortName: 'Bannari Amman Sathyamangalam',
    aliases: ['BIT Sathy', 'Bannari Amman', 'Erode'],
    city: 'Sathyamangalam (Erode)',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Kongu Engineering College (KEC Perundurai)',
    shortName: 'Kongu Engineering Erode',
    aliases: ['KEC', 'Kongu College', 'Perundurai Erode'],
    city: 'Perundurai (Erode)',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Sathyabama Institute of Science and Technology (Chennai)',
    shortName: 'Sathyabama University Chennai',
    aliases: ['Sathyabama', 'Jeppiaar Sathyabama', 'Jeppiaar Nagar Sholinganallur'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },

  // ==========================================
  // 10. DELHI NCR, UP, HARYANA & PUNJAB COLLEGES
  // ==========================================
  {
    name: 'Delhi Technological University (DTU / DCE)',
    shortName: 'DTU New Delhi',
    aliases: ['DTU', 'DCE', 'Delhi College of Engineering', 'Shahbad Daulatpur Bawana Road'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Netaji Subhas University of Technology (NSUT / NSIT)',
    shortName: 'NSUT New Delhi',
    aliases: ['NSUT', 'NSIT', 'Netaji Subhas Institute of Technology', 'Sector 3 Dwarka'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Indira Gandhi Delhi Technical University for Women (IGDTUW)',
    shortName: 'IGDTUW Delhi',
    aliases: ['IGDTUW', 'IGIT Delhi', 'Kashmere Gate'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Maharaja Agrasen Institute of Technology (MAIT Delhi / GGSIPU)',
    shortName: 'MAIT Delhi',
    aliases: ['MAIT', 'Maharaja Agrasen', 'Rohini Sector 22'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Maharaja Surajmal Institute of Technology (MSIT Delhi / GGSIPU)',
    shortName: 'MSIT Delhi',
    aliases: ['MSIT', 'Maharaja Surajmal', 'Janakpuri'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Thapar Institute of Engineering and Technology (TIET Patiala)',
    shortName: 'Thapar Patiala',
    aliases: ['Thapar', 'TIET', 'Thapar University', 'Bhadson Road'],
    city: 'Patiala',
    state: 'Punjab',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Punjab Engineering College (PEC Chandigarh)',
    shortName: 'PEC Chandigarh',
    aliases: ['PEC', 'PEC University of Technology', 'Sector 12 Chandigarh'],
    city: 'Chandigarh',
    state: 'Chandigarh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Chitkara University (Punjab / Himachal Pradesh)',
    shortName: 'Chitkara University Punjab',
    aliases: ['Chitkara', 'Chitkara Rajpura', 'Chitkara Baddi'],
    city: 'Rajpura / Chandigarh',
    state: 'Punjab',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Chandigarh University (CU Mohali)',
    shortName: 'Chandigarh University Mohali',
    aliases: ['CU', 'Chandigarh University', 'Gharuan Mohali'],
    city: 'Mohali / Chandigarh',
    state: 'Punjab',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Lovely Professional University (LPU Phagwara / Jalandhar)',
    shortName: 'LPU Punjab',
    aliases: ['LPU', 'Lovely Professional University', 'GT Road Phagwara'],
    city: 'Phagwara / Jalandhar',
    state: 'Punjab',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Plaksha University (Mohali)',
    shortName: 'Plaksha University Mohali',
    aliases: ['Plaksha', 'Plaksha Mohali', 'IT City Mohali'],
    city: 'Mohali',
    state: 'Punjab',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Ashoka University (Sonipat)',
    shortName: 'Ashoka University Sonipat',
    aliases: ['Ashoka', 'Ashoka University', 'Rajiv Gandhi Education City Sonipat'],
    city: 'Sonipat',
    state: 'Haryana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Shiv Nadar University (SNU Greater Noida)',
    shortName: 'Shiv Nadar University Noida',
    aliases: ['SNU', 'Shiv Nadar', 'SNU Greater Noida', 'Dadri'],
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Jaypee Institute of Information Technology (JIIT Noida)',
    shortName: 'JIIT Noida',
    aliases: ['JIIT', 'Jaypee Noida', 'JIIT Sector 62', 'JIIT Sector 128'],
    city: 'Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Bennett University (Times Group Greater Noida)',
    shortName: 'Bennett University Greater Noida',
    aliases: ['Bennett', 'Bennett University', 'Plot Nos 8-11 TechZone II'],
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'BML Munjal University (Hero Group Gurgaon)',
    shortName: 'BML Munjal University Gurgaon',
    aliases: ['BMU', 'BML Munjal', 'Sidhrawali NH 48 Gurugram'],
    city: 'Gurugram',
    state: 'Haryana',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Galgotias University / GCET (Greater Noida)',
    shortName: 'Galgotias Greater Noida',
    aliases: ['Galgotias', 'Galgotias University', 'GCET Greater Noida', 'Yamuna Expressway'],
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Sharda University (Greater Noida)',
    shortName: 'Sharda University Greater Noida',
    aliases: ['Sharda', 'Sharda University', 'Knowledge Park III'],
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Amity University (Noida Main Campus)',
    shortName: 'Amity University Noida',
    aliases: ['Amity', 'Amity University', 'Amity Noida Sector 125'],
    city: 'Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Harcourt Butler Technical University (HBTU Kanpur)',
    shortName: 'HBTU Kanpur',
    aliases: ['HBTU', 'HBTI Kanpur', 'Nawabganj'],
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Institute of Engineering and Technology (IET Lucknow)',
    shortName: 'IET Lucknow',
    aliases: ['IET', 'IET Lucknow', 'Sitapur Road AKTU'],
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Madan Mohan Malaviya University of Technology (MMMUT Gorakhpur)',
    shortName: 'MMMUT Gorakhpur',
    aliases: ['MMMUT', 'MMMEC Gorakhpur', 'Deoria Road'],
    city: 'Gorakhpur',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Ajay Kumar Garg Engineering College (AKGEC Ghaziabad)',
    shortName: 'AKGEC Ghaziabad',
    aliases: ['AKGEC', 'AK Garg', '27th Km Stone Delhi-Hapur Bypass'],
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },
  {
    name: 'KIET Group of Institutions (KIET Ghaziabad)',
    shortName: 'KIET Ghaziabad',
    aliases: ['KIET', 'KIET Ghaziabad', 'Muradnagar'],
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },
  {
    name: 'JSS Academy of Technical Education (JSSATE Noida)',
    shortName: 'JSS Noida',
    aliases: ['JSS Noida', 'JSSATE Noida', 'Sector 62'],
    city: 'Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },
  {
    name: 'ABES Engineering College (ABESEC Ghaziabad)',
    shortName: 'ABES Ghaziabad',
    aliases: ['ABES', 'ABESEC', 'NH 24 Crossings Republik'],
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'GL Bajaj Institute of Technology and Management (Greater Noida)',
    shortName: 'GL Bajaj Greater Noida',
    aliases: ['GL Bajaj', 'GLBITM', 'Knowledge Park II'],
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },

  // ==========================================
  // 11. GUJARAT & RAJASTHAN COLLEGES
  // ==========================================
  {
    name: 'Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT)',
    shortName: 'DA-IICT Gandhinagar',
    aliases: ['DAIICT', 'DA-IICT', 'DAIICT Gandhinagar', 'Reliance DAIICT'],
    city: 'Gandhinagar',
    state: 'Gujarat',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Nirma University (Institute of Technology)',
    shortName: 'Nirma University Ahmedabad',
    aliases: ['Nirma', 'Nirma University', 'S.G. Highway Chharodi'],
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Pandit Deendayal Energy University (PDEU / PDPU Gandhinagar)',
    shortName: 'PDEU Gandhinagar',
    aliases: ['PDEU', 'PDPU', 'Pandit Deendayal Petroleum University', 'Raisan Village'],
    city: 'Gandhinagar',
    state: 'Gujarat',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'The LNM Institute of Information Technology (LNMIIT Jaipur)',
    shortName: 'LNMIIT Jaipur',
    aliases: ['LNMIIT', 'LNMIIT Jaipur', 'Rupa ki Nangal Jamdoli'],
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Manipal University Jaipur (MUJ)',
    shortName: 'Manipal University Jaipur',
    aliases: ['MUJ', 'Manipal Jaipur', 'Dehmi Kalan Ajmer Road'],
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'L.D. College of Engineering (LDCE Ahmedabad)',
    shortName: 'LDCE Ahmedabad',
    aliases: ['LDCE', 'LD College of Engineering', 'Navrangpura'],
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Birla Vishvakarma Mahavidyalaya (BVM Engineering College Anand)',
    shortName: 'BVM Anand',
    aliases: ['BVM', 'BVM Engineering', 'Vallabh Vidyanagar Anand'],
    city: 'Anand',
    state: 'Gujarat',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Dharmsinh Desai University (DDU Nadiad)',
    shortName: 'DDU Nadiad',
    aliases: ['DDU', 'DDIT Nadiad', 'College Road Nadiad'],
    city: 'Nadiad',
    state: 'Gujarat',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Charotar University of Science and Technology (CHARUSAT Changa)',
    shortName: 'CHARUSAT Gujarat',
    aliases: ['CHARUSAT', 'Charusat University', 'Changa Anand'],
    city: 'Anand',
    state: 'Gujarat',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Parul University (Vadodara)',
    shortName: 'Parul University Vadodara',
    aliases: ['Parul', 'Parul University', 'Limda Waghodia'],
    city: 'Vadodara',
    state: 'Gujarat',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },

  // ==========================================
  // 12. WEST BENGAL & ODISHA COLLEGES
  // ==========================================
  {
    name: 'Jadavpur University, Faculty of Engineering & Technology',
    shortName: 'Jadavpur University Kolkata',
    aliases: ['JU', 'Jadavpur University', 'JU Kolkata', 'Raja S.C. Mallick Road'],
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Kalinga Institute of Industrial Technology (KIIT Bhubaneswar)',
    shortName: 'KIIT Bhubaneswar',
    aliases: ['KIIT', 'KIIT University', 'KIIT Odisha', 'Patia Bhubaneswar'],
    city: 'Bhubaneswar',
    state: 'Odisha',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Siksha \'O\' Anusandhan (SOA / ITER Bhubaneswar)',
    shortName: 'SOA University Bhubaneswar',
    aliases: ['SOA', 'ITER Bhubaneswar', 'Siksha O Anusandhan', 'Khandagiri'],
    city: 'Bhubaneswar',
    state: 'Odisha',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Heritage Institute of Technology (HIT Kolkata)',
    shortName: 'Heritage Kolkata',
    aliases: ['HIT Kolkata', 'Heritage Institute', 'Anandapur Chowbaga'],
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Institute of Engineering and Management (IEM Kolkata)',
    shortName: 'IEM Kolkata',
    aliases: ['IEM', 'IEM Kolkata', 'Salt Lake Sector V'],
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Techno India University / Techno Main Salt Lake (Kolkata)',
    shortName: 'Techno India Salt Lake',
    aliases: ['Techno India', 'TMSL Kolkata', 'Sector V Salt Lake'],
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Veer Surendra Sai University of Technology (VSSUT Burla)',
    shortName: 'VSSUT Burla',
    aliases: ['VSSUT', 'UCE Burla', 'Sambalpur Odisha'],
    city: 'Burla (Sambalpur)',
    state: 'Odisha',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Odisha University of Technology and Research (OUTR / CET Bhubaneswar)',
    shortName: 'OUTR Bhubaneswar',
    aliases: ['OUTR', 'CET Bhubaneswar', 'Ghatikia'],
    city: 'Bhubaneswar',
    state: 'Odisha',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'C. V. Raman Global University (CGU Bhubaneswar)',
    shortName: 'CV Raman Global University',
    aliases: ['CGU', 'CV Raman College', 'Bidyanagar Mahura'],
    city: 'Bhubaneswar',
    state: 'Odisha',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Kalyani Government Engineering College (KGEC Kalyani)',
    shortName: 'KGEC Kalyani',
    aliases: ['KGEC', 'Kalyani Engineering', 'Nadia'],
    city: 'Kalyani',
    state: 'West Bengal',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Haldia Institute of Technology (HIT Haldia)',
    shortName: 'HIT Haldia',
    aliases: ['HIT Haldia', 'Haldia Tech', 'Purba Medinipur'],
    city: 'Haldia',
    state: 'West Bengal',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 2'
  },

  // ==========================================
  // 13. KERALA, MP, BIHAR, JHARKHAND & UTTARAKHAND COLLEGES
  // ==========================================
  {
    name: 'College of Engineering Trivandrum (CET Thiruvananthapuram)',
    shortName: 'CET Trivandrum',
    aliases: ['CET', 'CET Trivandrum', 'Sreekaryam CET'],
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'TKM College of Engineering (TKMCE Kollam)',
    shortName: 'TKM College Kollam',
    aliases: ['TKM', 'TKMCE', 'Karicode Kollam'],
    city: 'Kollam',
    state: 'Kerala',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Government Engineering College, Thrissur (GECT Thrissur)',
    shortName: 'GEC Thrissur',
    aliases: ['GECT', 'GEC Thrissur', 'Ramavarmapuram'],
    city: 'Thrissur',
    state: 'Kerala',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Govt. Model Engineering College (MEC Kochi)',
    shortName: 'Model Engineering College Kochi',
    aliases: ['MEC', 'MEC Kochi', 'Thrikkakara Ernakulam'],
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Rajagiri School of Engineering & Technology (RSET Kochi)',
    shortName: 'Rajagiri RSET Kochi',
    aliases: ['RSET', 'Rajagiri', 'Kakkanad Kochi'],
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Shri Govindram Seksaria Institute of Technology and Science (SGSITS Indore)',
    shortName: 'SGSITS Indore',
    aliases: ['SGSITS', 'GSITS Indore', 'Park Road Indore'],
    city: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Institute of Engineering and Technology, DAVV (IET DAVV Indore)',
    shortName: 'IET DAVV Indore',
    aliases: ['IET DAVV', 'DAVV Indore', 'Khandwa Road'],
    city: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Jabalpur Engineering College (JEC Jabalpur)',
    shortName: 'JEC Jabalpur',
    aliases: ['JEC', 'JEC Jabalpur', 'Gokulpur'],
    city: 'Jabalpur',
    state: 'Madhya Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Madhav Institute of Technology & Science (MITS Gwalior)',
    shortName: 'MITS Gwalior',
    aliases: ['MITS', 'MITS Gwalior', 'Race Course Road'],
    city: 'Gwalior',
    state: 'Madhya Pradesh',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'Lakshmi Narain College of Technology (LNCT Bhopal)',
    shortName: 'LNCT Bhopal',
    aliases: ['LNCT', 'LNCT Bhopal', 'Kalchuri Nagar Raisen Road'],
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },
  {
    name: 'Birla Institute of Technology (BIT Mesra Ranchi)',
    shortName: 'BIT Mesra Ranchi',
    aliases: ['BIT Mesra', 'BIT Ranchi', 'Mesra'],
    city: 'Ranchi',
    state: 'Jharkhand',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'BIT Sindri (Dhanbad)',
    shortName: 'BIT Sindri',
    aliases: ['BIT Sindri', 'Bihar Institute of Technology Sindri'],
    city: 'Dhanbad',
    state: 'Jharkhand',
    country: 'India',
    category: 'State Govt / Autonomous',
    tier: 'Tier 1'
  },
  {
    name: 'University of Petroleum and Energy Studies (UPES Dehradun)',
    shortName: 'UPES Dehradun',
    aliases: ['UPES', 'UPES Dehradun', 'Bidholi Kandoli'],
    city: 'Dehradun',
    state: 'Uttarakhand',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'Graphic Era Deemed to be University (GEU Dehradun)',
    shortName: 'Graphic Era Dehradun',
    aliases: ['Graphic Era', 'GEU Dehradun', 'Bell Road Clement Town'],
    city: 'Dehradun',
    state: 'Uttarakhand',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 1'
  },
  {
    name: 'DIT University (Dehradun)',
    shortName: 'DIT University Dehradun',
    aliases: ['DIT', 'DIT Dehradun', 'Mussoorie Diversion Road'],
    city: 'Dehradun',
    state: 'Uttarakhand',
    country: 'India',
    category: 'Top Private / Deemed',
    tier: 'Tier 2'
  },

  // ==========================================
  // 14. TOP CENTRAL & STATE UNIVERSITIES (ARTS, COMMERCE, SCIENCES)
  // ==========================================
  {
    name: 'University of Delhi (St. Stephen\'s College)',
    shortName: 'St. Stephen\'s College DU',
    aliases: ['St. Stephens', 'Stephens DU', 'North Campus DU'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'University of Delhi (Shri Ram College of Commerce - SRCC)',
    shortName: 'SRCC Delhi University',
    aliases: ['SRCC', 'Shri Ram College of Commerce', 'North Campus DU', 'Maurice Nagar'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'University of Delhi (Hindu College)',
    shortName: 'Hindu College DU',
    aliases: ['Hindu College', 'Hindu DU', 'North Campus DU'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'University of Delhi (Hansraj College)',
    shortName: 'Hansraj College DU',
    aliases: ['Hansraj', 'Hansraj DU', 'North Campus DU', 'Malkaganj'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'University of Delhi (Lady Shri Ram College for Women - LSR)',
    shortName: 'LSR Delhi University',
    aliases: ['LSR', 'Lady Shri Ram College', 'Lajpat Nagar IV DU'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'University of Delhi (Miranda House)',
    shortName: 'Miranda House DU',
    aliases: ['Miranda House', 'Miranda DU', 'North Campus DU'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'Banaras Hindu University (BHU Varanasi)',
    shortName: 'BHU Varanasi',
    aliases: ['BHU', 'Banaras Hindu University', 'Kashi Hindu Vishwavidyalaya'],
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'Jawaharlal Nehru University (JNU New Delhi)',
    shortName: 'JNU New Delhi',
    aliases: ['JNU', 'Jawaharlal Nehru University', 'New Mehrauli Road'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'Jamia Millia Islamia (JMI New Delhi)',
    shortName: 'Jamia Millia Islamia',
    aliases: ['JMI', 'Jamia Millia Islamia', 'Jamia Nagar Okhla'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'Aligarh Muslim University (AMU Aligarh)',
    shortName: 'AMU Aligarh',
    aliases: ['AMU', 'Aligarh Muslim University'],
    city: 'Aligarh',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'University of Mumbai (MU Mumbai)',
    shortName: 'Mumbai University',
    aliases: ['MU', 'University of Mumbai', 'Kalina Campus', 'Fort Campus'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'University of Calcutta (CU Kolkata)',
    shortName: 'Calcutta University',
    aliases: ['CU', 'University of Calcutta', 'College Street Asutosh Building'],
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'Savitribai Phule Pune University (SPPU / UniPune)',
    shortName: 'SPPU Pune',
    aliases: ['SPPU', 'Pune University', 'UniPune', 'Ganeshkhind'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'St. Xavier\'s College, Autonomous (Mumbai / Kolkata)',
    shortName: 'St. Xavier\'s College',
    aliases: ['St. Xaviers Mumbai', 'St. Xaviers Kolkata', 'Xaviers CST', 'Park Street'],
    city: 'Mumbai / Kolkata',
    state: 'Maharashtra / West Bengal',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'Loyola College (Chennai)',
    shortName: 'Loyola College Chennai',
    aliases: ['Loyola', 'Loyola College', 'Nungambakkam Sterling Road'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'Madras Christian College (MCC Chennai)',
    shortName: 'MCC Chennai',
    aliases: ['MCC', 'Madras Christian College', 'Tambaram East'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'Presidency University (Kolkata)',
    shortName: 'Presidency University Kolkata',
    aliases: ['Presidency College', 'Presidency Kolkata', 'College Street'],
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'Mithibai College of Arts & Chauhan Institute of Science (Mumbai)',
    shortName: 'Mithibai College Mumbai',
    aliases: ['Mithibai', 'Mithibai College', 'Vile Parle West SVKM'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'Narsee Monjee College of Commerce and Economics (NM College Mumbai)',
    shortName: 'NM College Mumbai',
    aliases: ['NM College', 'Narsee Monjee College', 'Vile Parle West'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'H.R. College of Commerce and Economics (Mumbai)',
    shortName: 'H.R. College Mumbai',
    aliases: ['HR College', 'HR College of Commerce', 'Churchgate Dinshaw Wachha Road'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },
  {
    name: 'Symbiosis College of Arts & Commerce (Pune)',
    shortName: 'Symbiosis Arts & Commerce Pune',
    aliases: ['Symbiosis College', 'SCAC Pune', 'Senapati Bapat Road'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'Central & State University',
    tier: 'Tier 1'
  },

  // ==========================================
  // 15. TOP INDIAN MANAGEMENT INSTITUTES (IIMs & B-SCHOOLS)
  // ==========================================
  {
    name: 'Indian Institute of Management (IIM) Ahmedabad',
    shortName: 'IIM Ahmedabad',
    aliases: ['IIMA', 'IIM Ahmedabad', 'Vastrapur'],
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Management (IIM) Bangalore',
    shortName: 'IIM Bangalore',
    aliases: ['IIMB', 'IIM Bangalore', 'Bannerghatta Road'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Management (IIM) Calcutta',
    shortName: 'IIM Calcutta',
    aliases: ['IIMC', 'IIM Calcutta', 'Joka Diamond Harbour Road'],
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Management (IIM) Lucknow',
    shortName: 'IIM Lucknow',
    aliases: ['IIML', 'IIM Lucknow', 'Prabandh Nagar IIM Road'],
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Management (IIM) Kozhikode',
    shortName: 'IIM Kozhikode',
    aliases: ['IIMK', 'IIM Kozhikode', 'Kunnamangalam'],
    city: 'Kozhikode',
    state: 'Kerala',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Management (IIM) Indore',
    shortName: 'IIM Indore',
    aliases: ['IIMI', 'IIM Indore', 'Prabandh Shikhar Rau'],
    city: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Indian School of Business (ISB Hyderabad / Mohali)',
    shortName: 'ISB Hyderabad',
    aliases: ['ISB', 'ISB Hyderabad', 'ISB Mohali', 'Gachibowli'],
    city: 'Hyderabad / Mohali',
    state: 'Telangana / Punjab',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'XLRI - Xavier School of Management (Jamshedpur / Delhi-NCR)',
    shortName: 'XLRI Jamshedpur',
    aliases: ['XLRI', 'XLRI Jamshedpur', 'XLRI Delhi-NCR', 'CH Area Jamshedpur'],
    city: 'Jamshedpur',
    state: 'Jharkhand',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Faculty of Management Studies (FMS), University of Delhi',
    shortName: 'FMS Delhi',
    aliases: ['FMS', 'FMS Delhi', 'FMS DU', 'Malkaganj North Campus'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'S.P. Jain Institute of Management and Research (SPJIMR Mumbai)',
    shortName: 'SPJIMR Mumbai',
    aliases: ['SPJIMR', 'SP Jain Mumbai', 'Munshi Nagar Andheri West'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Management Development Institute (MDI Gurgaon)',
    shortName: 'MDI Gurgaon',
    aliases: ['MDI', 'MDI Gurgaon', 'Mehrauli Road Sukhrali'],
    city: 'Gurugram',
    state: 'Haryana',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Jamnalal Bajaj Institute of Management Studies (JBIMS Mumbai)',
    shortName: 'JBIMS Mumbai',
    aliases: ['JBIMS', 'Bajaj Mumbai', 'Churchgate HT Parekh Marg', 'CEO Factory'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Tata Institute of Social Sciences (TISS Mumbai)',
    shortName: 'TISS Mumbai',
    aliases: ['TISS', 'TISS Mumbai', 'VN Purav Marg Deonar'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Foreign Trade (IIFT Delhi / Kolkata)',
    shortName: 'IIFT Delhi',
    aliases: ['IIFT', 'IIFT Delhi', 'IIFT Kolkata', 'Qutab Institutional Area'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'NMIMS School of Business Management (Mumbai)',
    shortName: 'NMIMS Mumbai',
    aliases: ['NMIMS', 'NMIMS SBM', 'VL Mehta Road Vile Parle West'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Symbiosis Institute of Business Management (SIBM Pune)',
    shortName: 'SIBM Pune',
    aliases: ['SIBM', 'SIBM Pune', 'Lavale Gram Taluka Mulshi'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Symbiosis Centre for Management and Human Resource Development (SCMHRD Pune)',
    shortName: 'SCMHRD Pune',
    aliases: ['SCMHRD', 'SCMHRD Pune', 'Hinjewadi Infotech Park Phase 1'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Institute of Management Technology (IMT Ghaziabad)',
    shortName: 'IMT Ghaziabad',
    aliases: ['IMT', 'IMT Ghaziabad', 'Raj Nagar Hapur Road'],
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Xavier Institute of Management (XIMB / XIM University Bhubaneswar)',
    shortName: 'XIMB Bhubaneswar',
    aliases: ['XIMB', 'XIM University', 'Xavier Square Jayadev Vihar'],
    city: 'Bhubaneswar',
    state: 'Odisha',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },
  {
    name: 'Great Lakes Institute of Management (Chennai / Gurgaon)',
    shortName: 'Great Lakes Chennai',
    aliases: ['Great Lakes', 'GLIM Chennai', 'GLIM Gurgaon', 'East Coast Road Manamai'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'IIM & B-School',
    tier: 'Tier 1'
  },

  // ==========================================
  // 16. TOP SCIENCE, RESEARCH & MEDICAL
  // ==========================================
  {
    name: 'All India Institute of Medical Sciences (AIIMS New Delhi)',
    shortName: 'AIIMS New Delhi',
    aliases: ['AIIMS', 'AIIMS Delhi', 'Ansari Nagar'],
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    category: 'Science & Medical',
    tier: 'Tier 1'
  },
  {
    name: 'Tata Institute of Fundamental Research (TIFR Mumbai)',
    shortName: 'TIFR Mumbai',
    aliases: ['TIFR', 'TIFR Mumbai', 'Homi Bhabha Road Colaba'],
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    category: 'Science & Medical',
    tier: 'Tier 1'
  },
  {
    name: 'Indian Institute of Science Education and Research (IISER Pune / Kolkata / Mohali / Bhopal / TVM)',
    shortName: 'IISER India',
    aliases: ['IISER', 'IISER Pune', 'IISER Kolkata', 'IISER Mohali', 'IISER Bhopal', 'IISER Thiruvananthapuram'],
    city: 'Pune / Kolkata / Bhopal',
    state: 'Multiple States',
    country: 'India',
    category: 'Science & Medical',
    tier: 'Tier 1'
  },
  {
    name: 'Christian Medical College (CMC Vellore)',
    shortName: 'CMC Vellore',
    aliases: ['CMC', 'CMC Vellore', 'Ida Scudder Road'],
    city: 'Vellore',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Science & Medical',
    tier: 'Tier 1'
  },
  {
    name: 'National Institute of Mental Health and Neurosciences (NIMHANS Bangalore)',
    shortName: 'NIMHANS Bangalore',
    aliases: ['NIMHANS', 'NIMHANS Bangalore', 'Hosur Road'],
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    category: 'Science & Medical',
    tier: 'Tier 1'
  },
];

export const GLOBAL_INSTITUTIONS_DIRECTORY: InstitutionDetail[] = [
  {
    name: 'University of California, Berkeley (UC Berkeley)',
    shortName: 'UC Berkeley',
    aliases: ['Cal', 'Berkeley', 'UCB'],
    city: 'Berkeley',
    state: 'California',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'Stanford University',
    shortName: 'Stanford',
    aliases: ['Stanford', 'Leland Stanford'],
    city: 'Stanford',
    state: 'California',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'Massachusetts Institute of Technology (MIT)',
    shortName: 'MIT Cambridge',
    aliases: ['MIT', 'MIT Boston', 'Cambridge'],
    city: 'Cambridge',
    state: 'Massachusetts',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'Carnegie Mellon University (CMU)',
    shortName: 'CMU Pittsburgh',
    aliases: ['CMU', 'Carnegie Mellon'],
    city: 'Pittsburgh',
    state: 'Pennsylvania',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'Harvard University',
    shortName: 'Harvard',
    aliases: ['Harvard', 'Harvard Cambridge'],
    city: 'Cambridge',
    state: 'Massachusetts',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'University of Washington',
    shortName: 'UW Seattle',
    aliases: ['UW', 'U-Dub', 'UW Seattle'],
    city: 'Seattle',
    state: 'Washington',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'University of Illinois Urbana-Champaign (UIUC)',
    shortName: 'UIUC',
    aliases: ['UIUC', 'Illinois', 'Urbana-Champaign'],
    city: 'Urbana',
    state: 'Illinois',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'Georgia Institute of Technology (Georgia Tech)',
    shortName: 'Georgia Tech',
    aliases: ['Georgia Tech', 'GaTech', 'GT'],
    city: 'Atlanta',
    state: 'Georgia',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'University of Texas at Austin (UT Austin)',
    shortName: 'UT Austin',
    aliases: ['UT Austin', 'UT', 'Longhorns'],
    city: 'Austin',
    state: 'Texas',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'Columbia University',
    shortName: 'Columbia NYC',
    aliases: ['Columbia', 'Columbia University in NYC'],
    city: 'New York',
    state: 'New York',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'Cornell University',
    shortName: 'Cornell Ithaca',
    aliases: ['Cornell', 'Cornell University', 'Ithaca'],
    city: 'Ithaca',
    state: 'New York',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'University of Michigan, Ann Arbor',
    shortName: 'UMich Ann Arbor',
    aliases: ['UMich', 'Michigan', 'Ann Arbor'],
    city: 'Ann Arbor',
    state: 'Michigan',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'University of California, Los Angeles (UCLA)',
    shortName: 'UCLA',
    aliases: ['UCLA', 'Westwood'],
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'University of California, San Diego (UCSD)',
    shortName: 'UCSD',
    aliases: ['UCSD', 'La Jolla'],
    city: 'San Diego',
    state: 'California',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'New York University (NYU)',
    shortName: 'NYU New York',
    aliases: ['NYU', 'Courant', 'Tandon'],
    city: 'New York',
    state: 'New York',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'Princeton University',
    shortName: 'Princeton',
    aliases: ['Princeton'],
    city: 'Princeton',
    state: 'New Jersey',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'Yale University',
    shortName: 'Yale',
    aliases: ['Yale', 'New Haven'],
    city: 'New Haven',
    state: 'Connecticut',
    country: 'United States',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'University of Toronto',
    shortName: 'U of T Toronto',
    aliases: ['UofT', 'U of T', 'Toronto'],
    city: 'Toronto',
    state: 'Ontario',
    country: 'Canada',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'University of Waterloo',
    shortName: 'Waterloo',
    aliases: ['Waterloo', 'UW Waterloo'],
    city: 'Waterloo',
    state: 'Ontario',
    country: 'Canada',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'University of Oxford',
    shortName: 'Oxford',
    aliases: ['Oxford', 'Oxford University'],
    city: 'Oxford',
    state: 'England',
    country: 'United Kingdom',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'University of Cambridge',
    shortName: 'Cambridge',
    aliases: ['Cambridge', 'Cambridge University'],
    city: 'Cambridge',
    state: 'England',
    country: 'United Kingdom',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'Imperial College London',
    shortName: 'Imperial London',
    aliases: ['Imperial', 'Imperial College', 'South Kensington'],
    city: 'London',
    state: 'England',
    country: 'United Kingdom',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'National University of Singapore (NUS)',
    shortName: 'NUS Singapore',
    aliases: ['NUS', 'National University of Singapore', 'Kent Ridge'],
    city: 'Singapore',
    state: 'Singapore',
    country: 'Singapore',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'Nanyang Technological University (NTU Singapore)',
    shortName: 'NTU Singapore',
    aliases: ['NTU', 'Nanyang Tech', 'Jurong West'],
    city: 'Singapore',
    state: 'Singapore',
    country: 'Singapore',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'University of Melbourne',
    shortName: 'UniMelb Melbourne',
    aliases: ['UniMelb', 'Melbourne Uni', 'Parkville'],
    city: 'Melbourne',
    state: 'Victoria',
    country: 'Australia',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'ETH Zurich (Swiss Federal Institute of Technology)',
    shortName: 'ETH Zurich',
    aliases: ['ETH', 'ETH Zurich', 'Swiss Federal Tech'],
    city: 'Zurich',
    state: 'Zurich',
    country: 'Switzerland',
    category: 'Global',
    tier: 'Tier 1'
  },
  {
    name: 'Technical University of Munich (TUM)',
    shortName: 'TUM Munich',
    aliases: ['TUM', 'TU Munich', 'Garching'],
    city: 'Munich',
    state: 'Bavaria',
    country: 'Germany',
    category: 'Global',
    tier: 'Tier 1'
  }
];

// All combined institutions directory
export const ALL_INSTITUTIONS_DIRECTORY: InstitutionDetail[] = [
  ...INDIAN_INSTITUTIONS_DIRECTORY,
  ...GLOBAL_INSTITUTIONS_DIRECTORY,
];

// Flat names array for backward-compatibility with string searches
export const POPULAR_UNIVERSITIES = ALL_INSTITUTIONS_DIRECTORY.map((item) => item.name);

// ==========================================
// POPULAR DEGREES & INDIAN SPECIALIZATIONS
// ==========================================
export const POPULAR_DEGREES = [
  'Bachelor of Technology (B.Tech) in Computer Science & Engineering (CSE)',
  'Bachelor of Technology (B.Tech) in Information Technology (IT)',
  'Bachelor of Technology (B.Tech) in Artificial Intelligence & Data Science (AI & DS)',
  'Bachelor of Technology (B.Tech) in AI & Machine Learning (AI/ML)',
  'Bachelor of Technology (B.Tech) in Electronics & Communication Engineering (ECE)',
  'Bachelor of Technology (B.Tech) in Electrical & Electronics Engineering (EEE)',
  'Bachelor of Technology (B.Tech) in Mechanical Engineering',
  'Bachelor of Technology (B.Tech) in Civil Engineering',
  'Bachelor of Technology (B.Tech) in Chemical Engineering',
  'Bachelor of Technology (B.Tech) in Biotechnology & Bioengineering',
  'Bachelor of Technology (B.Tech) in Aerospace Engineering',
  'Bachelor of Engineering (B.E.) in Computer Science & Engineering',
  'Bachelor of Engineering (B.E.) in Information Science & Engineering (ISE)',
  'Bachelor of Engineering (B.E.) in Electronics & Telecommunication',
  'Bachelor of Computer Applications (BCA)',
  'Bachelor of Science (B.S.) in Computer Science',
  'Bachelor of Science (B.S.) in Data Science & Mathematics',
  'Bachelor of Science (B.Sc) in Computer Science / Statistics',
  'Master of Technology (M.Tech) in Computer Science & Engineering',
  'Master of Technology (M.Tech) in Data Science & Artificial Intelligence',
  'Master of Science (M.S.) in Computer Science',
  'Master of Science (M.Sc) in Data Science & Analytics',
  'Master of Computer Applications (MCA)',
  'Dual Degree (B.Tech + M.Tech Integrated) in Computer Science',
  'Master of Business Administration (MBA) in Finance / Marketing / Analytics',
  'Post Graduate Diploma in Management (PGDM)',
  'Bachelor of Business Administration (BBA)',
  'Bachelor of Commerce (B.Com / B.Com Hons) in Accounting & Finance',
  'Doctor of Philosophy (Ph.D.) in Computer Science & Engineering',
];

export const INDIAN_GRADE_PRESETS = [
  '9.5 / 10 CGPA (Gold Medalist / Rank 1)',
  '9.0 / 10 CGPA (Dean\'s List / Top 5%)',
  '8.5 / 10 CGPA (First Class with Distinction)',
  '8.0 / 10 CGPA (First Class with Distinction)',
  '7.5 / 10 CGPA (First Class)',
  '88.5% (Distinction)',
  '82.0% (First Division)',
  'First Class with Distinction',
  'Gold Medalist - Academic Excellence',
  'Dean\'s Honor Roll',
];

export const POPULAR_COMPANIES = [
  'Google',
  'Microsoft',
  'Meta (Facebook)',
  'Amazon',
  'Apple',
  'Stripe',
  'Netflix',
  'Uber',
  'Airbnb',
  'Salesforce',
  'Snowflake',
  'Databricks',
  'Coinbase',
  'Shopify',
  'Spotify',
  'OpenAI',
  'LinkedIn',
  'Oracle',
  'Adobe',
  'Palantir Technologies',
  'Cloudflare',
  'Vercel',
  'Twilio',
  'Flipkart',
  'Swiggy',
  'Zomato',
  'Razorpay',
  'PhonePe',
  'CRED',
  'Tata Consultancy Services (TCS)',
  'Infosys',
  'Wipro',
  'HCLTech',
  'Accenture',
  'Cognizant',
  'LTIMindtree',
  'Tech Mahindra',
];

export const POPULAR_TITLES = [
  'Senior Full-Stack Engineer',
  'Staff Software Engineer',
  'Senior Backend Engineer',
  'Senior Frontend Engineer',
  'Lead Product Manager',
  'Principal DevOps / Infrastructure Engineer',
  'Senior Data Scientist / ML Engineer',
  'Engineering Manager',
  'Cloud Solutions Architect',
  'Site Reliability Engineer (SRE)',
  'Software Development Engineer II (SDE-2)',
  'Software Development Engineer I (SDE-1)',
  'Technical Product Manager',
  'Member of Technical Staff (MTS)',
  'Associate Software Engineer',
  'Software Engineering Intern',
];

export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const YEARS = Array.from({ length: 25 }, (_, i) => `${new Date().getFullYear() + 4 - i}`);

// ==========================================
// 1-CLICK SKILL BUNDLE PACKS
// ==========================================
export interface SkillBundlePack {
  id: string;
  label: string;
  categoryName: string;
  icon: string;
  skills: string[];
}

export const SKILL_BUNDLE_PACKS: SkillBundlePack[] = [
  {
    id: 'fullstack',
    label: '💻 Full-Stack Web Development',
    categoryName: 'Full-Stack & Web Technologies',
    icon: 'code',
    skills: ['TypeScript', 'React.js', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST APIs', 'GraphQL', 'Docker', 'Prisma ORM'],
  },
  {
    id: 'backend',
    label: '⚙️ Backend & Distributed Systems',
    categoryName: 'Backend & Cloud Infrastructure',
    icon: 'server',
    skills: ['Go', 'Java', 'Python', 'Kafka', 'Redis', 'gRPC', 'Kubernetes', 'PostgreSQL', 'Microservices', 'AWS (ECS/Lambda)'],
  },
  {
    id: 'ai_ml',
    label: '🤖 AI, Machine Learning & LLMs',
    categoryName: 'AI & Machine Learning',
    icon: 'bot',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'LangChain', 'OpenAI API', 'HuggingFace', 'Scikit-Learn', 'Vector DBs (Pinecone/Milvus)', 'Pandas', 'NumPy'],
  },
  {
    id: 'devops_cloud',
    label: '☁️ Cloud, DevOps & SRE',
    categoryName: 'DevOps & Cloud Platforms',
    icon: 'cloud',
    skills: ['AWS (EKS, S3, IAM)', 'Terraform', 'Kubernetes', 'Docker', 'CI/CD (GitHub Actions)', 'Linux Hardening', 'Prometheus', 'Grafana', 'ArgoCD'],
  },
  {
    id: 'data_engineering',
    label: '📊 Data Engineering & Analytics',
    categoryName: 'Data Engineering & BI',
    icon: 'database',
    skills: ['SQL (Advanced)', 'Python', 'Snowflake', 'dbt', 'Apache Spark', 'Apache Airflow', 'BigQuery', 'Tableau', 'AWS Glue', 'Looker'],
  },
  {
    id: 'mobile',
    label: '📱 Mobile App Development',
    categoryName: 'Mobile Platforms',
    icon: 'smartphone',
    skills: ['React Native', 'Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'Flutter', 'SQLite', 'Redux Toolkit', 'Fastlane', 'Sentry'],
  },
  {
    id: 'ui_ux',
    label: '🎨 UI/UX & Product Design',
    categoryName: 'Product Design & Prototyping',
    icon: 'palette',
    skills: ['Figma', 'Design Systems', 'High-Fidelity Prototyping', 'Wireframing', 'User Research', 'Usability Testing', 'WCAG 2.1 AA Accessibility', 'Framer'],
  },
  {
    id: 'finance',
    label: '💼 Corporate Finance & Valuation',
    categoryName: 'Financial Modeling & Valuation',
    icon: 'dollar-sign',
    skills: ['3-Statement Financial Modeling', 'DCF Valuation', 'LBO Models', 'Excel (VBA/Macros)', 'Bloomberg Terminal', 'Power BI', 'SaaS Metrics (LTV/CAC)', 'GAAP'],
  },
  {
    id: 'cybersecurity',
    label: '🛡️ Cybersecurity & SecOps',
    categoryName: 'Cybersecurity & Compliance',
    icon: 'shield',
    skills: ['Zero-Trust Architecture', 'SOC 2 Type II', 'ISO 27001', 'Penetration Testing (Burp Suite)', 'Splunk SIEM', 'AWS GuardDuty', 'Trivy / Snyk', 'CIS Benchmarks'],
  },
  {
    id: 'product_mgmt',
    label: '🎯 Product Management & Strategy',
    categoryName: 'Product Strategy & Execution',
    icon: 'target',
    skills: ['Product Roadmapping', 'A/B Testing & Experimentation', 'User Journey Mapping', 'Jira Agile / Scrum', 'SQL Data Queries', 'PRD Authoring', 'Mixpanel / Amplitude', 'GTM Strategy'],
  },
];

// ==========================================
// COMPREHENSIVE GLOBAL SKILLS DIRECTORY FOR AUTOCOMPLETE
// ==========================================
export interface SkillDirectoryItem {
  name: string;
  category: string;
}

export const POPULAR_SKILLS_LIST: SkillDirectoryItem[] = [
  // Programming Languages
  { name: 'JavaScript', category: 'Programming Languages' },
  { name: 'TypeScript', category: 'Programming Languages' },
  { name: 'Python', category: 'Programming Languages' },
  { name: 'Java', category: 'Programming Languages' },
  { name: 'C++', category: 'Programming Languages' },
  { name: 'C#', category: 'Programming Languages' },
  { name: 'C', category: 'Programming Languages' },
  { name: 'Go (Golang)', category: 'Programming Languages' },
  { name: 'Rust', category: 'Programming Languages' },
  { name: 'Kotlin', category: 'Programming Languages' },
  { name: 'Swift', category: 'Programming Languages' },
  { name: 'PHP', category: 'Programming Languages' },
  { name: 'Ruby', category: 'Programming Languages' },
  { name: 'Scala', category: 'Programming Languages' },
  { name: 'Dart', category: 'Programming Languages' },
  { name: 'R', category: 'Programming Languages' },
  { name: 'MATLAB', category: 'Programming Languages' },
  { name: 'SQL', category: 'Programming Languages' },
  { name: 'Bash / Shell', category: 'Programming Languages' },
  { name: 'Solidity', category: 'Programming Languages' },
  { name: 'Elixir', category: 'Programming Languages' },
  { name: 'Haskell', category: 'Programming Languages' },
  { name: 'Zig', category: 'Programming Languages' },
  { name: 'Lua', category: 'Programming Languages' },
  { name: 'Perl', category: 'Programming Languages' },
  { name: 'Julia', category: 'Programming Languages' },
  { name: 'Assembly (x86/ARM)', category: 'Programming Languages' },

  // Frontend & UI
  { name: 'React.js', category: 'Frontend & UI' },
  { name: 'Next.js', category: 'Frontend & UI' },
  { name: 'Vue.js', category: 'Frontend & UI' },
  { name: 'Nuxt.js', category: 'Frontend & UI' },
  { name: 'Angular', category: 'Frontend & UI' },
  { name: 'Svelte', category: 'Frontend & UI' },
  { name: 'SvelteKit', category: 'Frontend & UI' },
  { name: 'Tailwind CSS', category: 'Frontend & UI' },
  { name: 'HTML5 & CSS3', category: 'Frontend & UI' },
  { name: 'Redux Toolkit', category: 'Frontend & UI' },
  { name: 'Zustand', category: 'Frontend & UI' },
  { name: 'GraphQL', category: 'Frontend & UI' },
  { name: 'WebAssembly (Wasm)', category: 'Frontend & UI' },
  { name: 'Bootstrap', category: 'Frontend & UI' },
  { name: 'Material UI (MUI)', category: 'Frontend & UI' },
  { name: 'Chakra UI', category: 'Frontend & UI' },
  { name: 'Shadcn UI', category: 'Frontend & UI' },
  { name: 'Framer Motion', category: 'Frontend & UI' },
  { name: 'Three.js / WebGL', category: 'Frontend & UI' },
  { name: 'Storybook', category: 'Frontend & UI' },
  { name: 'Responsive Design', category: 'Frontend & UI' },
  { name: 'Webpack / Vite', category: 'Frontend & UI' },

  // Backend & APIs
  { name: 'Node.js', category: 'Backend & APIs' },
  { name: 'Express.js', category: 'Backend & APIs' },
  { name: 'NestJS', category: 'Backend & APIs' },
  { name: 'Django', category: 'Backend & APIs' },
  { name: 'FastAPI', category: 'Backend & APIs' },
  { name: 'Flask', category: 'Backend & APIs' },
  { name: 'Spring Boot', category: 'Backend & APIs' },
  { name: 'ASP.NET Core', category: 'Backend & APIs' },
  { name: 'Ruby on Rails', category: 'Backend & APIs' },
  { name: 'Gin / Fiber (Go)', category: 'Backend & APIs' },
  { name: 'Actix / Axum (Rust)', category: 'Backend & APIs' },
  { name: 'RESTful API Design', category: 'Backend & APIs' },
  { name: 'gRPC & Protobuf', category: 'Backend & APIs' },
  { name: 'WebSockets', category: 'Backend & APIs' },
  { name: 'Microservices', category: 'Backend & APIs' },
  { name: 'Apache Kafka', category: 'Backend & APIs' },
  { name: 'RabbitMQ', category: 'Backend & APIs' },
  { name: 'Celery', category: 'Backend & APIs' },

  // Databases & Storage
  { name: 'PostgreSQL', category: 'Databases & Storage' },
  { name: 'MySQL', category: 'Databases & Storage' },
  { name: 'MongoDB', category: 'Databases & Storage' },
  { name: 'Redis', category: 'Databases & Storage' },
  { name: 'SQLite', category: 'Databases & Storage' },
  { name: 'Supabase', category: 'Databases & Storage' },
  { name: 'Firebase Firestore', category: 'Databases & Storage' },
  { name: 'Amazon DynamoDB', category: 'Databases & Storage' },
  { name: 'Apache Cassandra', category: 'Databases & Storage' },
  { name: 'Elasticsearch', category: 'Databases & Storage' },
  { name: 'Neo4j (Graph DB)', category: 'Databases & Storage' },
  { name: 'Prisma ORM', category: 'Databases & Storage' },
  { name: 'TypeORM', category: 'Databases & Storage' },
  { name: 'Drizzle ORM', category: 'Databases & Storage' },
  { name: 'Snowflake', category: 'Databases & Storage' },
  { name: 'Google BigQuery', category: 'Databases & Storage' },
  { name: 'ClickHouse', category: 'Databases & Storage' },

  // AI, ML & Data Science
  { name: 'PyTorch', category: 'AI & Machine Learning' },
  { name: 'TensorFlow', category: 'AI & Machine Learning' },
  { name: 'Keras', category: 'AI & Machine Learning' },
  { name: 'Scikit-Learn', category: 'AI & Machine Learning' },
  { name: 'OpenAI API & GPT-4', category: 'AI & Machine Learning' },
  { name: 'LangChain', category: 'AI & Machine Learning' },
  { name: 'LlamaIndex', category: 'AI & Machine Learning' },
  { name: 'HuggingFace Transformers', category: 'AI & Machine Learning' },
  { name: 'RAG (Retrieval-Augmented Generation)', category: 'AI & Machine Learning' },
  { name: 'Vector DBs (Pinecone / Chroma / Milvus)', category: 'AI & Machine Learning' },
  { name: 'Computer Vision (OpenCV / YOLO)', category: 'AI & Machine Learning' },
  { name: 'Natural Language Processing (NLP)', category: 'AI & Machine Learning' },
  { name: 'Pandas & NumPy', category: 'AI & Machine Learning' },
  { name: 'Apache Spark', category: 'AI & Machine Learning' },
  { name: 'Apache Airflow', category: 'AI & Machine Learning' },
  { name: 'dbt (Data Build Tool)', category: 'AI & Machine Learning' },
  { name: 'Tableau', category: 'AI & Machine Learning' },
  { name: 'Power BI', category: 'AI & Machine Learning' },
  { name: 'MLOps (MLflow / W&B)', category: 'AI & Machine Learning' },

  // Cloud & DevOps
  { name: 'AWS (Amazon Web Services)', category: 'Cloud & DevOps' },
  { name: 'GCP (Google Cloud Platform)', category: 'Cloud & DevOps' },
  { name: 'Microsoft Azure', category: 'Cloud & DevOps' },
  { name: 'Docker', category: 'Cloud & DevOps' },
  { name: 'Kubernetes (K8s)', category: 'Cloud & DevOps' },
  { name: 'Terraform', category: 'Cloud & DevOps' },
  { name: 'Ansible', category: 'Cloud & DevOps' },
  { name: 'CI/CD (GitHub Actions / GitLab / Jenkins)', category: 'Cloud & DevOps' },
  { name: 'Linux / Unix', category: 'Cloud & DevOps' },
  { name: 'Nginx / Caddy', category: 'Cloud & DevOps' },
  { name: 'Prometheus & Grafana', category: 'Cloud & DevOps' },
  { name: 'Helm', category: 'Cloud & DevOps' },
  { name: 'ArgoCD', category: 'Cloud & DevOps' },
  { name: 'Datadog', category: 'Cloud & DevOps' },
  { name: 'Serverless (AWS Lambda)', category: 'Cloud & DevOps' },

  // Mobile
  { name: 'React Native', category: 'Mobile App Development' },
  { name: 'Flutter', category: 'Mobile App Development' },
  { name: 'SwiftUI', category: 'Mobile App Development' },
  { name: 'Jetpack Compose', category: 'Mobile App Development' },
  { name: 'Expo', category: 'Mobile App Development' },
  { name: 'Fastlane', category: 'Mobile App Development' },

  // Cybersecurity
  { name: 'Penetration Testing', category: 'Cybersecurity' },
  { name: 'Burp Suite / OWASP ZAP', category: 'Cybersecurity' },
  { name: 'OWASP Top 10', category: 'Cybersecurity' },
  { name: 'SIEM (Splunk / Elastic)', category: 'Cybersecurity' },
  { name: 'Zero-Trust Architecture', category: 'Cybersecurity' },
  { name: 'SOC 2 / ISO 27001', category: 'Cybersecurity' },
  { name: 'Network Security', category: 'Cybersecurity' },

  // Embedded & Hardware
  { name: 'Embedded C / C++', category: 'Embedded & Hardware' },
  { name: 'ARM Cortex', category: 'Embedded & Hardware' },
  { name: 'Arduino / Raspberry Pi', category: 'Embedded & Hardware' },
  { name: 'ESP32 / IoT', category: 'Embedded & Hardware' },
  { name: 'FreeRTOS', category: 'Embedded & Hardware' },
  { name: 'I2C / SPI / UART / CAN', category: 'Embedded & Hardware' },
  { name: 'PCB Design (Altium / KiCad)', category: 'Embedded & Hardware' },
  { name: 'Verilog / VHDL / FPGA', category: 'Embedded & Hardware' },
  { name: 'AutoCAD / SolidWorks', category: 'Embedded & Hardware' },

  // UI/UX & Design
  { name: 'Figma', category: 'Design & Product' },
  { name: 'Design Systems', category: 'Design & Product' },
  { name: 'Wireframing & Prototyping', category: 'Design & Product' },
  { name: 'User Research', category: 'Design & Product' },
  { name: 'Usability Testing', category: 'Design & Product' },
  { name: 'Adobe XD / Photoshop / Illustrator', category: 'Design & Product' },
  { name: 'Framer / Webflow', category: 'Design & Product' },
  { name: 'WCAG Accessibility', category: 'Design & Product' },

  // Management & Business
  { name: 'Product Roadmapping', category: 'Management & Business' },
  { name: 'A/B Testing & Growth', category: 'Management & Business' },
  { name: 'PRD Authoring', category: 'Management & Business' },
  { name: 'Agile / Scrum / Kanban', category: 'Management & Business' },
  { name: 'Jira / Confluence', category: 'Management & Business' },
  { name: 'User Journey Mapping', category: 'Management & Business' },
  { name: 'Mixpanel / Amplitude', category: 'Management & Business' },
  { name: 'Go-To-Market (GTM) Strategy', category: 'Management & Business' },

  // Finance & Accounting
  { name: 'Financial Modeling (3-Statement)', category: 'Finance & Accounting' },
  { name: 'DCF Valuation', category: 'Finance & Accounting' },
  { name: 'LBO Modeling', category: 'Finance & Accounting' },
  { name: 'Advanced Excel (VBA / Macros)', category: 'Finance & Accounting' },
  { name: 'Bloomberg Terminal', category: 'Finance & Accounting' },
  { name: 'GAAP / IFRS Accounting', category: 'Finance & Accounting' },
  { name: 'SaaS Metrics (ARR / CAC / LTV)', category: 'Finance & Accounting' },
  { name: 'SAP / Oracle ERP', category: 'Finance & Accounting' },

  // QA & Testing
  { name: 'Unit Testing (Jest / PyTest / JUnit)', category: 'QA & Testing' },
  { name: 'E2E Testing (Cypress / Playwright)', category: 'QA & Testing' },
  { name: 'Test-Driven Development (TDD)', category: 'QA & Testing' },
  { name: 'Postman & API Automation', category: 'QA & Testing' },
  { name: 'Performance Testing (k6 / JMeter)', category: 'QA & Testing' },
];

export const QUICK_POPULAR_SKILL_CHIPS = [
  'Python', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Node.js',
  'Go (Golang)', 'Rust', 'Java', 'C++', 'SQL', 'PostgreSQL', 'MongoDB', 'Redis',
  'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Tailwind CSS', 'GraphQL',
  'PyTorch', 'TensorFlow', 'LangChain', 'OpenAI API', 'Figma', 'Linux',
  'FastAPI', 'Spring Boot', 'Flutter', 'React Native', 'Solidity'
];

// ==========================================
// DEGREES & FIELDS OF STUDY AUTOCOMPLETE
// ==========================================
export const DEGREES_LIST = [
  'Bachelor of Technology (B.Tech)',
  'Bachelor of Science (B.S. / B.Sc)',
  'Bachelor of Engineering (B.E.)',
  'Master of Science (M.S. / M.Sc)',
  'Master of Technology (M.Tech)',
  'Master of Business Administration (MBA)',
  'Post Graduate Diploma in Management (PGDM)',
  'Bachelor of Computer Applications (BCA)',
  'Master of Computer Applications (MCA)',
  'Bachelor of Business Administration (BBA)',
  'Bachelor of Commerce (B.Com / B.Com Hons)',
  'Dual Degree (B.Tech + M.Tech Integrated)',
  'Doctor of Philosophy (Ph.D.)',
  'Associate Degree',
  'High School Diploma (CBSE / ICSE / IB / State Board)',
];

export const FIELDS_OF_STUDY = [
  'Computer Science & Engineering',
  'Artificial Intelligence & Machine Learning',
  'Data Science & Analytics',
  'Information Technology (IT)',
  'Electrical & Electronics Engineering (EEE)',
  'Electronics & Communication Engineering (ECE)',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Business Administration (Finance & Marketing)',
  'Finance & Economics',
  'Mathematics & Computing',
  'Physics / Applied Physics',
  'Biotechnology & Bioinformatics',
  'Graphic & Interaction Design',
  'Cybersecurity & Network Defense',
];

// ==========================================
// COURSEWORK SUGGESTIONS BY DISCIPLINE
// ==========================================
export const COURSEWORK_SUGGESTIONS_BY_FIELD: Record<string, string[]> = {
  cs: [
    'Data Structures & Algorithms',
    'Operating Systems',
    'Database Management Systems (DBMS)',
    'Computer Networks',
    'Object-Oriented Programming (OOP)',
    'Distributed Systems',
    'System Design',
    'Compiler Design',
    'Cloud Computing',
    'Software Engineering',
    'Web Architecture',
    'Computer Organization & Architecture',
  ],
  ai_data: [
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing (NLP)',
    'Computer Vision',
    'Probability & Statistics',
    'Linear Algebra & Calculus',
    'Big Data Analytics',
    'Data Mining & Warehousing',
    'Neural Networks & Reinforcement Learning',
    'Time-Series Forecasting',
  ],
  business_finance: [
    'Corporate Finance',
    'Financial Accounting & Analysis',
    'Valuation & Financial Modeling',
    'Strategic Management',
    'Marketing Strategy & Brand Management',
    'Operations Research',
    'Microeconomics & Macroeconomics',
    'Managerial Economics',
    'Business Analytics & Decision Models',
  ],
  electrical: [
    'Digital Signal Processing',
    'Microprocessors & Microcontrollers',
    'VLSI Design',
    'Embedded Systems Architecture',
    'Analog & Digital Communication',
    'Control Systems Engineering',
    'Signals and Systems',
    'Electronic Circuit Analysis',
  ],
};

// ==========================================
// ROLE-BASED HIGH-VELOCITY ACCOMPLISHMENT BULLETS
// ==========================================
export interface RoleBulletInspiration {
  roleCategory: string;
  bullets: string[];
}

export const ROLE_BULLETS_INSPIRATION: RoleBulletInspiration[] = [
  {
    roleCategory: 'Full-Stack & Backend Engineering',
    bullets: [
      'Architected high-throughput microservice in Go and PostgreSQL, reducing p99 API response latency from 450ms to 32ms under peak load.',
      'Spearheaded frontend migration to Next.js App Router and TypeScript, improving Core Web Vitals (LCP) by 1.4s and boosting conversion by 18%.',
      'Engineered real-time event streaming pipeline using Apache Kafka and Redis, processing 3.5M+ daily transactions with 99.99% uptime.',
      'Optimized SQL database query patterns and indexing strategies, slashing query execution time by 64% on 20M+ row dataset.',
      'Automated CI/CD deployment pipelines using GitHub Actions and Docker, reducing release cycle time from 3 hours to 12 minutes.',
    ],
  },
  {
    roleCategory: 'AI, Data & Machine Learning',
    bullets: [
      'Developed and deployed customer churn prediction model in Python (XGBoost), reducing enterprise churn by 16.4% and saving $2.8M in ARR.',
      'Fine-tuned open-source LLM (Llama 3) with LoRA and RAG vector search, achieving 94.2% factual precision on domain-specific support queries.',
      'Constructed automated dbt and Snowflake ETL pipelines handling 45GB daily event stream, reducing KPI dashboard refresh latency by 85%.',
      'Engineered A/B experimentation platform across 2.4M monthly active users, detecting statistically significant conversion lift with 95% power.',
    ],
  },
  {
    roleCategory: 'Cloud, DevOps & SRE',
    bullets: [
      'Orchestrated multi-region AWS Kubernetes (EKS) migration across 80+ microservices, saving $140,000 in annual AWS compute infrastructure costs.',
      'Spearheaded zero-downtime Blue/Green deployment strategy via ArgoCD and Terraform, eliminating deployment-related outages.',
      'Engineered automated Prometheus and Grafana alerting suite with PagerDuty integration, reducing Mean Time to Resolution (MTTR) by 54%.',
      'Standardized automated security vulnerability scanning with Trivy and Snyk inside CI pipelines, catching 180+ critical CVEs pre-production.',
    ],
  },
  {
    roleCategory: 'Freshers, Students & Projects',
    bullets: [
      'Developed full-stack responsive web application using React, Node.js, and MongoDB, serving 1,500+ active campus student users.',
      'Engineered automated sorting and search algorithm in C++, improving time complexity from O(N²) to O(N log N) on benchmark datasets.',
      'Led 4-member student engineering team for capstone project, delivering functional IoT hardware prototype and winning 1st place in university hackathon.',
      'Authored 100% unit-tested REST API in TypeScript and Express with JWT authentication, achieving 92% code coverage.',
    ],
  },
];

// ==========================================
// 1-CLICK SUMMARY STARTERS BY ROLE
// ==========================================
export const SUMMARY_STARTERS_BY_ROLE: Record<string, string[]> = {
  general_eng: [
    'Product-minded Full-Stack Engineer with 5+ years architecting high-throughput distributed systems and responsive web platforms. Specialized in Next.js, TypeScript, and cloud-native microservices driving sub-100ms latency at scale.',
    'Software Engineer with strong foundational expertise in distributed computing, clean API design, and automated testing. Passionate about solving complex scalability bottlenecks and accelerating product delivery.',
  ],
  fresher: [
    'Enthusiastic Computer Science graduate with strong foundation in Data Structures, Algorithms, and Full-Stack Web Development. Proven track record of shipping end-to-end projects in React and Node.js with a passion for scalable systems.',
    'Detail-oriented Software Engineering graduate with hands-on experience in Python, TypeScript, and modern cloud databases. Eager to contribute to high-impact production engineering teams.',
  ],
  aiml: [
    'Machine Learning Engineer with expertise in deep learning, LLM fine-tuning, and production model serving. Experienced in PyTorch, RAG pipelines, and high-throughput vector search delivering measurable business ROI.',
    'Data Scientist with 4+ years translating petabyte-scale telemetry into predictive algorithms and executive strategy. Skilled in Python, SQL, causal inference, and automated ML pipelines.',
  ],
  product: [
    'Strategic Lead Product Manager with 6+ years driving product discovery, user adoption, and roadmapping across enterprise SaaS and consumer apps. Generated $12M+ incremental ARR through data-driven A/B experimentation.',
  ],
};

