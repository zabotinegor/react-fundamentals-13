import Header from "./Header";
import { render } from "@testing-library/react";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(() => jest.fn()),
  useSelector: jest.fn().mockReturnValue({}),
}));

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("header_test", () => {
  const createMockUp = () => {
    return <Header />;
  };

  const createTree = () => render(createMockUp());

  it("shouldRender", () => {
    const wrapper = createTree();

    expect(wrapper).toBeDefined();
  });
});
