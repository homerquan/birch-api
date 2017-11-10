import errors from '../var/errors.json';

const httpError = (reason) => {
  return (req, res) => {
    var viewFilePath = reason || 'GENERAL';
    var statusCode = errors[reason].code;
    var result = errors[reason]||errors.GENERAL;

    res.status(result.status);
    res.render(viewFilePath, {}, function(err, html) {
      if (err) {
        return res.json(result, result.status);
      }
      res.send(html);
    });
  };
}


export default httpError