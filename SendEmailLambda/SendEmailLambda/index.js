var aws = require('aws-sdk');
var ses = new aws.SES({region: 'us-east-1'});

exports.handler = (event, context, callback) => {
     var params = {
        Destination: {
            ToAddresses: ["eduardo.cgouvea.ext@extrafarma.com.br"]
        },
        Message: {
            Body: {
                Text: { 
                    Data: "Test from AWS Lambda at " + new Date()
                }
            },
            
            Subject: { Data: "Test Email from Lambda"
                
            }
        },
        Source: "ecgouvea@hotmail.com"
    };

    
     ses.sendEmail(params, function (err, data) {
        callback(null, {err: err, data: data});
        if (err) {
            console.log(err);
            context.fail(err);
        } else {
            console.log("E-mail enviado para " + params.Destination.ToAddresses);
            console.log(data);
            context.succeed(event);
        }
    });
};
