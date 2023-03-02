const { countries } = require("./database");
const express = require("express");

const {
  validatePostCountries,
} = require("./validations/validatePostCountries");
const {
  validatePatchCountries,
} = require("./validations/validatePatchCountries");
const {
  validateDeleteCountries,
} = require("./validations/validateDeleteCountries");
const { authenticate } = require("./middlewares/authenticate");

const server = express();
server.use(express.json());

server.get("/countries", (req, res) => {
  const land = req.query.land;
  const hittatLand = countries.find((country) => country.land == land);
  if (hittatLand) {
    res.send(hittatLand);
    return;
  }
  res.status(404).send("Inget land kunde hittas!");
});

server.use(authenticate);

server.post("/countries", (req, res) => {
  const validationError = validatePostCountries(req.body);
  if (validationError) {
    return res.status(400).send(validationError);
  }

  const existingCountry = countries.some(
    (country) => country.land == req.body.land
  );
  if (existingCountry) {
    return res.sendStatus(409);
  }

  countries.push(req.body);
  res.sendStatus(201);
});

server.patch("/countries", (req, res) => {
  const validationError = validatePatchCountries(req.body);
  if (validationError) {
    return res.status(400).send(validationError);
  }

  const existingCountry = countries.find(
    (country) => country.land == req.body.land
  );

  if (!existingCountry) {
    return res.sendStatus(404);
  }
  existingCountry[req.body.nyckel] = req.body.varde;
  res.sendStatus(200);
});

server.delete("/countries", (req, res) => {
  const validationError = validateDeleteCountries(req.body);
  if (validationError) {
    return res.status(400).send(validationError);
  }

  const existingCountryIndex = countries.findIndex(
    (country) => country.land == req.body.land
  );

  if (existingCountryIndex == -1) {
    return res.sendStatus(404);
  }
  countries.splice(existingCountryIndex, 1);
  res.sendStatus(200);
});

server.listen(8080);
