import errors from '../constants/errors.json';

const httpError = reason => {
  return (req, res) => {
    const viewFilePath = reason || 'GENERAL';
    const statusCode = errors[reason].code;
    const result = errors[reason] || errors.GENERAL;
    res.status(result.code);
    res.render(viewFilePath, {}, function(err, html) {
      if (err) {
        return res.json(result, result.code);
      }
      res.send(html);
    });
  };
};

export default httpError;
