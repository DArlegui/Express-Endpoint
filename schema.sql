-- CREATE DATABASE car;
-- USE car;

-- CREATE TABLE car(
--   id INT(10) PRIMARY KEY NOT NULL UNIQUE UNSIGNED AUTO_INCREMENT,
--   name VARCHAR(255) NOT NULL,
--   model VARCHAR(255) NOT NULL,
--   year INT(4) NOT NULL,
--   deleted_flag INT(1) NOT NULL UNSIGNED ZEROFILL DEFAULT 0
-- );

-- INSERT INTO car (name, model, year) 
-- VALUES 
--   ('Nissan', 'Altima', 2014),
--   ('Hyundai', 'Sonata', 2013),
--   ('Kia', 'Optima', 2012),
--   ('Volkswagen', 'Passat', 2011),
--   ('Subaru', 'Legacy', 2010),
--   ('Mazda', 'Mazda6', 2009),
--   ('Audi', 'A4', 2008),
--   ('BMW', '3 Series', 2007),
--   ('Mercedes-Benz', 'C-Class', 2006),
--   ('Lexus', 'IS', 2005),
--   ('Acura', 'TL', 2004),
--   ('Infiniti', 'G35', 2003),
--   ('Lincoln', 'MKZ', 2002),
--   ('Buick', 'Regal', 2001),
--   ('Cadillac', 'CTS', 2000),
--   ('Chrysler', '300', 1999),
--   ('Dodge', 'Charger', 1998),
--   ('Jaguar', 'XF', 1997),
--   ('Volvo', 'S60', 1996),
--   ('Porsche', 'Panamera', 1995),
--   ('Maserati', 'Ghibli', 1994),
--   ('Ferrari', 'Portofino', 1993),
--   ('Lamborghini', 'Huracan', 1992),
--   ('Lotus', 'Evora', 1991),
--   ('Rolls-Royce', 'Phantom', 1990),
--   ('Bentley', 'Continental', 1989),
--   ('Tesla', 'Model S', 1988),
--   ('Bugatti', 'Chiron', 1987),
--   ('McLaren', '720S', 1986),
--   ('Koenigsegg', 'Agera', 1985),
--   ('Pagani', 'Huayra', 1984),
--   ('Aston Martin', 'DB11', 1983),
--   ('Alfa Romeo', 'Giulia', 1982),
--   ('Genesis', 'G80', 1981),
--   ('Fiat', '500', 1980),
--   ('Smart', 'Fortwo', 1979),
--   ('Mini', 'Cooper', 1978),