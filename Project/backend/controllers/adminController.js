const sequelize = require('../config');
const Flight = require('../models/flights');

// Get all flights
// http://localhost:3000/admin
exports.getAllFlights = async (req, res) => 
{
  try 
  {
    const flights = await Flight.findAll();
    res
    .status(200)
    .set('Content-Type', 'application/json')
    .set('Cache-Control', 'no-cache')
    .json(flights);
  } 
  catch (err) 
  {
    res.status(500).json({Error: "Failed: unable to fetch flights."});
  }
};

// Get flight by ID
// http://localhost:3000/admin/flightid
exports.getFlightById = async (req, res) => 
{
  try
  {
    const flight = await Flight.findByPk(req.params.id);
    if (flight) 
    {
      res
      .status(200)
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('FlightId', req.params.id)
      .json(flight);
    }
    else res.status(404).json({Error: "Failed: flight not found."});
  } 
  catch (err)
  {
    res.status(500).json({Error: "Failed: unable to fetch flight."});
  }
};

// Create new flight
// http://localhost:3000/admin
exports.createFlight = async (req, res) =>
{
  new_flight_number = req.body.flight_number;
  new_flight_gate = req.body.gate;
  try 
  {
    // retrieve flights that match specified flight number or gate
    const exists = await sequelize.query
    ('SELECT * FROM flights WHERE flight_number = ? OR gate = ?',
      {
        replacements: [new_flight_number, new_flight_gate],
        type: sequelize.QueryTypes.SELECT
      });
    
    // Check if flight already exists
    if(exists.length > 0)
    {
      const existing_flight = exists[0];

      // return response of whether flight number or gate already exists
      const error =
      {
        flight_number_exists: existing_flight.flight_number === new_flight_number,
        flight_gate_exists: existing_flight.gate === new_flight_gate
      };
      return res.status(409).json({message: 'Error: Flight already exists', error});
    }

    const newFlight = await Flight.create(req.body);
    res
    .status(201)
    .set('Content-Type', 'application/json')
    .set('Cache-Control', 'no-cache')
    .json(newFlight);
  } 
  catch (err)
  {
    res.status(400).json({Error: "Failed: unable to create flight.", error: err.message});
  }
};

// Update flight
// http://localhost:3000/admin/flightid
exports.updateFlight = async (req, res) => 
{
  new_flight_gate = req.body.gate;
  try 
  {
    const exists = await sequelize.query
    ('SELECT * FROM flights WHERE gate = ?',
      {
        replacements: [new_flight_gate],
        type: sequelize.QueryTypes.SELECT
      });
    
    // Check if flight already exists
    if(exists.length > 0)
    {
      const existing_flight = exists[0];
      // return response of whether flight number or gate already exists
      const error =
      {
        flight_gate_exists: existing_flight.gate === new_flight_gate
      };
      return res.status(409).json({message: 'Error: Flight already exists', error});
    }



    const flight = await Flight.findByPk(req.params.id);
    if (flight) 
    {
      await flight.update(req.body);
      res
      .status(200)
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('FlightId', req.params.id)
      .json(flight);
    } 
    else res.status(404).json({Error: "Failed: flight not found."});
  } 
  catch (err)
  {
    res.status(400).json({message: 'Error updating flight', error: err.message});
  }
};

// Update flight gate given flight id
// http://localhost:3000/admin/:id/gate
exports.updateFlightByIdGate = async (req, res) =>
{
  try
  {
    const flight = await Flight.findByPk(req.params.id)
    if(flight)
    {
      const occupied = await Flight.findOne({where:{gate: req.body.gate}});
      if(occupied) return res.status(409).json({message: `Error: Gate ${req.body.gate} occupied`});
      flight.gate = req.body.gate;
      await flight.save();
      res
      .status(200)
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('FlightId', req.params.id)
      .set('gate', req.body.gate)
      .json(flight);
    }
    else
    {
      res.status(404).json({Error: "Failed: flight not found."});
    }
  }
  catch(err)
  {
    res.status(400).json({Error: `Error updating flight: ${req.params.id}`, error: err.message});
  }
}

// Delete flight
// http://localhost:3000/admin/flightid
exports.deleteFlight = async (req, res) => 
{
  try 
  {
    const deleted = await Flight.destroy({ where: { id: req.params.id } });
    if (deleted)
      {
        res
        .status(200)
        .set('Content-Type', 'application/json')
        .set('Cache-Control', 'no-cache')
        .set('FlightId', req.params.id)
        .json({Success: 'Flight deleted' });
      } 
    else res.status(404).json({Error: "Failed: flight not found."});
  } 
  catch (err) 
  {
    res.status(500).json({Error: "Failed: error deleting flight"});
  }
};
