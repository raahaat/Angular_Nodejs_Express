const Language = require('../models/language-setup-model');

exports.addLanguage = (req, res) => {

    Language.create({
        company_code: req.body.company_code,
        languageCode: req.body.languageCode,
        languageName: req.body.languageName
    }).then(() => {
        return res.send();
    }).catch((err) => {
        res.send(err);
        console.log('addLanguage Error: ', err);
    })
}

exports.getAllLanguages = (req, res) => {
    Language.findAll({
        order: [
            ['languageName', 'ASC'],
        ],
    }).then((languages) => {
        res.send(languages);
    }).catch((err) => {
        res.send(err);
    })
}


exports.getSingleLanguage = (req, res) => {
    languagePk = req.params.id;
    Language.findByPk(languagePk).then(
        (language) => {
            res.send(language);
        }
    ).catch((err) => {
        res.send(err);
    })
}


exports.deleteLanguageById = async (req, res) => {
    try {
        let languageId = req.params.id;
        let language = await Language.findByPk(languageId);

        if (!language) {
            res.status(404).json({
                message: "Does Not exist a Language with id = " + languageId,
                error: "404",
                languages: []
            });
        } else {
            await Language.destroy({
                where: {
                    id: languageId
                }
            });
            res.status(200).json({
                message: "Delete Successfully a Language with id = " + languageId,
                languages: [language],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Language with id = " + req.params.id,
            error: error.message,
            languages: []
        });
    }
}


exports.editLanguageById = async (req, res) => {
    try {
        let Id = req.params.id;

        let language = await Language.findByPk(Id);

        if (!language) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a language with id = " + Id,
                language: [],
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                languageCode: req.body.languageCode,
                languageName: req.body.languageName,

            }
            let result = await Language.update(
                updatedObject, {
                    returning: true,
                    where: {
                        id: Id
                    }
                }
            );

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a language with id = " + req.params.id,
                    error: "Can NOT Updated",
                    languages: []
                });
            }

            res.status(200).json({
                message: "Update successfully a language with id = " + Id,
                languages: [updatedObject],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a language with id = " + req.params.id,
            error: error.message,
            languages: []

        });
    }
}

