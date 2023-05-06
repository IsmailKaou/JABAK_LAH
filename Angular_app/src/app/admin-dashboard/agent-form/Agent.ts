interface Agent {
    firstName: string;
    lastName: string;
    cinNumber: string;
    birthday: Date;
    address: string;
    email: string;
    phone: string;
    immatriculationNumber: string;
    licenseNumber: string;
  }
  
  const agents: Agent[] = [
    {
      firstName: "John",
      lastName: "Doe",
      cinNumber: "A123456",
      birthday: new Date("1990-01-01"),
      address: "123 Main St, Anytown USA",
      email: "john.doe@example.com",
      phone: "555-123-4567",
      immatriculationNumber: "ABC123",
      licenseNumber: "12345"
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      cinNumber: "B234567",
      birthday: new Date("1985-05-15"),
      address: "456 Elm St, Anytown USA",
      email: "jane.smith@example.com",
      phone: "555-234-5678",
      immatriculationNumber: "DEF456",
      licenseNumber: "67890"
    },
    {
      firstName: "Bob",
      lastName: "Johnson",
      cinNumber: "C345678",
      birthday: new Date("1980-12-31"),
      address: "789 Oak St, Anytown USA",
      email: "bob.johnson@example.com",
      phone: "555-345-6789",
      immatriculationNumber: "GHI789",
      licenseNumber: "23456"
    },
    {
      firstName: "Alice",
      lastName: "Jones",
      cinNumber: "D456789",
      birthday: new Date("1995-06-30"),
      address: "321 Maple St, Anytown USA",
      email: "alice.jones@example.com",
      phone: "555-456-7890",
      immatriculationNumber: "JKL012",
      licenseNumber: "78901"
    },
    {
      firstName: "Tom",
      lastName: "Smith",
      cinNumber: "E567890",
      birthday: new Date("1992-03-15"),
      address: "654 Pine St, Anytown USA",
      email: "tom.smith@example.com",
      phone: "555-567-8901",
      immatriculationNumber: "MNO345",
      licenseNumber: "12345"
    }
  ];
  