import React from "react";
import { shallow } from "enzyme";
import NumberofEvents from "../NumberofEvents";

describe("<NumberofEvents /> component", () => {
  let NumberofEventsWrapper;
  beforeAll(() => {
    NumberofEventsWrapper = shallow(<NumberofEvents updateEvents={() => {}} />);
  });

  test("render input element", () => {
    expect(NumberofEventsWrapper.find(".NumOfEvents-input")).toHaveLength(1);
  });

  test("check input element is rendered in correct div", () => {
    expect(NumberofEventsWrapper.find(".NumOfEvents input")).toHaveLength(1);
  });

  test("check default value of number of events", () => {
    expect(NumberofEventsWrapper.find(".NumOfEvents input").prop("value")).toBe(
      32
    );
  });

  test("check changing the value of number of events", () => {
    NumberofEventsWrapper.find(".NumOfEvents input").simulate("change", {
      target: { value: 24 },
    });

    expect(NumberofEventsWrapper.state("number")).toBe(24);
  });

  test("show number of events input label", () => {
    expect(NumberofEventsWrapper.find(".NumOfEvents-label")).toHaveLength(2);
  });
});
