// Run: node --experimental-strip-types --test tests/dismissDetailsOnOutsideClick.test.mjs
import assert from "node:assert/strict";
import { test } from "node:test";
import { dismissDetailsOnOutsideClick } from "../src/components/ui/dismissDetailsOnOutsideClick.ts";

test("tag menus dismiss outside, stay open inside, and clean up on unmount", () => {
  const ownerDocument = new EventTarget();
  const first = { ownerDocument, open: true };
  const second = { ownerDocument, open: true };
  const cleanupFirst = dismissDetailsOnOutsideClick(first);
  const cleanupSecond = dismissDetailsOnOutsideClick(second);
  const click = (path) => {
    const event = new Event("click");
    event.composedPath = () => path;
    ownerDocument.dispatchEvent(event);
  };

  click([{}, first, ownerDocument]);
  assert.equal(first.open, true);
  assert.equal(second.open, false);
  click([ownerDocument]);
  assert.equal(first.open, false);

  cleanupFirst();
  cleanupSecond();
  first.open = second.open = true;
  click([ownerDocument]);
  assert.equal(first.open, true);
  assert.equal(second.open, true);
});
