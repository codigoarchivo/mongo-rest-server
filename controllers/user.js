const userGet = (req, res) => {
  const query = req.query;

  res.json({
    msg: "Get Api",
    ...query,
  });
};

const userPost = (req, res) => {
  const body = req.body;
  res.json({
    msg: "Post Api",
    ...body,
  });
};

const userPut = (req, res) => {
  const id = req.params.id;
  res.json({
    msg: "Put Api",
    id,
  });
};

const userDelete = (req, res) => {
  res.json({
    msg: "Delete Api",
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
