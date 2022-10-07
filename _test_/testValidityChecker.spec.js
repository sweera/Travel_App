/**
* @jest-environment jsdom
*/

import { checkValidity } from "../src/client/js/validityChecker";

describe("Testing whether country name checker is valid", () => {
    test("Testing checkValidity() function", async() => {
        expect(checkValidity).toBeDefined();
    });
});