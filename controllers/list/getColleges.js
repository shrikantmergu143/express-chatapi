const User = require("../../models/user");
const CollegesData = require("./../../constant/college.json");

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_NUMBER = 1;

const getColleges = async (req, res)=>{
    try{
        const pageSize = parseInt(req.query.pageSize) || DEFAULT_PAGE_SIZE;
        const pageNumber = parseInt(req.query.pageNumber) || DEFAULT_PAGE_NUMBER;
        const sortName = req.query.search || "";
      
        // Validate page size and number
        if (pageSize <= 0) {
          return res.status(400).json({ error: 'Invalid page size' });
        }
        if (pageNumber <= 0) {
          return res.status(400).json({ error: 'Invalid page number' });
        }
      
        const offset = (pageNumber - 1) * pageSize;
        const limit = pageSize;
        const jsonData = CollegesData.filter(user => {
            return user.college.toLowerCase().includes(sortName.toLowerCase()) ||
            user.university.toLowerCase().includes(sortName.toLowerCase()) ||
            user.state.toLowerCase().includes(sortName.toLowerCase()) ||
            user.district.toLowerCase().includes(sortName.toLowerCase())
        });

        // Get the paginated data from the JSON array
        const data = jsonData.slice(offset, offset + limit);
      
        const totalPages = Math.ceil(jsonData.length / pageSize);
      
        // Generate and send the response
        res.json({
          data,
          currentPage: pageNumber,
          totalPages,
          pageSize,
          totalRecords: jsonData.length,
        });
    }catch(err){
        return res.status(500).json({error:"Error occured, Please try again"});
    }
}
module.exports = getColleges;