const User = require('../database/models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.createUser = async (serviceData) => {
    console.log(serviceData);
    try {
        // Vérifiez si l'utilisateur existe déjà
        const user = await User.findOne({ email: serviceData.email });
        if (user) {
            throw new Error('Email already exists');
        }

        // Hachez le mot de passe
        const hashPassword = await bcrypt.hash(serviceData.password, 12);

        // Créez un nouvel utilisateur
        const newUser = new User({
            email: serviceData.email,
            password: hashPassword,
            firstName: serviceData.firstName,
            lastName: serviceData.lastName,
            userName: serviceData.userName
        });

        console.log(newUser);

        // Sauvegardez l'utilisateur dans la base de données
        let result = await newUser.save();

        // Générer un token JWT pour le nouvel utilisateur
        const token = jwt.sign(
            { id: newUser._id },
            process.env.SECRET_KEY || 'default-secret-key',
            { expiresIn: '1d' } // Vous pouvez personnaliser la durée de vie du token
        );

        // Retournez les données de l'utilisateur et le token
        return {
            user: result.toObject(),
            token
        };
    } catch (error) {
        console.error('Error in userService.js', error);
        throw new Error(error);
    }
};

module.exports.getUserProfile = async (serviceData) => {
    try {
        const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim();
        const decodedJwtToken = jwt.decode(jwtToken);
        const user = await User.findOne({ _id: decodedJwtToken.id });

        if (!user) {
            throw new Error('User not found!');
        }

        return user.toObject();
    } catch (error) {
        console.error('Error in userService.js', error);
        throw new Error(error);
    }
};

module.exports.loginUser = async (serviceData) => {
    try {
        const user = await User.findOne({ email: serviceData.email });

        if (!user) {
            throw new Error('User not found!');
        }

        const isValid = await bcrypt.compare(serviceData.password, user.password);

        if (!isValid) {
            throw new Error('Password is invalid');
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY || 'default-secret-key',
            { expiresIn: '1d' }
        );

        return { token };
    } catch (error) {
        console.error('Error in userService.js', error);
        throw new Error(error);
    }
};

module.exports.updateUserProfile = async (serviceData) => {
    try {
        const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim();
        const decodedJwtToken = jwt.decode(jwtToken);
        const user = await User.findOneAndUpdate(
            { _id: decodedJwtToken.id },
            {
                userName: serviceData.body.userName
            },
            { new: true }
        );

        if (!user) {
            throw new Error('User not found!');
        }

        return user.toObject();
    } catch (error) {
        console.error('Error in userService.js', error);
        throw new Error(error);
    }
};
