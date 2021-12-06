import { render } from "@testing-library/react";
import { Form } from '../Form'

describe("Message tests", () => {
    it("renders author and text", () => {
        const form = render(<Form />);

        expect(form).toMatchSnapshot()
    });
});
