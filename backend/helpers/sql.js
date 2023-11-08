// sql.js

/**
 * Formats an SQL query for pagination.
 * @param {string} baseQuery - The base SQL query.
 * @param {number} limit - The number of results per page.
 * @param {number} offset - The offset for pagination.
 * @returns {Object} - The formatted SQL query and values.
 */
function formatQueryForPagination(baseQuery, limit, offset) {
  return {
    text: `${baseQuery} LIMIT $1 OFFSET $2`,
    values: [limit, offset]
  };
}

/**
* Handles common SQL errors.
* @param {Error} error - The SQL error.
* @returns {Object} - A formatted error response.
*/
function handleSQLError(error) {

  console.error("SQL Error:", error);
  return {
      status: 500,
      message: "Database error occurred."
  };
}



module.exports = {
  formatQueryForPagination,
  handleSQLError

};

