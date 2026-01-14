const deleteUser = async (user) => {
  try {
    const res = await fetch(`http://localhost:4000/delete/${user}`, {
      method: "DELETE",
      body: JSON.stringify({ user }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data, "On deleting the user");
    return;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const randomQuote = async () => {
  try {
    const res = await fetch("http://localhost:4000/randomQuote", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    return data.quote;
  } catch (err) {
    console.log(err);
  }
};

const findUserData = async (user) => {
  try {
    const res = await fetch(`http://localhost:4000/home/findUserData/${user}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { deleteUser, randomQuote, findUserData };
