const Flight = require('../models/flights');

// Get all not scheduled flights
// http://localhost:3000/customer
exports.getAllFlights = async (req, res) => 
{
  try 
  {
    const flights = await Flight.findAll({where: {scheduled: false}});
    res
    .status(200)
    .set('Content-Type', 'application/json')
    .set('Cache-Control', 'no-cache')
    .json(flights);
  } 
  catch (err) 
  {
    res.status(500).json({ message: 'Error fetching flights' });
  }
};

// Get all scheduled flights
// http://localhost:3000/customer/scheduled
exports.getAllScheduledFlights = async (req, res) =>
{
  try
  {
    const flights = await Flight.findAll({ where: { scheduled: true } });
    res
    .status(200)
    .set('Content-Type', 'application/json')
    .set('Cache-Control', 'no-cache')
    .json(flights);
  }
  catch (err)
  {
    res.status(500).json({ message: 'Error fetching flights' });
  }
};

// Get scheduled flights by id
// http://localhost:3000/customer/scheduled/:id
exports.getScheduledFlightById = async (req, res) =>
{
  try
  {
    const flights = await Flight.findOne({
      where: 
      {
        id: req.params.id,
        scheduled: true, 
      },
    });
    
    if(flights) 
    {
      res
      .status(200)
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('FlightId', req.params.id)
      .json(flights);
    }
    else res.status(404).json({ message: 'Flight not found' });
  }
  catch (err)
  {
    res.status(500).json({ message: 'Error fetching flights' });
  }
};

// Patch/Update scheduled flight
// http://localhost:3000/customer/:id
// Updates whether the flight is scheduled or not
exports.updateScheduledFlight = async (req, res) =>
{
  try
  {
    const flight = await Flight.findByPk(req.params.id);
    if (flight) 
    {
      flight.scheduled = req.body.scheduled;
      await flight.save();
      res
      .status(200)
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('FlightId', req.params.id)
      .set('ScheduledSet', req.body.scheduled)
      .json(flight);
    } 
    else 
    {
      res.status(404).json({ message: 'Flight not found' });
    }
  }
  catch (err)
  {
    res.status(500).json({ message: 'Error updating flight' });
  }
}
