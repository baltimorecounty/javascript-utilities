import GetParameterByName from "./Urls";

test("should return null when a name is used but doesn't exist", () => {
  global.window = Object.create(window);
  const url = "http://dummy.com";
  Object.defineProperty(window, "location", {
    value: {
      href: url,
      search: "?name=bob"
    },
    writable: true
  });

  const actual = GetParameterByName("lastName");
  expect(actual).toEqual(null);
});

test("should return the value of a url param when it exists", () => {
  global.window = Object.create(window);
  const url = "http://dummy.com";
  Object.defineProperty(window, "location", {
    value: {
      href: url,
      search: "?name=bob"
    },
    writable: true
  });

  const actual = GetParameterByName("name");
  expect(actual).toEqual("bob");
});
