export const dummyRooms = [
    {
        id: 1,
        roomNumber: '101',
        propertyId: 1,
        propertyName: 'Sunset Heights',
        type: 'Single',
        capacity: 1,
        currentOccupants: 1,
        pricePerMonth: 12000,
        status: 'Occupied',
        floor: '1st Floor',
        amenities: ['AC', 'WiFi', 'Attached Bath', 'Balcony'],
        description: 'Premium single room with city view and attached balcony.'
    },
    {
        id: 2,
        roomNumber: '102',
        propertyId: 1,
        propertyName: 'Sunset Heights',
        type: 'Double',
        capacity: 2,
        currentOccupants: 1,
        pricePerMonth: 8500,
        status: 'Available',
        floor: '1st Floor',
        amenities: ['WiFi', 'Attached Bath', 'Shared Kitchen'],
        description: 'Spacious double sharing room. One bed currently vacant.'
    },
    {
        id: 3,
        roomNumber: '201',
        propertyId: 2,
        propertyName: 'Urban Living',
        type: 'Triple',
        capacity: 3,
        currentOccupants: 0,
        pricePerMonth: 6500,
        status: 'Maintenance',
        floor: '2nd Floor',
        amenities: ['WiFi', 'Common Bath', 'Cooler'],
        description: 'Budget-friendly triple sharing room. Undergoing painting.'
    },
    {
        id: 4,
        roomNumber: '305',
        propertyId: 1,
        propertyName: 'Sunset Heights',
        type: 'Suite',
        capacity: 2,
        currentOccupants: 2,
        pricePerMonth: 25000,
        status: 'Occupied',
        floor: '3rd Floor',
        amenities: ['AC', 'WiFi', 'Attached Bath', 'Private Kitchen', 'Fridge', 'TV'],
        description: 'Luxury suite intended for corporate guests or couples.'
    },
    {
        id: 5,
        roomNumber: 'B-10',
        propertyId: 4,
        propertyName: 'Elite Boys Hostel',
        type: 'Double',
        capacity: 2,
        currentOccupants: 0,
        pricePerMonth: 9000,
        status: 'Available',
        floor: 'Ground Floor',
        amenities: ['WiFi', 'Attached Bath', 'Study Table'],
        description: 'Standard double room close to the entrance.'
    }
];

export const roomTypes = ['Single', 'Double', 'Triple', 'Suite', 'Studio'];
export const roomStatuses = ['Available', 'Occupied', 'Maintenance', 'Reserved'];
export const roomAmenities = ['AC', 'WiFi', 'Attached Bath', 'Balcony', 'Shared Kitchen', 'Private Kitchen', 'Fridge', 'TV', 'Cooler', 'Study Table', 'Cupboard'];
