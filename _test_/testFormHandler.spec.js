import { handleSubmit } from "../src/client/js/formHandler";
import { updateUI } from "../src/client/js/formHandler";

describe("Testing the form submission functionality",() => {
    test("Testing the handleSubmit() function", async () => {
        expect(handleSubmit).toBeDefined();
    });
});

describe("Testing the updating the UI functionality",() => {
    test("Testing the updateUI() function", () => {
        expect(updateUI).toBeDefined();
    });
});