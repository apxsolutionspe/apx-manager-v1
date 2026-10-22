import assert from "node:assert/strict";
import test from "node:test";
import { isRequired, isValidEmail } from "./validators.js";

test("isRequired rejects blank strings and missing values", () => {
  for (const value of ["", "  \t ", null, undefined]) {
    assert.equal(isRequired(value), false);
  }
});

test("isRequired accepts nonblank strings and zero", () => {
  for (const value of ["cliente", " 0 ", 0, false]) {
    assert.equal(isRequired(value), true);
  }
});

test("isValidEmail accepts a basic address and rejects malformed ones", () => {
  assert.equal(isValidEmail("ventas@apx.pe"), true);
  for (const value of ["", " ", "sin-arroba", "a@b", "a b@c.pe", "a@@b.pe", null]) {
    assert.equal(isValidEmail(value), false, `expected invalid: ${String(value)}`);
  }
});
