export default class Validator {
    static validate(schema) {
        return (req, res, next) => {
            const result = schema.validate(req.body);
    
            if (result.error) {
                return res.status(400).json({
                    error: 'validation_error',
                    message: result.error.details[0].message,
                });
            }
    
            next();
        }
    }
}