import { Client, ClientTest, Test, User } from "../types/interfaces";

export function clientValidator(client: Client): { valid: boolean, errors: Record<string, string>} {
  const errors: Record<string, string> = {};

  if (!client.name || client.name.trim().length < 3) {
    errors.name = "El nom ha de tenir almenys 3 caràcters.";
  }

  if (!client.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) {
    errors.email = "El correu no és vàlid.";
  }

  if (!client.address || client.address.trim().length < 5) {
    errors.address = "La direcció ha de tenir almenys 5 caràcters.";
  }

  if (!client.phone || !/^\d{9,15}$/.test(client.phone)) {
    errors.phone = "El telèfon ha de ser un número vàlid entre 9 i 15 dígits.";
  }

  if (!client.born_date || isNaN(Date.parse(client.born_date))) {
    errors.born_date = "La client de naixement no és vàlida.";
  }

  if (!client.gender || !["Male", "Female", "Other"].includes(client.gender)) {
    errors.gender = "El gènere seleccionat no és vàlid.";
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function clientTestValidator(clientTest: ClientTest): { valid: boolean, errors: Record<string, string>}{
  const errors: Record<string, string> = {};

  if (!clientTest.test_id || typeof clientTest.test_id !== "string" || clientTest.test_id.trim().length === 0) {
    errors.test_id = "Has de seleccionar un test.";
  }

  if (!clientTest.result || typeof clientTest.result !== "string" || clientTest.result.trim().length === 0) {
    errors.result = "Has d'escriure el resultat del test.";
  }

  if (!clientTest.test_date || isNaN(Date.parse(clientTest.test_date))) {
    errors.test_date = "La data del test no és vàlida.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function clientTestUpdateValidator(clientTest: ClientTest): { valid: boolean, errors: Record<string, string>}{
  const errors: Record<string, string> = {};

  if (!clientTest.result || typeof clientTest.result !== "string" || clientTest.result.trim().length === 0) {
    errors.result = "Has d'escriure el resultat del test.";
  }

  if (!clientTest.test_date || isNaN(Date.parse(clientTest.test_date))) {
    errors.test_date = "La data del test no és vàlida.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function testUpdateValidatior(test: Test): { valid: boolean, errors: Record<string, string>}{
  const errors: Record<string, string> = {};
  if (test.name === undefined || test.name.trim().length < 3) {
    errors.name = "El nom ha de ser de mínim 3 caràcters";
  }
  if (test.description === undefined || test.description.trim().length < 3) {
    errors.description = "Has d'escriure una descripció de mínim 3 caràcters.";
  }
  if (test.quantity === undefined || test.quantity <= 0) {
    errors.quantity = "La quantiat ha de ser superior a 0";
  }
  if (test.unlimited === undefined || test.unlimited < 0 || test.unlimited > 1) {
    errors.unlimited = "Has de seleccionar si el test és il·limitat o no.";
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function testRemoveValidator(testID: number): { valid: boolean, errors: Record<string, string>}{
  const errors: Record<string, string> = {};
  if (testID === undefined || testID === 0) {
    errors.id = "Has de seleccionar un test.";  
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function userValidator(user: User){
  const errors: Record<string, string> = {};
  if (!user.name || user.name.trim().length < 3) {
    errors.name = "El nom ha de tenir almenys 3 caràcters.";
  }
  if (!user.username || user.username.trim().length < 3) {
    errors.username = "El nom d'usuari ha de tenir almenys 3 caràcters.";
  }
  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.email = "El correu no és vàlid.";
  }
  if (!user.phone || !/^\d{9,15}$/.test(user.phone)) {
    errors.phone = "El telèfon ha de ser un número vàlid entre 9 i 15 dígits.";
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}