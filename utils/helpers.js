// This is for formatting post/response/comment dates 

module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    }
};
