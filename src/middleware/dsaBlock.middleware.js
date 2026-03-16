/**
 * dsaBlock.middleware.js
 * Temporarily blocks all DSA-related backend routes.
 * Returns a 503 with a clear "under construction" message.
 * To re-enable the DSA module, simply remove this middleware
 * from the routes it is attached to.
 */
module.exports = function dsaBlock(req, res) {
    return res.status(503).json({
        success: false,
        disabled: true,
        message:
            "🚧 Coding Assessment Module – Work Under Construction. This feature will be available after 2 days.",
    });
};
