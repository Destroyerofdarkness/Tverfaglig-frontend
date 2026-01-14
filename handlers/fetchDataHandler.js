const deleteUser = async (user) => {
  const res = await fetch(`http://backend.megatron.ikt-fag.no:6001/delete/${user}`, {
    method: "DELETE",
    body: JSON.stringify({ user }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log(data, "On deleting the user");
  return;
};

const randomQuote = async () => {
  const res = await fetch("http://backend.megatron.ikt-fag.no:6001/randomQuote", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log(data);
  return data.quote;
};

const findUserData = async (user) => {
  const res = await fetch(
    `http://backend.megatron.ikt-fag.no:6001/home/findUserData/${user}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const data = await res.json();
  if (data.err) {
    throw Error(data.err);
  }

  console.log(data);
  return data;
};

module.exports = { deleteUser, randomQuote, findUserData };
