const prisma = require("../prisma");
const seed = async () => {
  // TODO: Create Customers, Restaurants and Reservations

  const createCustomers = async () => {
    const customers = [
        { name: "Joseph" },
        { name: "Juliet" },
        { name: "Daniel" },
        { name: "Robert" },
        { name: "Ana" },
        { name: "Claire" },
    ];
    await prisma.customer.createMany({ data: customers });
  };

  const createRestaurants = async () => {
    const restaurants = [
      { name: "Osteria 57" },
      { name: "Katz`s" },
      { name: "Keens Steakhouse" },
      { name: "Tavern On The Green" },
    ];
    await prisma.restaurant.createMany({ data: restaurants });
  };

  const createReservations = async () => {
    const reservations = [
        { 
            customerId: 1, 
            restaurantId: 1, 
            partyCount: 1, 
            date: new Date("2025-01-01") 
        },
        { 
            customerId: 2, 
            restaurantId: 2, 
            partyCount: 1, 
            date: new Date("2024-07-02") 
        },
        { 
            customerId: 3, 
            restaurantId: 3, 
            partyCount: 1, 
            date: new Date("2024-07-03") 
        },
    ];
    await prisma.reservation.createMany({ data: reservations});
  };

  await createCustomers();
  await createRestaurants();
  await createReservations();
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });