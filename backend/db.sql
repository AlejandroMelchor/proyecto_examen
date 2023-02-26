CREATE DATABASE `prueba_examen_db`;

USE `prueba_examen_db`;

CREATE TABLE TBL_CMV_CLIENTE (
	id_cliente INT PRIMARY KEY auto_increment,
    nombre VARCHAR(255),
    apellido_paterno VARCHAR(255),
    apellido_materno  VARCHAR(255),
    rfc VARCHAR(255),
    curp VARCHAR(255),
    fecha_alta DATETIME
);

CREATE TABLE CAT_CMV_TIPO_CUENTA (
	id_cuenta INT PRIMARY KEY auto_increment,
    nombre_cuenta VARCHAR(255)
);

CREATE TABLE TBL_CMV_CLIENTE_CUENTA (
	id_cliente_cuenta INT PRIMARY KEY auto_increment,
    id_cliente INT,
    id_cuenta INT,
    saldo_actual INT(255),
    fecha_contratacion DATETIME,
    fecha_ultimo_movimiento DATETIME,
    FOREIGN KEY (id_cliente)  REFERENCES TBL_CMV_CLIENTE(id_cliente) ON DELETE CASCADE,
    FOREIGN KEY (id_cuenta)  REFERENCES CAT_CMV_TIPO_CUENTA(id_cuenta) ON DELETE CASCADE
);

#STORE PROCEDURED PARA LOS CLIENTES
DELIMITER //
CREATE PROCEDURE listarClientes()
BEGIN
	SELECT * FROM TBL_CMV_CLIENTE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE obtenerCliente(IN id INT(255))
BEGIN
	SELECT * FROM TBL_CMV_CLIENTE where id_cliente = id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE guardarCliente(IN nombre VARCHAR(255), apellido_paterno VARCHAR(255), apellido_materno VARCHAR(255), rfc VARCHAR(255), curp VARCHAR(255), fecha_alta DATETIME)
BEGIN
	INSERT INTO TBL_CMV_CLIENTE (nombre, apellido_paterno, apellido_materno, rfc, curp, fecha_alta) 
    VALUES (nombre, apellido_paterno, apellido_materno, rfc, curp, fecha_alta);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE editarCliente(IN nombre VARCHAR(255), apellido_paterno VARCHAR(255), apellido_materno VARCHAR(255), rfc VARCHAR(255), curp VARCHAR(255), fecha_alta DATETIME, id INT(255))
BEGIN
	UPDATE TBL_CMV_CLIENTE SET nombre = nombre, apellido_paterno = apellido_paterno, apellido_materno = apellido_materno, rfc = rfc, curp = curp, fecha_alta = fecha_alta where id_cliente = id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE eliminarCliente(IN id INT(255))
BEGIN
	DELETE FROM TBL_CMV_CLIENTE where id_cliente = id;
END //
DELIMITER ;



#STORE PROCEDURE PARA LAS CUENTAS
DELIMITER //
CREATE PROCEDURE listarCuentas()
BEGIN
	SELECT * FROM CAT_CMV_TIPO_CUENTA;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE obtenerCuenta(IN id INT(255))
BEGIN
	SELECT * FROM CAT_CMV_TIPO_CUENTA where id_cuenta = id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE guardarCuenta(IN nombre_cuenta VARCHAR(255))
BEGIN
	INSERT INTO CAT_CMV_TIPO_CUENTA (nombre_cuenta) VALUES (nombre_cuenta);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE editarCuenta(IN nombre_cuenta VARCHAR(255), id INT(255))
BEGIN
	UPDATE CAT_CMV_TIPO_CUENTA SET nombre_cuenta = nombre_cuenta;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE eliminarCuenta(IN id INT(255))
BEGIN
	DELETE FROM CAT_CMV_TIPO_CUENTA where id_cuenta = id;
END //
DELIMITER ;


#STORE PROCEDURE CLIENTE-RELACION
DELIMITER //
CREATE PROCEDURE obtenerCuentasCliente(IN id INT(255))
BEGIN
	SELECT * FROM TBL_CMV_CLIENTE_CUENTA A 
		INNER JOIN TBL_CMV_CLIENTE B ON A.id_cliente = B.id_cliente
		INNER JOIN CAT_CMV_TIPO_CUENTA C ON A.id_cuenta = C.id_cuenta
	WHERE A.id_cliente = id;
END //
DELIMITER ; 

DELIMITER //
CREATE PROCEDURE guardarCuentaCliente(IN id_cliente INT(255), id_cuenta INT(255), saldo_actual INT(255), fecha_contratacion DATETIME, fecha_ultimo_movimiento DATETIME)
BEGIN
	INSERT INTO TBL_CMV_CLIENTE_CUENTA (id_cliente, id_cuenta, saldo_actual, fecha_contratacion, fecha_ultimo_movimiento)
    VALUES (id_cliente, id_cuenta, saldo_actual, fecha_contratacion, fecha_ultimo_movimiento);
END //
DELIMITER ; 

DELIMITER //
CREATE PROCEDURE eliminarCuentaCliente(IN id INT(255))
BEGIN
	DELETE FROM TBL_CMV_CLIENTE_CUENTA WHERE id_cliente_cuenta = id;
END //
DELIMITER ; 

