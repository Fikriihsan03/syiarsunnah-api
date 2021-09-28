const getBlogDataWithCategory = (req, res, db) => {
  const { category } = req.params;
  const idQuery = Number(req.query.id);
  if (!idQuery) {
    db.query(
      `SELECT * FROM blog_data WHERE category='${category}' `,
      function (err, result) {
        if (err)
          console.log("masalah ada di blogData dengan req param method GET");
        return res.status(200).json(result);
      }
    );
  } else {
    db.query(
      `SELECT * FROM blog_data WHERE id=${idQuery} `,
      function (err, result) {
        if (err)
          console.log("masalah ada di blogData dengan req query id method GET");
        res.status(500).json(result);
      }
    );
  }
};

const getAllBlogData = (req, res, db) => {
  db.query("SELECT * FROM blog_data", function (err, result) {
    if (err) console.log("masalah ada di blogData method GET");
    return res.status(200).json(result);
  });
};

const handlePostBlogData = (req, res, db, loginData) => {
  const { inputFile, title, subTitle, content, category } = req.body;
  console.log(req.body)
  // console.log(req.files)

  const date = new Date().toISOString().slice(0, 10).split("-").join("-");
  const author = req.session.author;;
  const postBlogData = `INSERT INTO blog_data SET date = '${date}' ,author = '${author}' ,image = '${inputFile}' ,title='${title}' ,sub_title='${subTitle}' ,content='${content}',category='${category}'`;
  if (!author || !inputFile || !title || !subTitle || !content || !category) {
     return res.status(404).json("please fill all form correctly");
  }else{

    db.query(postBlogData, function (error, result) {
      if (error) res.status(500).json("SQL bermasalah");
      return res.status(201).json("post blog data success");
    });
  }
};

module.exports = {
  getAllBlogData: getAllBlogData,
  getBlogDataWithCategory: getBlogDataWithCategory,
  handlePostBlogData: handlePostBlogData,
};
