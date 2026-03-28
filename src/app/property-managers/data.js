export const dummyManagers = [
    {
        id: 1,
        // Basic Info
        name: 'Arjun Mehta', fatherName: 'Ram Mehta', dob: '1985-06-15', gender: 'Male', phone: '+91 98765 43210', altMobile: '+91 98765 43211', email: 'arjun@hostelpro.com', maritalStatus: 'Married',
        // Address
        currentAddress1: '123 Main St', currentAddress2: 'Apt 4B', currentCity: 'Mumbai', currentState: 'Maharashtra', currentPincode: '400001', currentCountry: 'India',
        permanentAddress1: '123 Main St', permanentAddress2: 'Apt 4B', permanentCity: 'Mumbai', permanentState: 'Maharashtra', permanentPincode: '400001', sameAsCurrent: true,
        // KYC
        aadhaarNumber: '1234 5678 9012', panNumber: 'ABCDE1234F', otherIdProof: '',
        // Employment
        employeeId: 'EMP001', joiningDate: '2020-01-15', assignedProperties: ['Sunset Heights', 'Urban Living'], jobRole: 'Property Manager', workShift: 'Morning', salary: '65000', status: 'Active',
        // Bank
        accountHolderName: 'Arjun Mehta', bankName: 'HDFC Bank', accountNumber: '01234567890', ifscCode: 'HDFC0000123', branchName: 'Andheri West', upiId: 'arjun@hdfc',
        // Education
        highestQualification: 'Post Graduation', collegeName: 'Mumbai University', yearOfPassing: '2008', certification: 'Hospitality Management',
        // Emergency
        emergencyContactName: 'Priya Mehta', emergencyRelationship: 'Wife', emergencyMobile: '+91 98765 43212', emergencyAddress: '123 Main St, Mumbai',
        // Login
        username: 'arjun.m', role: 'Property Manager',

        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        stats: { occupancy: '92%', resolvedTickets: 45, rating: 4.9 }
    },
    {
        id: 2,
        name: 'Priya Sharma',
        email: 'priya@hostelpro.com',
        phone: '+91 98765 12345',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        status: 'Active',
        assignedProperties: ['TechPark Corporate'],
        stats: { occupancy: '88%', resolvedTickets: 32, rating: 4.7 }
    },
    {
        id: 3,
        name: 'Rahul Verma',
        email: 'rahul@hostelpro.com',
        phone: '+91 98765 67890',
        image: '',
        status: 'Inactive',
        assignedProperties: [],
        stats: { occupancy: '0%', resolvedTickets: 0, rating: 0 }
    },
    {
        id: 4,
        name: 'Sanya Gupta',
        email: 'sanya@hostelpro.com',
        phone: '+91 98765 00000',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        status: 'Active',
        assignedProperties: ['Elite Boys Hostel'],
        stats: { occupancy: '95%', resolvedTickets: 58, rating: 4.9 }
    }
];
