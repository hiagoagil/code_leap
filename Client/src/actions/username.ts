export const setUser = (payload: string) => {
  return {
    type: "SET_USERNAME",
    payload,
  };
};
