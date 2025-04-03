const express = require("express");
const app = express();
const PORT = 3000;

const prisma = require("./prisma");

app.use(express.json());
app.use(require("morgan")("dev"));

app.get("/api/customers", async (req, res, next) => {
    try {
        const customers = await prisma.customer.findMany();
        res.json(customers);
    } catch (error) {
        next(error)
    }
});

app.get("/api/restaurants", async (req, res, next) => {
    try {
        const restaurants = await prisma.restaurant.findMany();
        res.json(restaurants);
    } catch (error) {
        next(error)
    }
});

app.get("/api/reservations", async (req, res, next) => {
    try {
        const reservations = await prisma.reservation.findMany();
        res.json(reservations);
    } catch (error) {
        next(error);
    }
});

app.post("/api/customers/:id/reservations", async (req, res, next) => {
    try {
        const customerId = +req.params.id;
        const { restaurantId, date, partyCount } = req.body;
        const reservation = await prisma.reservations.create({
            data: {
                restaurantId,
                date,
                partyCount,
            },
        });
        res.status(201).json(reservation);
    } catch (error) {
        next(error);
    }
});

app.delete("/api/customers/:customerId/reservations/:id", async (req, res, next) => {
    try {
        const id = +req.params.id;
        const customerId = +req.params.customerId;
        const reservationsExits = await prisma.reservation.findFirst({
            where: { id, customerId },
        });

        if (!reservation) {
            return next({
                status: 404,
                message: "Sorry! Could not find reservation with id ${id} for customer ${customerId}."
            });
        }
        await prisma.reservation.delete({
            where: { id, customerId}
        });
    } catch (error) {
        next();
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status ?? 500;
    const message = err.message ?? 'Internal server error.';
    res.status(status).json({ message });
  });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });