const historyService = require("../service/history.service");

const getHistory = async (req, res) => {

    try {

        const history =
            await historyService.getHistory(
                req.user.id
            );

        res.status(200).json({
            success: true,
            history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getHistoryByType = async (
    req,
    res
) => {

    try {

        const { type } = req.params;

        const history =
            await historyService.getHistoryByType(
                req.user.id,
                type
            );

        res.status(200).json({
            success: true,
            history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getHistory,
    getHistoryByType
};