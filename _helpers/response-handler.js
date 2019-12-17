module.exports = responseHandler;

function responseHandler(response, req, res, next) {
  if (typeof response === "string") {
    return res
      .status(200)
      .json({ code: 200, data: response, message: "success", success: true });
  }

  if (typeof response === "array") {
    return res
      .status(200)
      .json({ code: 200, data: response, message: "success", success: true });
  }

  if (typeof response === "object") {
    const { code, data, message } = response;
    if (!code && !data && !message) {
      return res.status(200).json({
        code: 200,
        data: response,
        message: message || "success",
        success: true
      });
    }
    if (code === 200 && data) {
      return res.status(200).json({
        code: 200,
        data: data,
        message: message || "success",
        success: true
      });
    }

    if (code === 200 && message) {
        return res.status(200).json({
          code: 200,
          data: data,
          message: message || "success",
          success: true
        });
      }

    if (code === 400 && message) {
      return res.status(200).json({
        code: 400,
        data: data,
        message: message || "success",
        success: true
      });
    }
  }

  return res
    .status(200)
    .json({ code: 200, data: response, message: "default", success: true });
}
